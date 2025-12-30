import type { Course, CourseLevel } from '../types'

//  Generar ID 
// ./src/entities/course/model/helpers.ts

// Ya no necesitamos los cursos para "calcular" el siguiente ID
export function generateCourseId(): string {
  // crypto.randomUUID() es nativo en navegadores modernos y Next.js
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