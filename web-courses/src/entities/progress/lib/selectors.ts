import type { LessonProgress } from '../types'

export function isLessonCompleted(
  progress: LessonProgress[],
  userId: string,
  courseId: string, 
  lessonId: string
): boolean {
  return progress.some(
    p =>
      p.userId === userId &&
      p.courseId === courseId &&
      p.lessonId === lessonId &&
      p.completed
  )
}


export function getCourseProgress(
  progress: LessonProgress[],
  userId: string,
  courseId: string
): LessonProgress[] {
  return progress.filter(
    p =>
      p.userId === userId &&
      p.courseId === courseId &&
      p.completed
  )
}


export function getCompletedLessonsCount(
  progress: LessonProgress[],
  userId: string,
  courseId?: string
): number {
  const userProgress = progress.filter(
    p => p.userId === userId && p.completed
  )

  if (courseId !== undefined) {
    return userProgress.filter(p => p.courseId === courseId).length
  }

  return userProgress.length
}