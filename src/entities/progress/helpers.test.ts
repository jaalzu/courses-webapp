import { describe, it, expect } from 'vitest'
import {
  isLessonCompleted,
  getUserProgress,
  getCourseProgress,
  getCourseStats,
  getCompletedCount,
} from './helpers'
import type { LessonProgress } from './types'
import type { Course } from '@/entities/course/types'

// Mock data para reutilizar en los tests
const mockProgress: LessonProgress[] = [
  { userId: 'user-1', courseId: 'course-1', lessonId: 'lesson-1', completed: true },
  { userId: 'user-1', courseId: 'course-1', lessonId: 'lesson-2', completed: true },
  { userId: 'user-1', courseId: 'course-1', lessonId: 'lesson-3', completed: false },
  { userId: 'user-1', courseId: 'course-2', lessonId: 'lesson-4', completed: true },
  { userId: 'user-2', courseId: 'course-1', lessonId: 'lesson-1', completed: true },
  { userId: 'user-2', courseId: 'course-1', lessonId: 'lesson-2', completed: false },
]

const mockCourse: Course = {
  id: 'course-1',
  title: 'Curso de Pasta',
  description: 'Aprende pasta',
  level: 'beginner',
  duration: '120',
  video: 'https://example.com/video.mp4',
  instructor: 'Chef Mario',
  image: 'url',
  lessons: [
    { id: 'lesson-1', title: 'Intro' },
    { id: 'lesson-2', title: 'Masa' },
    { id: 'lesson-3', title: 'Salsas' },
  ] as any,
}

describe('isLessonCompleted', () => {
  it('debe retornar true si la lección está completada', () => {
    const result = isLessonCompleted(mockProgress, 'user-1', 'course-1', 'lesson-1')
    expect(result).toBe(true)
  })

  it('debe retornar false si la lección no está completada', () => {
    const result = isLessonCompleted(mockProgress, 'user-1', 'course-1', 'lesson-3')
    expect(result).toBe(false)
  })

  it('debe retornar false si la lección no existe en el progreso', () => {
    const result = isLessonCompleted(mockProgress, 'user-1', 'course-1', 'lesson-999')
    expect(result).toBe(false)
  })

  it('debe retornar false si el usuario no existe', () => {
    const result = isLessonCompleted(mockProgress, 'user-999', 'course-1', 'lesson-1')
    expect(result).toBe(false)
  })

  it('debe retornar false si el curso no existe', () => {
    const result = isLessonCompleted(mockProgress, 'user-1', 'course-999', 'lesson-1')
    expect(result).toBe(false)
  })

  it('debe funcionar con array vacío', () => {
    const result = isLessonCompleted([], 'user-1', 'course-1', 'lesson-1')
    expect(result).toBe(false)
  })
})

describe('getUserProgress', () => {
  it('debe retornar todo el progreso de un usuario', () => {
    const result = getUserProgress(mockProgress, 'user-1')
    
    expect(result).toHaveLength(4)
    expect(result.every(p => p.userId === 'user-1')).toBe(true)
  })

  it('debe retornar array vacío si el usuario no tiene progreso', () => {
    const result = getUserProgress(mockProgress, 'user-999')
    
    expect(result).toEqual([])
  })

  it('debe retornar array vacío si el progreso está vacío', () => {
    const result = getUserProgress([], 'user-1')
    
    expect(result).toEqual([])
  })

  it('debe incluir lecciones completadas y no completadas', () => {
    const result = getUserProgress(mockProgress, 'user-1')
    
    const completed = result.filter(p => p.completed)
    const notCompleted = result.filter(p => !p.completed)
    
    expect(completed.length).toBeGreaterThan(0)
    expect(notCompleted.length).toBeGreaterThan(0)
  })
})

describe('getCourseProgress', () => {
  it('debe retornar solo lecciones completadas de un curso', () => {
    const result = getCourseProgress(mockProgress, 'user-1', 'course-1')
    
    expect(result).toHaveLength(2) // lesson-1 y lesson-2 completadas
    expect(result.every(p => p.completed)).toBe(true)
    expect(result.every(p => p.courseId === 'course-1')).toBe(true)
  })

  it('debe retornar array vacío si no hay lecciones completadas', () => {
    const result = getCourseProgress(mockProgress, 'user-3', 'course-1')
    
    expect(result).toEqual([])
  })

  it('debe retornar array vacío si el curso no existe', () => {
    const result = getCourseProgress(mockProgress, 'user-1', 'course-999')
    
    expect(result).toEqual([])
  })

  it('debe filtrar correctamente por usuario y curso', () => {
    const result = getCourseProgress(mockProgress, 'user-2', 'course-1')
    
    expect(result).toHaveLength(1)
    expect(result[0].userId).toBe('user-2')
    expect(result[0].courseId).toBe('course-1')
    expect(result[0].completed).toBe(true)
  })
})

