import { vi, describe, it, expect, beforeEach } from 'vitest'

// 1. Mock de Supabase para evitar errores de variables de entorno
vi.mock('@/shared/lib/supabase/client', () => ({
  supabase: { from: vi.fn(), auth: vi.fn() },
}))

import { renderHook, waitFor } from '@testing-library/react'
import { useUsers } from './useUsers'
import { useUserStore } from './useUserStore'
import { usersApi } from '@/shared/api/users'
import type { User } from '@/entities/user/index'

vi.mock('./useUserStore')
vi.mock('@/shared/api/users')

describe('useUsers Hook', () => {
  const mockSetUsers = vi.fn()
  const mockSetLoading = vi.fn()
  const mockSetError = vi.fn()

  const makeUser = (overrides: Partial<User> = {}): User => ({
    id: '1',
    name: 'User Test',
    email: 'test@test.com',
    role: 'student',
    createdAt: new Date(),
    assignedCourses: [],
    ...overrides
  })

  beforeEach(() => {
    vi.clearAllMocks()

    // 2. Mock simplificado: Devolvemos todo el store en cada llamada.
    // Esto asegura que cuando useUsers hace useUserStore((s) => s.users) funcione.
    vi.mocked(useUserStore).mockImplementation((selector: any) => {
      const state = {
        users: [],
        isLoading: false,
        error: null,
        setUsers: mockSetUsers,
        setLoading: mockSetLoading,
        setError: mockSetError,
      }
      return selector ? selector(state) : state
    })
  })

  it('debería ejecutar fetchUsers automáticamente si autoFetch es true', async () => {
    const mockData: User[] = [makeUser()]
    vi.mocked(usersApi.getAll).mockResolvedValue(mockData)

    renderHook(() => useUsers(true))

    // 3. Verificamos que se llamen las acciones del store
    await waitFor(() => {
      expect(mockSetLoading).toHaveBeenCalledWith(true)
      expect(mockSetUsers).toHaveBeenCalledWith(mockData)
      expect(mockSetLoading).toHaveBeenCalledWith(false)
    })
  })

  it('debería manejar errores de la API correctamente', async () => {
    const errorMsg = 'Error de conexión'
    vi.mocked(usersApi.getAll).mockRejectedValue(new Error(errorMsg))

    const { result } = renderHook(() => useUsers())
    
    // Ejecutamos manualmente la acción
    await result.current.fetchUsers()

    expect(mockSetError).toHaveBeenCalledWith(errorMsg)
    expect(mockSetLoading).toHaveBeenCalledWith(false)
  })
})