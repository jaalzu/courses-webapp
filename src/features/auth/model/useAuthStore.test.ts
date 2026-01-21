import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuthStore } from './useAuthStore' // ajustá la ruta
import { authService } from '@/features/auth/services/authServices'

// Mock del servicio de autenticación
vi.mock('@/features/auth/services/authServices', () => ({
  authService: {
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    getCurrentUser: vi.fn(),
    updateProfile: vi.fn(),
    signInWithGoogle: vi.fn(),
  }
}))

describe('useAuthStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Resetear el estado del store manualmente antes de cada test
    useAuthStore.setState({
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,
    })
  })

  it('debería inicializar con el estado por defecto', () => {
    const state = useAuthStore.getState()
    expect(state.currentUser).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('login exitoso debería actualizar el usuario e isAuthenticated', async () => {
    const mockUser = { id: '1', email: 'test@test.com', name: 'Tester' }
    vi.mocked(authService.signIn).mockResolvedValue({ user: mockUser } as any)

    await useAuthStore.getState().login('test@test.com', 'password123')

    const state = useAuthStore.getState()
    expect(state.currentUser).toEqual(mockUser)
    expect(state.isAuthenticated).toBe(true)
    expect(state.isLoading).toBe(false)
  })

  it('logout debería limpiar el estado', async () => {
    // Seteamos un estado inicial logueado
    useAuthStore.setState({ isAuthenticated: true, currentUser: { id: '1' } as any })
    vi.mocked(authService.signOut).mockResolvedValue(undefined)

    await useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.currentUser).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('checkAuth debería sincronizar el usuario si existe sesión', async () => {
    const mockUser = { id: '1', email: 'test@test.com' }
    vi.mocked(authService.getCurrentUser).mockResolvedValue(mockUser as any)

    await useAuthStore.getState().checkAuth()

    expect(useAuthStore.getState().currentUser).toEqual(mockUser)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
  })

  it('debería manejar errores en el login y apagar el loading', async () => {
    vi.mocked(authService.signIn).mockRejectedValue(new Error('Auth failed'))

    // Verificamos que el error se propague (throw) como dice tu catch
    await expect(useAuthStore.getState().login('a@a.com', '123'))
      .rejects.toThrow('Auth failed')

    expect(useAuthStore.getState().isLoading).toBe(false)
  })
})