// @/entities/progress/model/index.ts

// Store (estado + acciones)
export { useProgressStore } from './useProgressStore'

// Tipos
export type { LessonProgress, CourseId, LessonId } from './types'

// Helpers (funciones de lectura)
export {
  isLessonCompleted,
  getUserProgress,
  getCourseProgress,
  getCourseStats,
  getCompletedCount,
} from './helpers'