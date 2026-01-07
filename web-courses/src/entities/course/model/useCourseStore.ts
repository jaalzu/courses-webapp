// entities/course/model/useCourseStore.ts
import { create } from 'zustand'
import type { Course } from '../types'

interface CourseStore {
  courses: Course[]
  isLoading: boolean
  error: string | null
  
  setCourses: (courses: Course[]) => void
  addCourseToState: (course: Course) => void
  updateCourseInState: (courseId: string, updates: Partial<Course>) => void
  removeCourseFromState: (courseId: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  isLoading: false,
  error: null,
  
  setCourses: (courses) => set({ courses }),
  
  addCourseToState: (course) => 
    set((state) => ({ courses: [course, ...state.courses] })),
  
  updateCourseInState: (courseId, updates) =>
    set((state) => ({
      courses: state.courses.map((c) => 
        c.id === courseId ? { ...c, ...updates } : c
      )
    })),
  
  removeCourseFromState: (courseId) =>
    set((state) => ({
      courses: state.courses.filter((c) => c.id !== courseId)
    })),
  
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error })
}))