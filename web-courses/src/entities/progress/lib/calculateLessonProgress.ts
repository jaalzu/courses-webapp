import type { Lesson } from '@/entities/lesson/types'
import type { LessonProgress } from '.././index'

export function calculateCourseProgress(
  lessons: Lesson[],
  progress: LessonProgress[],
  userId: string,
  courseId: number
) {
  const completedCount = lessons.filter(lesson =>
    progress.some(
      p =>
        p.userId === userId &&
        p.courseId === courseId &&
        p.lessonId === lesson.id &&
        p.completed
    )
  ).length

  const total = lessons.length

  return {
    progress: total === 0
      ? 0
      : Math.round((completedCount / total) * 100),
    completed: { done: completedCount, total },
  }
}
