// @/entities/progress/model/helpers.ts
import type { LessonProgress } from './types'
import type { Course } from '@/entities/course/types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPERS DE LECTURA (no modifican estado)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Verifica si una lección está completada
 */
export function isLessonCompleted(
  progress: LessonProgress[],
  userId: string,
  courseId: number,
  lessonId: number
): boolean {
  return progress.some(
    p =>
      p.userId === userId &&
      p.courseId === courseId &&
      p.lessonId === lessonId &&
      p.completed
  )
}

/**
 * Obtiene todo el progreso de un usuario
 */
export function getUserProgress(
  progress: LessonProgress[],
  userId: string
): LessonProgress[] {
  return progress.filter(p => p.userId === userId)
}

/**
 * Obtiene el progreso de un curso específico
 */
export function getCourseProgress(
  progress: LessonProgress[],
  userId: string,
  courseId: number
): LessonProgress[] {
  return progress.filter(
    p => p.userId === userId && p.courseId === courseId && p.completed
  )
}

/**
 * Calcula estadísticas de progreso de un curso
 */
export function getCourseStats(
  course: Course,
  progress: LessonProgress[],
  userId: string
) {
  const totalLessons = course.lessons.length

  // Filtrar progreso completado de este usuario en este curso
  const completedLessons = progress.filter(
    p =>
      p.userId === userId &&
      p.courseId === course.id &&
      p.completed
  ).length

  const isCompleted = totalLessons > 0 && completedLessons === totalLessons

  const progressPercentage =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100)

  return {
    totalLessons,
    completedLessons,
    isCompleted,
    progressPercentage,
  }
}

/**
 * Cuenta lecciones completadas (total o por curso)
 */
export function getCompletedCount(
  progress: LessonProgress[],
  userId: string,
  courseId?: number
): number {
  const userProgress = progress.filter(
    p => p.userId === userId && p.completed
  )

  if (courseId !== undefined) {
    return userProgress.filter(p => p.courseId === courseId).length
  }

  return userProgress.length
}