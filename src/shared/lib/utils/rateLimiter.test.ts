// @/shared/lib/utils/rateLimiter.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { rateLimiter, RATE_LIMITS } from './rateLimiter'

// === MOCK DE LOCALSTORAGE ===
// Vitest corre en Node.js, por lo que 'localStorage' no existe. 
// Creamos un simulador para que el test funcione igual que en el navegador.
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString() },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} }
  }
})()

// Lo inyectamos en el objeto global
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('RateLimiter Pro (LocalStorage)', () => {
  beforeEach(() => {
    // Limpiamos todo antes de cada test para no arrastrar basura
    rateLimiter.clearAll()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Comportamiento con LocalStorage', () => {
    it('debe permitir el primer request y bloquear el excedente', () => {
      const config = { maxRequests: 2, windowMs: 60000 }
      const key = 'test-user'

      expect(rateLimiter.canProceed(key, config).allowed).toBe(true)
      expect(rateLimiter.canProceed(key, config).allowed).toBe(true)
      
      const result = rateLimiter.canProceed(key, config)
      expect(result.allowed).toBe(false)
      // Verificamos que devuelva el mensaje que armamos para la UI
      expect(result.message).toContain('Espera 60 segundos antes de publicar de nuevo.')
    })

    it('debe mantener el bloqueo incluso si pasa el tiempo pero no el suficiente', () => {
      vi.setSystemTime(0)
      const config = { maxRequests: 1, windowMs: 60000 }
      const key = 'test-time'

      rateLimiter.canProceed(key, config)
      
      // Avanzamos 30 segundos
      vi.setSystemTime(30000)
      
      const result = rateLimiter.canProceed(key, config)
      expect(result.allowed).toBe(false)
      expect(result.message).toContain('Espera 30 segundos antes de publicar de nuevo.') // Debería avisar que faltan 30s
    })

    it('debe resetear el límite después de que pase la ventana de tiempo', () => {
      vi.setSystemTime(0)
      const config = { maxRequests: 1, windowMs: 60000 }
      const key = 'test-reset'

      rateLimiter.canProceed(key, config)
      expect(rateLimiter.canProceed(key, config).allowed).toBe(false)

      // Avanzamos 61 segundos (ventana cerrada)
      vi.setSystemTime(61000)

      expect(rateLimiter.canProceed(key, config).allowed).toBe(true)
    })
  })

  it('FORUM_POST debe permitir exactamente 5 intentos', () => {
  const key = 'user-forum-test'
  
  // Agotamos los 5 permitidos
  for (let i = 0; i < 5; i++) {
    expect(rateLimiter.canProceed(key, RATE_LIMITS.FORUM_POST).allowed).toBe(true)
  }

  // El 6to falla
  const blocked = rateLimiter.canProceed(key, RATE_LIMITS.FORUM_POST)
  expect(blocked.allowed).toBe(false)
  
  // Usamos una Regex flexible para que no importe si dice "5m" o "300s"
  expect(blocked.message).toMatch(/Espera|minutos|segundos/)
})

  describe('Independencia de Keys', () => {
    it('bloquear a un usuario no debe afectar a otro', () => {
      const config = { maxRequests: 1, windowMs: 60000 }
      
      rateLimiter.canProceed('user-A', config)
      
      expect(rateLimiter.canProceed('user-A', config).allowed).toBe(false)
      expect(rateLimiter.canProceed('user-B', config).allowed).toBe(true)
    })
  })
})