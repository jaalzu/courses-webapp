import type { Lesson } from '@/entities/lesson/types'
import type { Course } from '@/entities/course/types'

/**
 * Encuentra el índice de una lección dentro del array del curso
 */
export function getLessonIndex(course: Course, lessonId: string): number {
  if (!course.lessons) return -1
  return course.lessons.findIndex(l => l.id === lessonId)
}

export function getNextLesson(course: Course, currentLessonId: string): Lesson | null {
  const currentIndex = getLessonIndex(course, currentLessonId)
  if (currentIndex === -1) return null
  return course.lessons[currentIndex + 1] || null
}

export function getPreviousLesson(course: Course, currentLessonId: string): Lesson | null {
  const currentIndex = getLessonIndex(course, currentLessonId)
  if (currentIndex === -1) return null
  return course.lessons[currentIndex - 1] || null
}

export function hasNextLesson(course: Course, currentLessonId: string): boolean {
  const currentIndex = getLessonIndex(course, currentLessonId)
  if (currentIndex === -1) return false
  return currentIndex < course.lessons.length - 1
}

export function hasPreviousLesson(course: Course, currentLessonId: string): boolean {
  const currentIndex = getLessonIndex(course, currentLessonId)
  return currentIndex > 0
}