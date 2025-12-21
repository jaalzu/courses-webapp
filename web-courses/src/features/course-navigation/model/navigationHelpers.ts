// @/features/course-navigation/lib/navigationHelpers.ts
import type { Lesson } from '@/entities/lesson/model/types'
import type { Course } from '@/entities/course/model/types'

export function getLessonIndex(course: Course, lessonId: number): number {
  return course.lessons.findIndex(l => l.id === lessonId)
}

export function getNextLesson(course: Course, currentLessonId: number): Lesson | null {
  const currentIndex = getLessonIndex(course, currentLessonId)
  return course.lessons[currentIndex + 1] || null
}

export function getPreviousLesson(course: Course, currentLessonId: number): Lesson | null {
  const currentIndex = getLessonIndex(course, currentLessonId)
  return course.lessons[currentIndex - 1] || null
}

export function hasNextLesson(course: Course, currentLessonId: number): boolean {
  const currentIndex = getLessonIndex(course, currentLessonId)
  return currentIndex < course.lessons.length - 1
}

export function hasPreviousLesson(course: Course, currentLessonId: number): boolean {
  const currentIndex = getLessonIndex(course, currentLessonId)
  return currentIndex > 0
}