// @/entities/course/model/useCourseStore.ts
import { create } from 'zustand'
import type { Course } from '../types'
import { courseQueries } from '@/shared/lib/supabase/queries/courses'

interface CourseStore {
  courses: Course[]
  isLoading: boolean
  error: string | null
  
  fetchCourses: () => Promise<void>
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>
  updateCourse: (courseId: string, updates: Partial<Course>) => Promise<void>
  deleteCourse: (courseId: string) => Promise<void>
  
  getCourseById: (courseId: string) => Course | undefined
  resetError: () => void
}

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
      // Solución al error de "overlap": convertimos a unknown y luego a Course[]
      set({ 
        courses: (data as unknown) as Course[], 
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
        courses: [(data as unknown) as Course, ...state.courses], 
        isLoading: false 
      }))
    }
  },

  updateCourse: async (courseId, updates) => {
    set({ isLoading: true, error: null })
    const { data, error } = await courseQueries.update(courseId, updates)

    if (error) {
      set({ error: error.message, isLoading: false })
    } else {
      set((state) => ({
        courses: state.courses.map((c) => 
          c.id === courseId ? { ...c, ...((data as unknown) as Course) } : c
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

  getCourseById: (courseId) => {
    return get().courses.find((c) => c.id === courseId)
  },

  resetError: () => set({ error: null })
}))