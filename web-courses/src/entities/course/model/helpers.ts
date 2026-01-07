import type {  CourseLevel } from '../types'

//  Generar ID 

export function generateCourseId(): string {
  return typeof window !== 'undefined' 
    ? window.crypto.randomUUID() 
    : Math.random().toString(36).substring(2, 15); // Fallback simple para SSR
}

//  Configuración de nivel 
export function getLevelConfig(level: CourseLevel) {
  const configs = {
    beginner: { variant: 'success' as const, label: 'Básico' },
    intermediate: { variant: 'warning' as const, label: 'Intermedio' },
    advanced: { variant: 'danger' as const, label: 'Avanzado' },
  }
  return configs[level]
}