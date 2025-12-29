import type { LessonProgress } from '../types'

/**
 * Verifica si una lección está completada
 */
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

/**
 * Obtiene el progreso de un curso específico
 */
export function getCourseProgress(
  progress: LessonProgress[],
  userId: string,
  courseId: string
): LessonProgress[] {
  // 🚩 BORRAMOS el parseInt. Ya no necesitamos normalizar nada.
  return progress.filter(
    p =>
      p.userId === userId &&
      p.courseId === courseId &&
      p.completed
  )
}

/**
 * Cuenta lecciones completadas
 */
export function getCompletedLessonsCount(
  progress: LessonProgress[],
  userId: string,
  courseId?: string
): number {
  const userProgress = progress.filter(
    p => p.userId === userId && p.completed
  )

  if (courseId !== undefined) {
    //  Comparamos string con string directamente
    return userProgress.filter(p => p.courseId === courseId).length
  }

  return userProgress.length
}