describe('getCourseStats', () => {
  it('debe calcular estadísticas correctamente para progreso parcial', () => {
    const stats = getCourseStats(mockCourse, mockProgress, 'user-1')
    
    expect(stats).toEqual({
      totalLessons: 3,
      completedLessons: 2, // lesson-1 y lesson-2
      isCompleted: false,
      progressPercentage: 67, // 2/3 = 66.66% → 67%
    })
  })

  it('debe marcar como completado cuando todas las lecciones están hechas', () => {
    const completeProgress: LessonProgress[] = [
      { userId: 'user-1', courseId: 'course-1', lessonId: 'lesson-1', completed: true },
      { userId: 'user-1', courseId: 'course-1', lessonId: 'lesson-2', completed: true },
      { userId: 'user-1', courseId: 'course-1', lessonId: 'lesson-3', completed: true },
    ]
    
    const stats = getCourseStats(mockCourse, completeProgress, 'user-1')
    
    expect(stats).toEqual({
      totalLessons: 3,
      completedLessons: 3,
      isCompleted: true,
      progressPercentage: 100,
    })
  })

  it('debe retornar 0% si no hay progreso', () => {
    const stats = getCourseStats(mockCourse, [], 'user-1')
    
    expect(stats).toEqual({
      totalLessons: 3,
      completedLessons: 0,
      isCompleted: false,
      progressPercentage: 0,
    })
  })

  it('debe manejar cursos sin lecciones', () => {
    const emptyCourse: Course = { ...mockCourse, id: 'course-empty', lessons: [] }
    
    const stats = getCourseStats(emptyCourse, mockProgress, 'user-1')
    
    expect(stats).toEqual({
      totalLessons: 0,
      completedLessons: 0,
      isCompleted: false,
      progressPercentage: 0,
    })
  })

  it('debe redondear porcentajes correctamente', () => {
    const courseWith7Lessons: Course = {
      ...mockCourse,
      lessons: Array(7).fill(null).map((_, i) => ({ id: `lesson-${i}` })) as any,
    }
    
    const progressWith3Completed: LessonProgress[] = [
      { userId: 'user-1', courseId: 'course-1', lessonId: 'lesson-0', completed: true },
      { userId: 'user-1', courseId: 'course-1', lessonId: 'lesson-1', completed: true },
      { userId: 'user-1', courseId: 'course-1', lessonId: 'lesson-2', completed: true },
    ]
    
    const stats = getCourseStats(courseWith7Lessons, progressWith3Completed, 'user-1')
    
    // 3/7 = 42.857... → 43%
    expect(stats.progressPercentage).toBe(43)
  })

  it('no debe contar progreso de otros usuarios', () => {
    const stats = getCourseStats(mockCourse, mockProgress, 'user-2')
    
    expect(stats.completedLessons).toBe(1) // Solo lesson-1 de user-2
  })
})

describe('getCompletedCount', () => {
  it('debe contar todas las lecciones completadas de un usuario sin filtro de curso', () => {
    const count = getCompletedCount(mockProgress, 'user-1')
    
    expect(count).toBe(3) // 2 de course-1 + 1 de course-2
  })

  it('debe contar lecciones completadas de un curso específico', () => {
    const count = getCompletedCount(mockProgress, 'user-1', 'course-1')
    
    expect(count).toBe(2)
  })

  it('debe retornar 0 si el usuario no tiene progreso', () => {
    const count = getCompletedCount(mockProgress, 'user-999')
    
    expect(count).toBe(0)
  })

  it('debe retornar 0 si el usuario no completó ninguna lección', () => {
    const noCompleteProgress: LessonProgress[] = [
      { userId: 'user-3', courseId: 'course-1', lessonId: 'lesson-1', completed: false },
    ]
    
    const count = getCompletedCount(noCompleteProgress, 'user-3')
    
    expect(count).toBe(0)
  })

  it('debe retornar 0 para curso inexistente', () => {
    const count = getCompletedCount(mockProgress, 'user-1', 'course-999')
    
    expect(count).toBe(0)
  })

  it('debe manejar array vacío', () => {
    const count = getCompletedCount([], 'user-1')
    
    expect(count).toBe(0)
  })

  it('debe funcionar cuando courseId es undefined', () => {
    const count = getCompletedCount(mockProgress, 'user-1', undefined)
    
    expect(count).toBe(3) // Todas las completadas del usuario
  })
})