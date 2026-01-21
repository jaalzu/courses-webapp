import { describe, it, expect } from 'vitest'
import { deriveMetrics } from './deriveMetrics'
import type { User } from '@/entities/user/model/types'
import type { Course } from '@/entities/course/types'
import type { LessonProgress } from '@/entities/progress/types'

describe('deriveMetrics', () => {
  // 1. Doble cast: unknown -> User[] para saltar la validación de solapamiento
  const mockUsers = ([
    { 
      id: 'u1', 
      name: 'Admin', 
      role: 'admin', 
      email: 'admin@test.com', 
      createdAt: '2026-01-01' 
    },
    { 
      id: 'u2', 
      name: 'Student', 
      role: 'student', 
      email: 'student@test.com', 
      createdAt: '2026-01-02' 
    },
  ] as unknown) as User[]

  // 2. Lo mismo para los cursos
  const mockCourses = ([
    { 
      id: 'c1', 
      title: 'React Basics', 
      lessons: [{ id: 'l1' }, { id: 'l2' }] 
    }
  ] as unknown) as Course[]

  it('debería calcular correctamente los totales básicos', () => {
    const result = deriveMetrics({ 
      users: mockUsers, 
      courses: mockCourses, 
      progress: [] 
    })

    expect(result.totalUsers).toBe(2)
    expect(result.admins).toBe(1)
    expect(result.students).toBe(1)
  })

  it('debería marcar un curso como completado si tiene todas las lecciones', () => {
    // Para el progreso no suele hacer falta el unknown porque suele ser una interfaz más plana
    const progress = [
      { userId: 'u2', lessonId: 'l1', completed: true },
      { userId: 'u2', lessonId: 'l2', completed: true }
    ] as unknown as LessonProgress[]

    const result = deriveMetrics({ 
      users: mockUsers.filter(u => u.id === 'u2'), 
      courses: mockCourses, 
      progress 
    })

    expect(result.totalCoursesCompleted).toBe(1)
    expect(result.usersWithProgress[0].completedCoursesCount).toBe(1)
  })

  it('debería ordenar los cursos populares por cantidad de finalizaciones', () => {
    const moreCourses = ([
      ...mockCourses,
      { id: 'c2', title: 'Vue', lessons: [{ id: 'l3' }] }
    ] as unknown) as Course[]

    const progress = ([
      { userId: 'u1', lessonId: 'l1', completed: true },
      { userId: 'u1', lessonId: 'l2', completed: true },
      { userId: 'u2', lessonId: 'l1', completed: true },
      { userId: 'u2', lessonId: 'l2', completed: true },
      { userId: 'u2', lessonId: 'l3', completed: true },
    ] as unknown) as LessonProgress[]

    const result = deriveMetrics({ 
      users: mockUsers, 
      courses: moreCourses, 
      progress 
    })

    expect(result.popularCourses[0].completionCount).toBe(2)
    expect(result.popularCourses[1].completionCount).toBe(1)
  })
})