import { create } from 'zustand'
import type { LessonProgress } from '../types'
import { progressQueries } from '@/shared/lib/supabase/queries/progress'

interface ProgressState {
  progress: LessonProgress[]
  isLoading: boolean
  error: string | null
}

interface ProgressActions {
  fetchUserProgress: (userId: string) => Promise<void>
  toggleLessonProgress: (userId: string, courseId: string, lessonId: string) => Promise<void>
  markLessonCompleted: (userId: string, courseId: string, lessonId: string) => Promise<void>
  resetUserProgress: (userId: string) => void
}

export const useProgressStore = create<ProgressState & ProgressActions>()((set, get) => ({
  progress: [],
  isLoading: false,
  error: null,

  // Cargar progreso del usuario desde Supabase
  fetchUserProgress: async (userId: string) => {
    set({ isLoading: true, error: null })
    const { data, error } = await progressQueries.getUserProgress(userId)

    if (error) {
      set({ error: error.message, isLoading: false })
    } else {
      const mappedProgress: LessonProgress[] = (data || []).map((p: any) => ({
        userId: p.user_id,
        courseId: p.course_id,
        lessonId: p.lesson_id,
        completed: p.status === 'completed',
        completedAt: p.completed_at ? new Date(p.completed_at) : undefined,
      }))
      
      set({ progress: mappedProgress, isLoading: false })
    }
  },

  // Toggle lección (completar/descompletar)
  toggleLessonProgress: async (userId: string, courseId: string, lessonId: string) => {
    const currentProgress = get().progress
    const existing = currentProgress.find(
      p => p.userId === userId && p.courseId === courseId && p.lessonId === lessonId
    )

    const newStatus = existing?.completed ? 'not_started' : 'completed'

    const { error } = await progressQueries.updateLessonProgress(
      userId,
      courseId,
      lessonId,
      newStatus
    )

    if (!error) {
      // Actualizar estado local
      set(state => {
        if (existing) {
          return {
            progress: state.progress.map(p =>
              p.userId === userId && p.courseId === courseId && p.lessonId === lessonId
                ? { ...p, completed: !p.completed }
                : p
            ),
          }
        } else {
          return {
            progress: [
              ...state.progress,
              { userId, courseId, lessonId, completed: true },
            ],
          }
        }
      })
    }
  },

  // Marcar como completada (sin toggle)
  markLessonCompleted: async (userId: string, courseId: string, lessonId: string) => {
    const { error } = await progressQueries.markLessonComplete(userId, courseId, lessonId)
console.log('🔍 Intentando marcar completada:', { userId, courseId, lessonId })
  console.log('🔍 auth.uid() debería ser:', userId)
    if (!error) {
      set(state => {
        const exists = state.progress.some(
          p => p.userId === userId && p.courseId === courseId && p.lessonId === lessonId
        )

        if (exists) return state

        return {
          progress: [
            ...state.progress,
            { userId, courseId, lessonId, completed: true, completedAt: new Date() },
          ],
        }
      })
    }
  },

  // Limpiar progreso (solo local)
  resetUserProgress: (userId: string) => {
    set(state => ({
      progress: state.progress.filter(p => p.userId !== userId),
    }))
  },
}))