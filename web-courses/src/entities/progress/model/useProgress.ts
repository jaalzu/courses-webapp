import { useCallback } from 'react'
import { useProgressStore } from './useProgressStore'
import { progressApi } from '@/shared/api/progress'

export function useProgress() {
  const progress = useProgressStore((s) => s.progress)
  const isLoading = useProgressStore((s) => s.isLoading)
  const error = useProgressStore((s) => s.error)

  const setProgress = useProgressStore((s) => s.setProgress)
  const setLoading = useProgressStore((s) => s.setLoading)
  const setError = useProgressStore((s) => s.setError)
  const addProgress = useProgressStore((s) => s.addProgress)
  const updateProgress = useProgressStore((s) => s.updateProgress)
  const resetUserProgress = useProgressStore((s) => s.resetUserProgress)

  // Fetch progreso de un usuario
  const fetchUserProgress = useCallback(async (userId: string) => {
    setLoading(true)
    setError(null)

    try {
      const data = await progressApi.getUserProgress(userId)
      setProgress(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [setProgress, setLoading, setError])

  // Fetch todo el progreso
  const fetchAllProgress = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await progressApi.getAllProgress()
      setProgress(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [setProgress, setLoading, setError])

  // Toggle lección (completar/descompletar)
  const toggleLessonProgress = useCallback(
    async (userId: string, courseId: string, lessonId: string) => {
      const existing = progress.find(
        (p) => p.userId === userId && p.courseId === courseId && p.lessonId === lessonId
      )

      const currentCompleted = existing?.completed || false

      try {
        await progressApi.toggleLesson(userId, courseId, lessonId, currentCompleted)

        if (existing) {
          updateProgress(userId, courseId, lessonId, !currentCompleted)
        } else {
          addProgress({
            userId,
            courseId,
            lessonId,
            completed: true,
            completedAt: new Date()
          })
        }
      } catch (err: any) {
        setError(err.message)
      }
    },
    [progress, updateProgress, addProgress, setError]
  )

  // Marcar lección como completada (sin toggle)
  const markLessonCompleted = useCallback(
    async (userId: string, courseId: string, lessonId: string) => {
      try {
        await progressApi.markLessonComplete(userId, courseId, lessonId)

        const exists = progress.some(
          (p) => p.userId === userId && p.courseId === courseId && p.lessonId === lessonId
        )

        if (!exists) {
          addProgress({
            userId,
            courseId,
            lessonId,
            completed: true,
            completedAt: new Date()
          })
        }
      } catch (err: any) {
        setError(err.message)
      }
    },
    [progress, addProgress, setError]
  )

  return {
    progress,
    isLoading,
    error,
    fetchUserProgress,
    fetchAllProgress,
    toggleLessonProgress,
    markLessonCompleted,
    resetUserProgress
  }
}