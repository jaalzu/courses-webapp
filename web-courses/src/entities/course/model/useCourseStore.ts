import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Course } from "./types"
import { courses as initialCourses } from '../data/curso'

interface CourseStore {
  courses: Course[]
  
  // CRUD básico
  addCourse: (course: Omit<Course, 'id' | 'createdAt'>) => void
  updateCourse: (courseId: number, updates: Partial<Course>) => void
  deleteCourse: (courseId: number) => void
  
  // Getter simple
  getCourseById: (courseId: number) => Course | undefined
  
  // Reset
  resetCourses: () => void
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      courses: initialCourses,

      getCourseById: (courseId) => 
        get().courses.find(c => c.id === courseId),

      addCourse: (newCourse) =>
        set((state) => {
          const newId = Math.max(0, ...state.courses.map(c => c.id)) + 1
          return {
            courses: [
              ...state.courses,
              {
                id: newId,
                createdAt: Date.now(),
                lessons: [],
                ...newCourse,
              },
            ],
          }
        }),

      updateCourse: (courseId, updates) =>
        set((state) => ({
          courses: state.courses.map(course =>
            course.id === courseId ? { ...course, ...updates } : course
          ),
        })),

      deleteCourse: (courseId) =>
        set((state) => ({
          courses: state.courses.filter(course => course.id !== courseId),
        })),

      resetCourses: () => 
        set({ courses: initialCourses }),
    }),
    {
      name: 'course-storage',
    }
  )
)