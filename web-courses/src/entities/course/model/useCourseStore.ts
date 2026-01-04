import { create } from 'zustand'
import type { Course } from '../types'
import { courseQueries } from '@/shared/lib/supabase/queries/courses'
import { getCourseImage } from '@/shared/lib/supabase/storage' // <-- Importa tu helper
import { supabase } from '@/shared/lib/supabase/client' 
import { useProgressStore } from '@/entities/progress/model/useProgressStore';

interface CourseStore {
  courses: Course[]
  isLoading: boolean
  error: string | null
  fetchCourses: () => Promise<void>
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>
  updateCourse: (courseId: string, updates: Partial<Course>) => Promise<void>
  deleteCourse: (courseId: string) => Promise<void>
  getCourseById: (courseId: string) => Course | undefined
}

const mapVisualData = (dbData: any): Course => {
  // 1. Si dbData no existe (null/undefined), devolvemos un objeto Course base
  if (!dbData) {
    return {
      id: '',
      title: '',
      description: '',
      image: '',
      level: 'beginner',
      lessons: [],
      // Agregá aquí los campos obligatorios de tu interface Course
    } as Course;
  }

  return {
    ...dbData,
    // 2. Protegemos el thumbnail_url (si es null, mandamos string vacío)
    image: dbData.thumbnail_url ? getCourseImage(dbData.thumbnail_url) : '',
    
    // 3. Traducimos difficulty -> level con fallback
    level: dbData.difficulty || 'beginner', 
    
    // 4. Protegemos las lecciones y sus campos internos
    lessons: (dbData.lessons || []).map((l: any) => ({
      ...l,
      videoUrl: l.video_url || ''
    }))
  };
};

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null })
    const { data, error } = await courseQueries.getAll()

    if (error) {
      set({ error: error.message, isLoading: false })
    } else {
      // Mapeamos todo el array de cursos
      const formattedCourses = (data as any[]).map(mapVisualData)
      set({ 
        courses: formattedCourses, 
        isLoading: false 
      })
    }
  },

  addCourse: async (newCourse) => {
    set({ isLoading: true, error: null })
    const { data, error } = await courseQueries.create(newCourse)

    if (error) {
      set({ error: error.message, isLoading: false })
    } else if (data) {
      set((state) => ({ 
        courses: [mapVisualData(data), ...state.courses], 
        isLoading: false 
      }))
    }
  },



updateCourse: async (courseId, updates) => {
  set({ isLoading: true, error: null });

  try {
    // --- PARTE A: ACTUALIZAR TABLA 'COURSES' ---
    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.duration) dbUpdates.duration = Number(updates.duration);
    if (updates.instructor) dbUpdates.instructor = updates.instructor;
    
    if (updates.image) {
      if (updates.image.includes('supabase.co/storage')) {
        dbUpdates.thumbnail_url = updates.image.split('/').pop(); 
      } else {
        dbUpdates.thumbnail_url = updates.image;
      }
    }
    if (updates.level) dbUpdates.difficulty = updates.level;

    const { data: courseData, error: courseError } = await courseQueries.update(courseId, dbUpdates);
    if (courseError) throw courseError;

    // --- PARTE B: ACTUALIZAR TABLA 'LESSONS' ---
    if (updates.lessons) {
      // 1. Borramos las viejas
      const { error: delError } = await supabase.from('lessons').delete().eq('course_id', courseId);
      if (delError) throw delError;
      
      // 2. Insertamos las nuevas
      const lessonsToInsert = updates.lessons.map((l: any, index: number) => ({
        course_id: courseId,
        title: l.title,
        duration: isNaN(Number(l.duration)) ? 0 : Number(l.duration), 
        video_url: l.videoUrl || l.video_url || '',
        order_index: index, 
      }));
      
      const { error: insError } = await supabase.from('lessons').insert(lessonsToInsert);
      if (insError) throw insError;
    }

    // --- PARTE C: ACTUALIZAR ESTADO LOCAL SIN PERDER DATOS ---
    const rawData = Array.isArray(courseData) && courseData.length > 0 ? courseData[0] : null;

    set((state) => ({
      courses: state.courses.map((c) => {
        if (c.id === courseId) {
          // Si Supabase NO devolvió el curso (rawData es null), 
          // mantenemos el curso actual 'c' y solo actualizamos las lecciones.
          if (!rawData) {
            return {
              ...c,
              lessons: updates.lessons || c.lessons
            };
          }

          // Si devolvió datos, mapeamos y mezclamos
          const formatted = mapVisualData(rawData);
          return {
            ...c,           // Datos viejos
            ...formatted,   // Datos nuevos de la DB
            lessons: updates.lessons || c.lessons // Lecciones del form
          };
        }
        return c;
      }),
      isLoading: false
    }));

  } catch (err: any) {
    console.error("Error en updateCourse:", err);
    set({ error: err.message, isLoading: false });
  }
},

  deleteCourse: async (courseId) => {
    set({ isLoading: true, error: null })
    const { error } = await courseQueries.delete(courseId)

    if (error) {
      set({ error: error.message, isLoading: false })
    } else {
      set((state) => ({
        courses: state.courses.filter((c) => c.id !== courseId),
        isLoading: false
      }))
    }
  },

  getCourseById: (courseId) => get().courses.find((c) => c.id === courseId),
}))