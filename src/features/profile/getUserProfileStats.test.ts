import { describe, it, expect, vi } from 'vitest'
import { getUserProfileStats } from './getUserProfileStats'
import * as progressEntities from '@/entities/progress'
import type { Course } from '@/entities/course/types'
import type { LessonProgress } from '@/entities/progress/types'

// Mockeamos la entidad de progreso
vi.mock('@/entities/progress', () => ({
  getCourseStats: vi.fn()
}))

describe('getUserProfileStats', () => {
  const mockUser = { id: 'u1', name: 'Test User', email: 'test@test.com' }
  const mockCourses = [
    { id: 'c1', title: 'Curso 1' },
    { id: 'c2', title: 'Curso 2' }
  ] as unknown as Course[]
  
  const mockProgress = [] as LessonProgress[]

  it('debería calcular correctamente los agregados de varios cursos en un solo recorrido', () => {
    // Simulamos 2 cursos: uno al 100% y otro al 50%
    vi.mocked(progressEntities.getCourseStats)
      .mockReturnValueOnce({ isCompleted: true, completedLessons: 10, totalLessons: 10 } as any)
      .mockReturnValueOnce({ isCompleted: false, completedLessons: 5, totalLessons: 10 } as any)

    const result = getUserProfileStats({
      user: mockUser,
      courses: mockCourses,
      progress: mockProgress
    })

    expect(result.totalCourses).toBe(2)
    expect(result.completedCourses).toBe(1)
    expect(result.inProgressCourses).toBe(1)
    expect(result.completedLessons).toBe(15)
    expect(result.progressPercentage).toBe(75)
  })

  it('debería manejar el caso de cursos null o vacíos devolviendo valores iniciales', () => {
    // @ts-ignore - forzamos null para testear la "Guard Clause"
    const result = getUserProfileStats({ user: mockUser, courses: null, progress: [] })
    
    // Ya no buscamos courseStats, buscamos que los contadores estén en 0
    expect(result.totalCourses).toBe(0)
    expect(result.completedCourses).toBe(0)
    expect(result.progressPercentage).toBe(0)
    expect(result.userName).toBe(mockUser.name)
  })

  it('debería retornar 0% si el total de lecciones es 0', () => {
    vi.mocked(progressEntities.getCourseStats).mockReturnValue({
      isCompleted: false,
      completedLessons: 0,
      totalLessons: 0
    } as any)

    const result = getUserProfileStats({
      user: mockUser,
      courses: mockCourses,
      progress: []
    })

    expect(result.progressPercentage).toBe(0)
  })
})