// @/entities/progress/model/useProgressStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LessonProgress } from './types'

interface ProgressStore {
  progress: LessonProgress[]
  markComplete: (userId: string, courseId: number, lessonId: number) => void
  markIncomplete: (userId: string, courseId: number, lessonId: number) => void
  resetProgress: (userId?: string, courseId?: number) => void
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      progress: [],

      markComplete: (userId, courseId, lessonId) => {
        // ⚠️ VALIDACIÓN: No guardar si userId es undefined
        if (!userId) {
          console.error('❌ markComplete: userId es undefined!')
          console.trace() // Ver de dónde viene el error
          return
        }

        console.log('✅ markComplete llamado:', { userId, courseId, lessonId })

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