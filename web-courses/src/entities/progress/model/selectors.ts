// @/entities/progress/model/selectors.ts
import type { LessonProgress, CourseId, LessonId } from './types'

/**
 * Verifica si una lección específica está completada
 * ✅ Normaliza tipos para comparación consistente
 */
export function isLessonCompleted(
  progress: LessonProgress[],
  userId: string,
  courseId: CourseId,
  lessonId: LessonId
): boolean {
  // ✅ NORMALIZAR: Convertir a number
  const normalizedCourseId = typeof courseId === 'string' 
    ? parseInt(courseId, 10) 
    : courseId
  
  const normalizedLessonId = typeof lessonId === 'string'
    ? parseInt(lessonId, 10)
    : lessonId

  return progress.some(
    p =>
      p.userId === userId &&
      p.courseId === normalizedCourseId &&
      p.lessonId === normalizedLessonId &&
      p.completed
  )
}

/**
 * Obtiene el progreso completo de un curso
 */
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

/**
 * Cuenta lecciones completadas de un usuario
 */
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