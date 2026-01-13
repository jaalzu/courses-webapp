import { renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useFavoriteCourses } from './useFavoritesCourses'
import { useFavoriteIds } from './useFavoritesIds'
import { useCourses } from '@/entities/course/model/useCourses'

// 1. Mockeamos los hooks de los que depende
vi.mock('./useFavoritesIds')
vi.mock('@/entities/course/model/useCourses')

describe('useFavoriteCourses', () => {
  const mockCourses = [
    { id: 'C1', title: 'React' },
    { id: 'C2', title: 'Vue' },
    { id: 'C3', title: 'Angular' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debería devolver solo los cursos que están marcados como favoritos', () => {
    // Simulamos que el usuario tiene como favoritos C1 y C3
    vi.mocked(useFavoriteIds).mockReturnValue({
      favorites: ['C1', 'C3'],
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
      isLoading: false
    })

    // Simulamos que tenemos todos los cursos cargados
    vi.mocked(useCourses).mockReturnValue({
      courses: mockCourses,
      isLoading: false,
      error: null,
      fetchCourses: vi.fn()
    } as any)

    const { result } = renderHook(() => useFavoriteCourses())

    // Debería filtrar y dejar solo React y Angular
    expect(result.current.favoriteCourses).toHaveLength(2)
    expect(result.current.favoriteCourses[0].id).toBe('C1')
    expect(result.current.favoriteCourses[1].id).toBe('C3')
    expect(result.current.favoriteCourses.find(c => c.id === 'C2')).toBeUndefined()
  })

  it('debería devolver un array vacío si no hay favoritos', () => {
    vi.mocked(useFavoriteIds).mockReturnValue({
      favorites: [],
      isFavorite: vi.fn(),
      toggleFavorite: vi.fn(),
      isLoading: false
    })

    vi.mocked(useCourses).mockReturnValue({
      courses: mockCourses,
      isLoading: false,
      error: null,
      fetchCourses: vi.fn()
    } as any)

    const { result } = renderHook(() => useFavoriteCourses())

    expect(result.current.favoriteCourses).toHaveLength(0)
  })
})