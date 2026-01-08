'use client'

import { create } from 'zustand'
import type { LessonProgress } from '../types'

interface ProgressState {
  progress: LessonProgress[]
  isLoading: boolean
  error: string | null
}

interface ProgressActions {
  setProgress: (progress: LessonProgress[]) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  addProgress: (item: LessonProgress) => void
  updateProgress: (userId: string, courseId: string, lessonId: string, completed: boolean) => void
  removeProgress: (userId: string, courseId: string, lessonId: string) => void
  resetUserProgress: (userId: string) => void
}

export const useProgressStore = create<ProgressState & ProgressActions>((set) => ({
  progress: [],
  isLoading: false,
  error: null,

  setProgress: (progress) => set({ progress }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setError: (error) => set({ error }),

  addProgress: (item) =>
    set((state) => ({
      progress: [...state.progress, item]
    })),

  updateProgress: (userId, courseId, lessonId, completed) =>
    set((state) => ({
      progress: state.progress.map((p) =>
        p.userId === userId && p.courseId === courseId && p.lessonId === lessonId
          ? { ...p, completed, completedAt: completed ? new Date() : undefined }
          : p
      )
    })),

  removeProgress: (userId, courseId, lessonId) =>
    set((state) => ({
      progress: state.progress.filter(
        (p) => !(p.userId === userId && p.courseId === courseId && p.lessonId === lessonId)
      )
    })),

  resetUserProgress: (userId) =>
    set((state) => ({
      progress: state.progress.filter((p) => p.userId !== userId)
    }))
}))