import type { Course, CourseLevel } from '../model/types'

// ✅ Generar ID es operación básica de la entidad
export function generateCourseId(courses: Course[]): number {
  return courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1
}

// ✅ Configuración de nivel es parte de la entidad Course
export function getLevelConfig(level: CourseLevel) {
  const configs = {
    beginner: { variant: 'success' as const, label: 'Básico' },
    intermediate: { variant: 'warning' as const, label: 'Intermedio' },
    advanced: { variant: 'danger' as const, label: 'Avanzado' },
  }
  return configs[level]
}