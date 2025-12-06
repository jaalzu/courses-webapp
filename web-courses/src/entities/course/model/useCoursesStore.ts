// src/lib/store/useCourseStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Course, CourseInput, CourseLevel } from "@/entities/course/model/types"
import { courses as initialCourses } from '@/entities/course/data/curso'
import { generateCourseId, toggleLesson } from '@/shared/lib/utils/courseUtils'
import { calculateCourseProgress, getLevelConfig } from '@/shared/lib/utils/courseUtils'

interface CourseStore {
  courses: Course[]

  // Acciones básicas
  addCourse: (course: CourseInput) => void
  updateCourse: (
    courseId: number,
    updates: Partial<Course> // 👈 Ahora permite actualizar cualquier campo del curso
  ) => void
  deleteCourse: (courseId: number) => void
  resetCourses: () => void

  // Funciones derivadas
  toggleLessonComplete: (courseId: number, lessonId: number) => void
  getCourse: (courseId: number) => Course | undefined
  getCourseProgress: (courseId: number) => ReturnType<typeof calculateCourseProgress>
  getCourseLevelConfig: (level: CourseLevel) => ReturnType<typeof getLevelConfig>
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      courses: initialCourses,

      // Toggle de lección
      toggleLessonComplete: (courseId, lessonId) =>
        set({ courses: toggleLesson(get().courses, courseId, lessonId) }),

      // Obtener curso
      getCourse: (courseId) => get().courses.find(c => c.id === courseId),

      // CRUD
      addCourse: (newCourse) =>
        set((state) => ({
          courses: [
            ...state.courses,
            {
              id: generateCourseId(state.courses),
              createdAt: Date.now(),
              lessons: [],
              ...newCourse,
            },
          ],
        })),

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

      resetCourses: () => set({ courses: initialCourses }),

      // Derivados usando utils
      getCourseProgress: (courseId) => {
        const course = get().courses.find(c => c.id === courseId)
        return course ? calculateCourseProgress(course.lessons) : { progress: 0, completed: { done: 0, total: 0 } }
      },

      getCourseLevelConfig: (level: CourseLevel) => getLevelConfig(level),
    }),
    {
      name: 'course-storage', 
    }
  )
)