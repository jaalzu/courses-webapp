import type { CourseLevel } from '@/types/course'

export function getLevelConfig(level: CourseLevel) {
  const configs = {
    beginner: { variant: 'success' as const, label: 'Básico' },
    intermediate: { variant: 'warning' as const, label: 'Intermedio' },
    advanced: { variant: 'danger' as const, label: 'Avanzado' }
  }
  
  return configs[level]
}

export function calculateCourseProgress(lessons: any[]) {
  const totalLessons = lessons.length
  const completedCount = totalLessons > 0 
    ? lessons.filter(lesson => lesson.completed).length 
    : 0

  const progress = totalLessons > 0 
    ? Math.round((completedCount / totalLessons) * 100)
    : 0

  return { progress, completed: { done: completedCount, total: totalLessons } }
}