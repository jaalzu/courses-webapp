import { create } from 'zustand'
import type { Course } from '../types'
import { courseQueries } from '@/shared/lib/supabase/queries/courses'
import { getCourseImage } from '@/shared/lib/supabase/storage' // <-- Importa tu helper

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

// Función helper interna para no repetir la lógica de mapeo
const mapVisualData = (dbData: any): Course => ({
  ...dbData,
  // 1. Traducimos thumbnail_url -> image
  image: getCourseImage(dbData.thumbnail_url),
  // 2. Traducimos difficulty -> level (Esto arregla que no se vea la dificultad)
  level: dbData.difficulty || 'beginner', 
  // 3. Protegemos las lecciones
  lessons: (dbData.lessons || []).map((l: any) => ({
    ...l,
    videoUrl: l.video_url || ''
  }))
})

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

  // 1. TRADUCCIÓN: De lo que viene del Form a lo que entiende la DB
  const dbUpdates: any = { ...updates };
  
  if (updates.image) {
    dbUpdates.thumbnail_url = updates.image;
    delete (dbUpdates as any).image;
  }
  
  if (updates.level) {
    dbUpdates.difficulty = updates.level;
    delete (dbUpdates as any).level;
  }

  const { data, error } = await courseQueries.update(courseId, dbUpdates);

  if (error) {
    set({ error: error.message, isLoading: false });
  } else if (data) {
    // Supabase devuelve un objeto o un array de un objeto
    const rawData = Array.isArray(data) ? data[0] : data;

    set((state) => ({
      courses: state.courses.map((c) => {
        if (c.id === courseId) {
          // 2. TRADUCCIÓN: De lo que devolvió la DB a lo que usa el Front
          const formatted = mapVisualData(rawData);
          
          return {
            ...c,         // Mantenemos lo viejo (aquí viven las lessons)
            ...formatted, // Pisamos con lo nuevo mapeado (title, description, level, image)
            // Forzamos mantener las lessons si la DB no las mandó (que es lo normal)
            lessons: (rawData as any).lessons ? formatted.lessons : c.lessons
          };
        }
        return c;
      }),
      isLoading: false
    }));
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