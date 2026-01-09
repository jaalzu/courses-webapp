import type {  CourseLevel } from '../types'


export function generateCourseId(): string {
  return typeof window !== 'undefined' 
    ? window.crypto.randomUUID() 
    : Math.random().toString(36).substring(2, 15); // Fallback simple para SSR
}

export function getLevelConfig(level: CourseLevel) {
  const configs = {
    beginner: { variant: 'success' as const, label: 'Básico' },
    intermediate: { variant: 'warning' as const, label: 'Intermedio' },
    advanced: { variant: 'danger' as const, label: 'Avanzado' },
  }
  return configs[level]
}