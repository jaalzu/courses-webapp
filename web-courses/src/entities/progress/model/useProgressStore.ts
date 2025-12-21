// @/entities/progress/model/useProgressStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LessonProgress } from './types'
import { MOCK_PROGRESS } from '@/shared/mocks/progressMock'

interface ProgressStore {
  progress: LessonProgress[]
  markComplete: (userId: string, courseId: number, lessonId: number) => void
  markIncomplete: (userId: string, courseId: number, lessonId: number) => void
  resetProgress: (userId?: string, courseId?: number) => void
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      progress: MOCK_PROGRESS,

      markComplete: (userId, courseId, lessonId) => {
        if (!userId) {
          console.error(' markComplete: userId es undefined!')
          return
        }


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
                  ? { ...p, completed: true, completedAt: new Date() }
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
        })
      },

      markIncomplete: (userId, courseId, lessonId) => {
        set((state) => ({
          progress: state.progress.map(p =>
            p.userId === userId &&
            p.courseId === courseId &&
            p.lessonId === lessonId
              ? { ...p, completed: false, completedAt: undefined }
              : p
          ),
        }))
      },

      resetProgress: (userId, courseId) => {
        set((state) => ({
          progress: state.progress.filter(p => {
            if (userId && p.userId === userId) {
              if (courseId && p.courseId === courseId) return false
              if (!courseId) return false
            }
            return true
          }),
        }))
      },
    }),
    {
      name: 'progress-storage',
    }
  )
)