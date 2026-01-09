import { useCallback, useEffect } from 'react'
import { useProgressStore } from './useProgressStore'
import { progressApi } from '@/shared/api/progress'

export function useProgress(autoFetch = false) {
  const progress = useProgressStore((s) => s.progress)
  const isLoading = useProgressStore((s) => s.isLoading)
  const error = useProgressStore((s) => s.error)

  const { 
    setProgress, 
    setLoading, 
    setError, 
    addProgress, 
    updateProgress, 
    resetUserProgress 
  } = useProgressStore()

  // Fetch todo el progreso (usado en Metrics)
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

  // Fetch progreso de un usuario específico
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

  // Auto-fetch para el dashboard de métricas
  useEffect(() => {
    if (autoFetch && progress.length === 0) {
      fetchAllProgress()
    }
  }, [autoFetch, fetchAllProgress, progress.length])

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

  return {
    progress,
    isLoading,
    error,
    fetchUserProgress,
    fetchAllProgress,
    toggleLessonProgress,
    resetUserProgress
  }
}