import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useCourseNavigation } from './useCourseNavigation'
import { useCourses } from '@/entities/course/model/useCourses'
import type { Lesson } from '@/entities/lesson/types'
vi.mock('@/entities/course/model/useCourses')

describe('useCourseNavigation', () => {
const mockLessons: Lesson[] = [
  { 
    id: 'L1', 
    title: 'Lección 1', 
    duration: '10:00',
    videoUrl: 'http://youtube.com/1' 
  },
  { 
    id: 'L2', 
    title: 'Lección 2', 
    duration: '12:00'
  
  },
]
  
  const mockCourse = {
    id: 'course-123',
    title: 'React Pro',
    lessons: mockLessons
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useCourses).mockReturnValue({
      courses: [mockCourse],
      isLoading: false,
      error: null,
      fetchCourses: vi.fn()
    } as any)
  })

  it('debería inicializar con la primera lección del curso', () => {
    const { result } = renderHook(() => useCourseNavigation('course-123'))

    expect(result.current.currentLesson?.id).toBe('L1')
    expect(result.current.hasNext).toBe(true)
    expect(result.current.hasPrevious).toBe(false)
  })

  it('debería avanzar a la siguiente lección al llamar a goToNext', () => {
    const { result } = renderHook(() => useCourseNavigation('course-123'))

    act(() => {
      result.current.goToNext()
    })

    expect(result.current.currentLesson?.id).toBe('L2')
    expect(result.current.hasNext).toBe(false)
    expect(result.current.hasPrevious).toBe(true)
  })

  it('debería permitir seleccionar una lección específica', () => {
    const { result } = renderHook(() => useCourseNavigation('course-123'))

    act(() => {
      result.current.selectLesson(mockLessons[1])
    })

    expect(result.current.currentLesson?.id).toBe('L2')
  })

  it('no debería avanzar si es la última lección', () => {
    const { result } = renderHook(() => useCourseNavigation('course-123'))

    // Ir a la última
    act(() => {
      result.current.goToNext()
    })
    
    // Intentar ir a una más
    act(() => {
      result.current.goToNext()
    })

    expect(result.current.currentLesson?.id).toBe('L2')
  })
})