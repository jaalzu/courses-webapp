// @/entities/progress/lib/getUserProgress.ts
import type { LessonProgress } from './model/types'

export function getUserProgress(
  progress: LessonProgress[],
  userId: string
): LessonProgress[] {
  return progress.filter(p => p.userId === userId)
}