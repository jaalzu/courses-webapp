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
  // Transformamos thumbnail_url de la DB en la propiedad image que usa el front
  image: getCourseImage(dbData.thumbnail_url),
  // Aseguramos que las lecciones no rompan si vienen null y mapeamos sus videos
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
    set({ isLoading: true, error: null })
    const { data, error } = await courseQueries.update(courseId, updates)

    if (error) {
      set({ error: error.message, isLoading: false })
    } else if (data) {
      set((state) => ({
        courses: state.courses.map((c) => 
          c.id === courseId ? mapVisualData(data) : c
        ),
        isLoading: false
      }))
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