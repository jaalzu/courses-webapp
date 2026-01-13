import { describe, it, expect, vi, beforeEach } from 'vitest'
import { authService } from './authServices'
import { authQueries } from '@/shared/lib/supabase/queries/auth'
import { profileQueries } from '@/shared/lib/supabase/queries/profiles'
import * as mapper from './profileMapper'

// Mocks de las queries y el cliente de supabase
vi.mock('@/shared/lib/supabase/queries/auth', () => ({
  authQueries: {
    signUp: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
    getCurrentUser: vi.fn(),
  }
}))

vi.mock('@/shared/lib/supabase/queries/profiles', () => ({
  profileQueries: {
    getById: vi.fn(),
    update: vi.fn(),
  }
}))

// Mock del cliente de supabase (para el auth.updateUser)
vi.mock('@/shared/lib/supabase/client', () => ({
  supabase: {
    auth: {
      updateUser: vi.fn(() => Promise.resolve({ error: null }))
    }
  }
}))

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('signIn', () => {
    it('debería autenticar al usuario y retornar el perfil mapeado', async () => {
      const mockAuthData = { user: { id: '123' }, session: { access_token: 'token' } }
      const mockProfile = { id: '123', full_name: 'John Doe', email: 'john@example.com' }
      
      vi.mocked(authQueries.signIn).mockResolvedValue({ data: mockAuthData, error: null } as any)
      vi.mocked(profileQueries.getById).mockResolvedValue({ data: mockProfile, error: null } as any)

      const result = await authService.signIn('john@example.com', 'password123')

      expect(authQueries.signIn).toHaveBeenCalledWith('john@example.com', 'password123')
      expect(profileQueries.getById).toHaveBeenCalledWith('123')
      // Verificamos que devuelva el usuario (el mapper ya hace su trabajo)
      expect(result.user.id).toBe('123')
      expect(result.session).toBeDefined()
    })

    it('debería lanzar un error si el perfil no existe', async () => {
      vi.mocked(authQueries.signIn).mockResolvedValue({ data: { user: { id: '1' } }, error: null } as any)
      vi.mocked(profileQueries.getById).mockResolvedValue({ data: null, error: null } as any)

      await expect(authService.signIn('a@a.com', '123')).rejects.toThrow('Profile not found')
    })
  })

  describe('updateProfile', () => {
    it('debería actualizar el perfil y los metadatos de auth', async () => {
      const mockUpdates = { name: 'New Name' }
      const mockUpdatedProfile = { id: '1', full_name: 'New Name' }
      
      vi.mocked(profileQueries.update).mockResolvedValue({ data: mockUpdatedProfile, error: null } as any)

      const result = await authService.updateProfile('1', mockUpdates)

      expect(profileQueries.update).toHaveBeenCalled()
      expect(result).toBeDefined()
    })
  })
})