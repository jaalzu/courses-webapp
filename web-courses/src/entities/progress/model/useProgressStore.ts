'use client'

import { create } from 'zustand'
import type { LessonProgress } from '../types'
import { progressQueries } from '@/shared/lib/supabase/queries/progress'
import { supabase } from '@/shared/lib/supabase/client'

interface ProgressState {
  progress: LessonProgress[]
  isLoading: boolean
  error: string | null
}

interface ProgressActions {
  fetchUserProgress: (userId: string) => Promise<void>
  fetchAllProgress: () => Promise<void>
  toggleLessonProgress: (userId: string, courseId: string, lessonId: string) => Promise<void>
  markLessonCompleted: (userId: string, courseId: string, lessonId: string) => Promise<void>
  resetUserProgress: (userId: string) => void
}

export const useProgressStore = create<ProgressState & ProgressActions>()((set, get) => ({
  progress: [],
  isLoading: false,
  error: null,

  fetchAllProgress: async () => {
    set({ isLoading: true, error: null })
    
    // Consultamos toda la tabla user_progress
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')

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

  // Cargar progreso de un usuario específico
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

  // Limpiar progreso localmente
  resetUserProgress: (userId: string) => {
    set(state => ({
      progress: state.progress.filter(p => p.userId !== userId),
    }))
  },
}))