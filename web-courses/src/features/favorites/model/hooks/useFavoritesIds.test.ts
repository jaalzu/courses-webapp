import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useFavoriteIds } from './useFavoritesIds'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { supabaseFavorites } from '@/features/favorites/lib/supabaseFavorites'
import { localStorageFavorites } from '@/features/favorites/lib/favoriteStorage'

// 1. Mocks de las dependencias
vi.mock('@/features/auth/model/useAuthStore')
vi.mock('@/features/favorites/lib/supabaseFavorites')
vi.mock('@/features/favorites/lib/favoriteStorage')

describe('useFavoriteIds', () => {
  const mockUserId = 'user-123'
  
  // Objeto helper para simular el comportamiento de los servicios de storage
  const mockStorageInstance = {
    get: vi.fn().mockReturnValue([]),
    subscribe: vi.fn().mockReturnValue(() => {}), // devuelve el unsubscribe
    add: vi.fn().mockResolvedValue(undefined),
    remove: vi.fn().mockResolvedValue(undefined),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock default del Store: Usuario NO logueado
    // Usamos (selector: any) y "as any" para evitar que TS pida las 10+ funciones del Store
    vi.mocked(useAuthStore).mockImplementation((selector: any) => 
      selector({ 
        currentUser: null,
        isAuthenticated: false 
      } as any)
    )

    // Mock default de LocalStorage
    vi.mocked(localStorageFavorites).get.mockReturnValue([])
    vi.mocked(localStorageFavorites).subscribe.mockReturnValue(() => () => {})
  })

  it('debería usar localStorage si NO hay usuario logueado', () => {
    renderHook(() => useFavoriteIds())
    
    expect(localStorageFavorites.get).toHaveBeenCalled()
    expect(supabaseFavorites).not.toHaveBeenCalled()
  })

  it('debería usar supabase si HAY un usuario logueado', () => {
    // Simulamos que el store devuelve un usuario
    vi.mocked(useAuthStore).mockImplementation((selector: any) => 
      selector({ 
        currentUser: { id: mockUserId },
        isAuthenticated: true 
      } as any)
    )
    
    // El servicio de supabase devuelve nuestra instancia de mock
    vi.mocked(supabaseFavorites).mockReturnValue(mockStorageInstance as any)

    renderHook(() => useFavoriteIds())
    
    expect(supabaseFavorites).toHaveBeenCalledWith(mockUserId)
    expect(mockStorageInstance.get).toHaveBeenCalled()
  })

  it('debería llamar a remove si el item ya es favorito', async () => {
    // Simulamos que el curso 'C1' ya está en favoritos
    vi.mocked(localStorageFavorites).get.mockReturnValue(['C1'])
    
    const { result } = renderHook(() => useFavoriteIds())

    await act(async () => {
      await result.current.toggleFavorite('C1')
    })

    expect(localStorageFavorites.remove).toHaveBeenCalledWith('C1')
  })

  it('debería llamar a add si el item NO es favorito', async () => {
    vi.mocked(localStorageFavorites).get.mockReturnValue([])
    
    const { result } = renderHook(() => useFavoriteIds())

    await act(async () => {
      await result.current.toggleFavorite('C2')
    })

    expect(localStorageFavorites.add).toHaveBeenCalledWith('C2')
  })
})