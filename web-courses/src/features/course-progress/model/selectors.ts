import type { LessonProgress, CourseId, LessonId } from './types'

export const getCourseProgress = (
  progress: LessonProgress[],
  courseId: CourseId
) => {
  const courseProgress = progress.filter(p => p.courseId === courseId)

  const completed = courseProgress.filter(p => p.completed).length
  const total = courseProgress.length
  const percentage = total > 0 ? (completed / total) * 100 : 0

  return { completed, total, percentage }
}

export const isLessonCompleted = (
  progress: LessonProgress[],
  courseId: CourseId,
  lessonId: LessonId
) => {
  return (
    progress.find(
      p => p.courseId === courseId && p.lessonId === lessonId
    )?.completed ?? false
  )
}
