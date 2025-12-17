import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LessonProgress, CourseId, LessonId } from '@/entities/progress/model/types'

interface ProgressStore {
  progress: LessonProgress[]

  toggleLessonComplete: (
    userId: string,
    courseId: CourseId,
    lessonId: LessonId
  ) => void

  resetProgress: (userId?: string, courseId?: CourseId) => void
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      progress: [],

      toggleLessonComplete: (userId, courseId, lessonId) =>
        set((state) => {
          const existing = state.progress.find(
            p =>
              p.userId === userId &&
              p.courseId === courseId &&
              p.lessonId === lessonId
          )

          if (existing) {
            return {
              progress: state.progress.map(p =>
                p.userId === userId &&
                p.courseId === courseId &&
                p.lessonId === lessonId
                  ? {
                      ...p,
                      completed: !p.completed,
                      completedAt: !p.completed ? new Date() : undefined,
                    }
                  : p
              ),
            }
          }

          return {
            progress: [
              ...state.progress,
              {
                userId,
                courseId,
                lessonId,
                completed: true,
                completedAt: new Date(),
              },
            ],
          }
        }),

      resetProgress: (userId, courseId) =>
        set((state) => ({
          progress: state.progress.filter(p => {
            if (userId && p.userId !== userId) return true
            if (courseId && p.courseId !== courseId) return true
            return false
          }),
        })),
    }),
    {
      name: 'progress-storage',
    }
  )
)
