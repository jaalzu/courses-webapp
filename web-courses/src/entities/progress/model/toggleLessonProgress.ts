import type { LessonProgress } from './types'

export function toggleLessonProgress(
  progress: LessonProgress[],
  userId: string,
  courseId: number,
  lessonId: number
): LessonProgress[] {
  const existing = progress.find(
    p =>
      p.userId === userId &&
      p.courseId === courseId &&
      p.lessonId === lessonId
  )

  if (!existing) {
    return [
      ...progress,
      {
        userId,
        courseId,
        lessonId,
        completed: true,
        completedAt: new Date(),
      },
    ]
  }

  return progress.map(p =>
    p === existing
      ? {
          ...p,
          completed: !p.completed,
          completedAt: !p.completed ? new Date() : undefined,
        }
      : p
  )
}
