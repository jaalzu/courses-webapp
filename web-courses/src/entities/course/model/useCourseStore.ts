import { create } from 'zustand'
import type { Course } from '../types'
import { courseQueries } from '@/shared/lib/supabase/queries/courses'
import { getCourseImage } from '@/shared/lib/supabase/storage' // <-- Importa tu helper
import { lessonQueries } from '@/shared/lib/supabase/queries/lessons';

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
    // --- PARTE A: ACTUALIZAR CURSO ---
    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    // IMPORTANTE: El curso también tiene duración, lo pasamos a String
    if (updates.duration) dbUpdates.duration = String(updates.duration);
    if (updates.instructor) dbUpdates.instructor = updates.instructor;
    
    if (updates.image) {
      dbUpdates.thumbnail_url = updates.image.includes('supabase.co/storage') 
        ? updates.image.split('/').pop() 
        : updates.image;
    }
    if (updates.level) dbUpdates.difficulty = updates.level;

    const { data: courseData, error: courseError } = await courseQueries.update(courseId, dbUpdates);
    if (courseError) throw courseError;

    // --- PARTE B: LLAMAR A LA QUERY UNIFICADA ---
    let finalLessons = updates.lessons;
    if (updates.lessons) {
      // Usamos la función del archivo queries
      const { data: newLessons } = await lessonQueries.syncLessons(courseId, updates.lessons);
      if (newLessons) finalLessons = newLessons;
    }

    // --- PARTE C: ACTUALIZAR ESTADO LOCAL ---
    const rawData = Array.isArray(courseData) && courseData.length > 0 ? courseData[0] : null;

    set((state) => ({
      courses: state.courses.map((c) => {
        if (c.id === courseId) {
          const baseData = rawData ? mapVisualData(rawData) : c;
          return {
            ...baseData,
            lessons: finalLessons ? finalLessons.map((l: any) => ({
              ...l,
              duration: String(l.duration || '0'),
              videoUrl: l.video_url || l.videoUrl || ''
            })) : c.lessons
          };
        }
        return c;
      }),
      isLoading: false
    }));

  } catch (err: any) {
    console.error("Error en updateCourse:", err);
    console.error("Error detallado:", JSON.stringify(err, null, 2));
  console.error("Mensaje:", err.message);
  console.error("Detalle:", err.details); // Propiedad típica de Supabase
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