// @/entities/progress/model/selectors.ts
import type { LessonProgress, CourseId, LessonId } from './types'

export function isLessonCompleted(
  progress: LessonProgress[],
  userId: string,
  courseId: CourseId,
  lessonId: LessonId
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
  courseId: CourseId
): LessonProgress[] {
  const normalizedCourseId = typeof courseId === 'string' 
    ? parseInt(courseId, 10) 
    : courseId

  return progress.filter(
    p =>
      p.userId === userId &&
      p.courseId === normalizedCourseId &&
      p.completed
  )
}

export function getCompletedLessonsCount(
  progress: LessonProgress[],
  userId: string,
  courseId?: CourseId
): number {
  const userProgress = progress.filter(
    p => p.userId === userId && p.completed
  )

  if (courseId !== undefined) {
    const normalizedCourseId = typeof courseId === 'string' 
      ? parseInt(courseId, 10) 
      : courseId

    return userProgress.filter(p => p.courseId === normalizedCourseId).length
  }

  return userProgress.length
}