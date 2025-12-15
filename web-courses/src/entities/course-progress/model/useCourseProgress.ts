import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { LessonProgress, CourseId, LessonId } from '@/entities/course-progress/model/types'

interface CourseProgressStore {
  progress: LessonProgress[]

  toggleLessonComplete: (courseId: CourseId, lessonId: LessonId) => void
  resetProgress: (courseId?: CourseId) => void
}

export const useCourseProgress = create<CourseProgressStore>()(
  persist(
    (set) => ({
      progress: [],

      toggleLessonComplete: (courseId, lessonId) =>
        set((state) => {
          const existing = state.progress.find(
            p => p.courseId === courseId && p.lessonId === lessonId
          )

          if (existing) {
            return {
              progress: state.progress.map(p =>
                p.courseId === courseId && p.lessonId === lessonId
                  ? { ...p, completed: !p.completed }
                  : p
              ),
            }
          }

          return {
            progress: [
              ...state.progress,
              { courseId, lessonId, completed: true },
            ],
          }
        }),

      resetProgress: (courseId) =>
        set((state) => ({
          progress: courseId
            ? state.progress.filter(p => p.courseId !== courseId)
            : [],
        })),
    }),
    {
      name: 'course-progress-storage',
    }
  )
)
