// src/lib/utils/courseUtils.ts
import type { Course, CourseLevel } from '@/types/course'

// ——— Generar nuevo ID de curso ———
export function generateCourseId(courses: Course[]): number {
  return courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1
}

// ——— Toggle de lección completa ———
export function toggleLesson(courses: Course[], courseId: number, lessonId: number): Course[] {
  return courses.map(course =>
    course.id === courseId
      ? {
          ...course,
          lessons: course.lessons.map(lesson =>
            lesson.id === lessonId
              ? { ...lesson, completed: !lesson.completed }
              : lesson
          ),
        }
      : course
  )
}

// ——— Configuración de niveles de curso ———
export function getLevelConfig(level: CourseLevel) {
  const configs = {
    beginner: { variant: 'success' as const, label: 'Básico' },
    intermediate: { variant: 'warning' as const, label: 'Intermedio' },
    advanced: { variant: 'danger' as const, label: 'Avanzado' },
  }

  return configs[level]
}

// ——— Calcular progreso de curso ———
export function calculateCourseProgress(lessons: { completed: boolean }[]) {
  const totalLessons = lessons.length
  const completedCount = totalLessons > 0
    ? lessons.filter(lesson => lesson.completed).length
    : 0

  const progress = totalLessons > 0
    ? Math.round((completedCount / totalLessons) * 100)
    : 0

  return { progress, completed: { done: completedCount, total: totalLessons } }
}
