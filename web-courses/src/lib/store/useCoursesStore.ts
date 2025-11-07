import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Course } from '@/types' // ← Ahora desde /types
import { courses as initialCourses } from '@/lib/data/curso'

interface CourseStore {
  courses: Course[]
  toggleLessonComplete: (courseId: number, lessonId: number) => void
  getCourse: (courseId: number) => Course | undefined
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
      }
    }),
    {
      name: 'course-storage', // 
    }
  )
)

// localStorage.clear()
