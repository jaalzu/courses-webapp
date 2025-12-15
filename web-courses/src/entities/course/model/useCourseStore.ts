
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Course } from './types'
import { courses as initialCourses } from '../data/curso'

// 🔹 Helper: evitar referencias compartidasigua
const cloneInitialCourses = (): Course[] =>
  structuredClone(initialCourses)

// 🔹 Helper: ID seguro
const getNextId = (courses: Course[]) =>
  Math.max(0, ...courses.map(c => c.id)) + 1

interface CourseStore {
  courses: Course[]
  addCourse: (course: Omit<Course, 'id' | 'createdAt'>) => void
  updateCourse: (courseId: number, updates: Partial<Course>) => void
  deleteCourse: (courseId: number) => void
  getCourseById: (courseId: number) => Course | undefined
  resetCourses: () => void
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      //  Estado inicial limpio
      courses: cloneInitialCourses(),


      getCourseById: (courseId) =>
        get().courses.find(c => c.id === courseId),

      addCourse: (newCourse) =>
        set(state => ({
          courses: [
            ...state.courses,
            {
              id: getNextId(state.courses),
              createdAt: Date.now(),
              lessons: [],
              image: 'curso1.jpg', 
              ...newCourse,
            },
          ],
        })),

      updateCourse: (courseId, updates) =>
        set(state => ({
          courses: state.courses.map(course =>
            course.id === courseId
              ? { ...course, ...updates }
              : course
          ),
        })),

      deleteCourse: (courseId) =>
        set(state => ({
          courses: state.courses.filter(course => course.id !== courseId),
        })),

      resetCourses: () =>
        set({ courses: cloneInitialCourses() }),
    }),
    {
      name: 'course-storage',

      version: 1,

      //  Migraciones futuras
          migrate: (persistedState, version) => {
      const state = persistedState as CourseStore

      if (version === 0) {
        return {
          ...state,
          courses: cloneInitialCourses(),
        }
      }

      return state
    },

    }
  )
)
