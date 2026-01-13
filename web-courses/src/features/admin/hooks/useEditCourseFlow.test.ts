import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useEditCourseFlow } from './useEditCourseFlow'
import { useCourses } from '@/entities/course/model/useCourses'



// Mock del hook dependiente
vi.mock('@/entities/course/model/useCourses')

describe('useEditCourseFlow', () => {
  const mockCourses = [
    { id: '1', title: 'React Avanzado' },
    { id: '2', title: 'Next.js con Vitest' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Forzamos que useCourses devuelva nuestros cursos de prueba
    vi.mocked(useCourses).mockReturnValue({
      courses: mockCourses,
      isLoading: false,
      error: null,
      fetchCourses: vi.fn(),
    } as any)
  })

  it('debería iniciar con el estado cerrado y sin curso', () => {
    const { result } = renderHook(() => useEditCourseFlow())

    expect(result.current.step).toBe('closed')
    expect(result.current.courseId).toBeNull()
    expect(result.current.course).toBeUndefined()
  })

  it('debería abrir el flujo y encontrar el curso correcto por ID', () => {
    const { result } = renderHook(() => useEditCourseFlow())

    act(() => {
      result.current.open('2')
    })

    expect(result.current.step).toBe('open')
    expect(result.current.courseId).toBe('2')
    expect(result.current.course).toEqual(mockCourses[1])
  })

  it('debería resetear el estado al llamar a close', () => {
    const { result } = renderHook(() => useEditCourseFlow())

    // Primero abrimos
    act(() => {
      result.current.open('1')
    })
    
    // Luego cerramos
    act(() => {
      result.current.close()
    })

    expect(result.current.step).toBe('closed')
    expect(result.current.courseId).toBeNull()
    expect(result.current.course).toBeUndefined()
  })

  it('debería devolver undefined si el cursoId no existe en la lista de cursos', () => {
    const { result } = renderHook(() => useEditCourseFlow())

    act(() => {
      result.current.open('non-existent-id')
    })

    expect(result.current.course).toBeUndefined()
  })
})