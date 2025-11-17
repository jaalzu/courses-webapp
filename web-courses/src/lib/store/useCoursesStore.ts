// src/lib/data/store/useCourseStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Course, CourseInput } from "@/types/course"

import { courses as initialCourses } from '@/lib/data/curso'

interface CourseStore {
  courses: Course[]
  toggleLessonComplete: (courseId: number, lessonId: number) => void
  getCourse: (courseId: number) => Course | undefined

  // CRUD
  addCourse: (course: CourseInput) => void

  updateCourse: (courseId: number, updates: Partial<Pick<Course, 'title' | 'description' | 'image' | 'video' | 'instructor' | 'level'>>) => void
  deleteCourse: (courseId: number) => void
  resetCourses: () => void
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      courses: initialCourses,

      toggleLessonComplete: (courseId, lessonId) =>
        set((state) => ({
          courses: state.courses.map(course =>
            course.id === courseId
              ? {
                  ...course,
                  lessons: course.lessons.map(lesson =>
                    lesson.id === lessonId
                      ? { ...lesson, completed: !lesson.completed }
                      : lesson
                  )
                }
              : course
          )
        })),

      getCourse: (courseId) => {
        return get().courses.find(c => c.id === courseId)
      },

      // 🆕 Crear nuevo curso
     addCourse: (newCourse) =>
  set((state) => {
    const nextId =
      state.courses.length > 0
        ? Math.max(...state.courses.map((c) => c.id)) + 1
        : 1

    return {
      courses: [
        ...state.courses,
        {
          id: nextId,
          createdAt: Date.now(),
          lessons: [],
          ...newCourse,
        },
      ],
    }
  }),


      // Actualizar curso
      updateCourse: (courseId, updates) =>
        set((state) => ({
          courses: state.courses.map(course =>
            course.id === courseId
              ? { ...course, ...updates }
              : course
          )
        })),

      // Eliminar curso
      deleteCourse: (courseId) =>
        set((state) => ({
          courses: state.courses.filter(course => course.id !== courseId)
        })),

      resetCourses: () =>
        set({ courses: initialCourses })
    }),
    {
      name: 'course-storage',
    }
  )
)
