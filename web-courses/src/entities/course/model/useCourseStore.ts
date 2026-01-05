import { create } from 'zustand'
import type { Course } from '../types'
import { courseQueries } from '@/shared/lib/supabase/queries/courses'
import { lessonQueries } from '@/shared/lib/supabase/queries/lessons'

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

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null })
    
    try {
      const { data, error } = await courseQueries.getAll()
      if (error) throw new Error(error.message)
      
      set({ courses: data || [], isLoading: false })
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
  },

  addCourse: async (newCourse) => {
    set({ isLoading: true, error: null })
    
    try {
      const { data, error } = await courseQueries.create(newCourse)
      if (error) throw new Error(error.message)
      if (!data) throw new Error('No se pudo crear el curso')
      
      set((state) => ({ 
        courses: [data, ...state.courses], 
        isLoading: false 
      }))
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
  },

updateCourse: async (courseId, updates) => {
  set({ isLoading: true, error: null })

  try {
    // Mapear de frontend a DB
    const dbUpdates: any = {}
    if (updates.title !== undefined) dbUpdates.title = updates.title
    if (updates.description !== undefined) dbUpdates.description = updates.description
    if (updates.duration !== undefined) dbUpdates.duration = String(updates.duration)
    if (updates.instructor !== undefined) dbUpdates.instructor = updates.instructor
    if (updates.keyPoints !== undefined) dbUpdates.key_points = updates.keyPoints // ✅ Este sí
    // if (updates.extraInfo !== undefined) dbUpdates.extra_info = updates.extraInfo // ❌ Este no
    
    if (updates.image !== undefined) {
      dbUpdates.thumbnail_url = updates.image.includes('supabase.co/storage') 
        ? updates.image.split('/').pop() 
        : updates.image
    }
    if (updates.level) dbUpdates.difficulty = updates.level

    // Solo actualizar curso si hay cambios
    let courseData = null
    if (Object.keys(dbUpdates).length > 0) {
      const { data, error: courseError } = await courseQueries.update(courseId, dbUpdates)
      if (courseError) throw new Error(courseError.message)
      courseData = data
    }

    // Sincronizar lecciones si las hay
    let updatedLessons = undefined
    if (updates.lessons) {
      const { data: lessonsData, error: lessonsError } = await lessonQueries.syncLessons(
        courseId, 
        updates.lessons
      )
      if (lessonsError) throw new Error(lessonsError.message)
      updatedLessons = lessonsData
    }

    // Actualizar estado local
    set((state) => ({
      courses: state.courses.map((course) => {
        if (course.id !== courseId) return course
        
        return {
          ...course,
          ...(courseData || {}),
          lessons: updatedLessons || course.lessons
        }
      }),
      isLoading: false
    }))

  } catch (err: any) {
    console.error('Error actualizando curso:', err)
    set({ error: err.message, isLoading: false })
  }
},

  deleteCourse: async (courseId) => {
    set({ isLoading: true, error: null })
    
    try {
      const { error } = await courseQueries.delete(courseId)
      if (error) throw new Error(error.message)
      
      set((state) => ({
        courses: state.courses.filter((c) => c.id !== courseId),
        isLoading: false
      }))
    } catch (err: any) {
      set({ error: err.message, isLoading: false })
    }
  },

  getCourseById: (courseId) => get().courses.find((c) => c.id === courseId)
}))