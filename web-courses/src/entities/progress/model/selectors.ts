import type { LessonProgress, CourseId, LessonId } from './types'

export const getCourseProgress = (
  progress: LessonProgress[],
  userId: string,
  courseId: CourseId
) => {
  const courseProgress = progress.filter(
    p => p.userId === userId && p.courseId === courseId
  )

  const completed = courseProgress.filter(p => p.completed).length
  const total = courseProgress.length
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return { completed, total, percentage }
}


export const isLessonCompleted = (
  progress: LessonProgress[],
  userId: string,
  courseId: CourseId,
  lessonId: LessonId
) =>
  progress.some(
    p =>
      p.userId === userId &&
      p.courseId === courseId &&
      p.lessonId === lessonId &&
      p.completed
  )

