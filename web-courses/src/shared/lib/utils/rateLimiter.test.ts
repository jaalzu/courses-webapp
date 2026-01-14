import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { rateLimiter, RATE_LIMITS } from './rateLimiter'

describe('RateLimiter', () => {
  beforeEach(() => {
    rateLimiter.clearAll()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('canProceed - comportamiento básico', () => {
    it('debe permitir el primer request', () => {
      const config = { maxRequests: 3, windowMs: 60000 }
      
      const result = rateLimiter.canProceed('user-1', config)
      
      expect(result.allowed).toBe(true)
      expect(result.retryAfter).toBeUndefined()
    })

    it('debe permitir requests hasta el límite', () => {
      const config = { maxRequests: 3, windowMs: 60000 }
      
      const r1 = rateLimiter.canProceed('user-1', config)
      const r2 = rateLimiter.canProceed('user-1', config)
      const r3 = rateLimiter.canProceed('user-1', config)
      
      expect(r1.allowed).toBe(true)
      expect(r2.allowed).toBe(true)
      expect(r3.allowed).toBe(true)
    })

    it('debe bloquear requests que exceden el límite', () => {
      const config = { maxRequests: 3, windowMs: 60000 }
      
      rateLimiter.canProceed('user-1', config)
      rateLimiter.canProceed('user-1', config)
      rateLimiter.canProceed('user-1', config)
      
      const result = rateLimiter.canProceed('user-1', config)
      
      expect(result.allowed).toBe(false)
      expect(result.retryAfter).toBeGreaterThan(0)
    })

    it('debe bloquear exactamente en el límite + 1', () => {
      const config = { maxRequests: 5, windowMs: 60000 }
      
      // Hacer exactamente 5 requests
      for (let i = 0; i < 5; i++) {
        expect(rateLimiter.canProceed('user-1', config).allowed).toBe(true)
      }
      
      // El 6to debe fallar
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(false)
    })
  })

  describe('canProceed - ventana de tiempo', () => {
    it('debe limpiar requests viejos después de la ventana', () => {
      vi.setSystemTime(0)
      const config = { maxRequests: 2, windowMs: 60000 } // 1 minuto
      
      // Hacer 2 requests (límite alcanzado)
      rateLimiter.canProceed('user-1', config)
      rateLimiter.canProceed('user-1', config)
      
      // Verificar que está bloqueado
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(false)
      
      // Avanzar 61 segundos (fuera de la ventana)
      vi.setSystemTime(61000)
      
      // Ahora debe permitir nuevamente
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(true)
    })

    it('debe mantener bloqueado dentro de la ventana', () => {
      vi.setSystemTime(0)
      const config = { maxRequests: 2, windowMs: 60000 }
      
      rateLimiter.canProceed('user-1', config)
      rateLimiter.canProceed('user-1', config)
      
      // Avanzar solo 30 segundos (aún dentro de la ventana)
      vi.setSystemTime(30000)
      
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(false)
    })

    it('debe limpiar requests parcialmente', () => {
      vi.setSystemTime(0)
      const config = { maxRequests: 3, windowMs: 60000 }
      
      // Request 1 en t=0
      rateLimiter.canProceed('user-1', config)
      
      // Avanzar 30 seg
      vi.setSystemTime(30000)
      
      // Requests 2 y 3 en t=30
      rateLimiter.canProceed('user-1', config)
      rateLimiter.canProceed('user-1', config)
      
      // Verificar bloqueado
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(false)
      
      // Avanzar a t=61 (request 1 ya expiró, pero 2 y 3 no)
      vi.setSystemTime(61000)
      
      // Solo se limpió 1 request, aún quedan 2 válidos (límite 3)
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(true)
    })
  })

  describe('canProceed - cálculo de retryAfter', () => {
    it('debe calcular correctamente el tiempo de espera', () => {
      vi.setSystemTime(0)
      const config = { maxRequests: 2, windowMs: 60000 }
      
      rateLimiter.canProceed('user-1', config)
      rateLimiter.canProceed('user-1', config)
      
      const result = rateLimiter.canProceed('user-1', config)
      
      // Debe esperar 60 segundos (la ventana completa)
      expect(result.retryAfter).toBe(60)
    })

    it('debe disminuir retryAfter con el tiempo', () => {
      vi.setSystemTime(0)
      const config = { maxRequests: 1, windowMs: 60000 }
      
      rateLimiter.canProceed('user-1', config)
      
      // Inmediatamente después
      let result = rateLimiter.canProceed('user-1', config)
      expect(result.retryAfter).toBe(60)
      
      // 30 segundos después
      vi.setSystemTime(30000)
      result = rateLimiter.canProceed('user-1', config)
      expect(result.retryAfter).toBe(30)
      
      // 50 segundos después
      vi.setSystemTime(50000)
      result = rateLimiter.canProceed('user-1', config)
      expect(result.retryAfter).toBe(10)
    })

    it('debe redondear hacia arriba el retryAfter', () => {
      vi.setSystemTime(0)
      const config = { maxRequests: 1, windowMs: 60000 }
      
      rateLimiter.canProceed('user-1', config)
      
      // 59.5 segundos después (500ms antes de expirar)
      vi.setSystemTime(59500)
      
      const result = rateLimiter.canProceed('user-1', config)
      
      // Debe redondear 0.5 a 1 segundo
      expect(result.retryAfter).toBe(1)
    })
  })

  describe('canProceed - usuarios independientes', () => {
    it('debe manejar múltiples usuarios independientemente', () => {
      const config = { maxRequests: 2, windowMs: 60000 }
      
      // User 1 hace 2 requests
      rateLimiter.canProceed('user-1', config)
      rateLimiter.canProceed('user-1', config)
      
      // User 2 debe poder hacer requests
      const result = rateLimiter.canProceed('user-2', config)
      expect(result.allowed).toBe(true)
    })

    it('debe bloquear usuarios independientemente', () => {
      const config = { maxRequests: 1, windowMs: 60000 }
      
      rateLimiter.canProceed('user-1', config)
      rateLimiter.canProceed('user-2', config)
      
      // Ambos deben estar bloqueados
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(false)
      expect(rateLimiter.canProceed('user-2', config).allowed).toBe(false)
    })
  })

  describe('clear', () => {
    it('debe limpiar el historial de un usuario específico', () => {
      const config = { maxRequests: 1, windowMs: 60000 }
      
      rateLimiter.canProceed('user-1', config)
      
      // Bloqueado
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(false)
      
      // Limpiar
      rateLimiter.clear('user-1')
      
      // Ahora debe permitir
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(true)
    })

    it('no debe afectar a otros usuarios', () => {
      const config = { maxRequests: 1, windowMs: 60000 }
      
      rateLimiter.canProceed('user-1', config)
      rateLimiter.canProceed('user-2', config)
      
      // Limpiar solo user-1
      rateLimiter.clear('user-1')
      
      // User-1 puede hacer requests
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(true)
      
      // User-2 sigue bloqueado
      expect(rateLimiter.canProceed('user-2', config).allowed).toBe(false)
    })
  })

  describe('clearAll', () => {
    it('debe limpiar todos los usuarios', () => {
      const config = { maxRequests: 1, windowMs: 60000 }
      
      rateLimiter.canProceed('user-1', config)
      rateLimiter.canProceed('user-2', config)
      rateLimiter.canProceed('user-3', config)
      
      rateLimiter.clearAll()
      
      // Todos deben poder hacer requests
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(true)
      expect(rateLimiter.canProceed('user-2', config).allowed).toBe(true)
      expect(rateLimiter.canProceed('user-3', config).allowed).toBe(true)
    })
  })

  describe('RATE_LIMITS - configs predefinidos', () => {
    it('FORUM_POST debe permitir 5 posts en 5 minutos', () => {
      for (let i = 0; i < 5; i++) {
        expect(rateLimiter.canProceed('user-1', RATE_LIMITS.FORUM_POST).allowed).toBe(true)
      }
      
      expect(rateLimiter.canProceed('user-1', RATE_LIMITS.FORUM_POST).allowed).toBe(false)
    })

    it('LOGIN_ATTEMPT debe permitir 5 intentos en 15 minutos', () => {
      for (let i = 0; i < 5; i++) {
        expect(rateLimiter.canProceed('user@test.com', RATE_LIMITS.LOGIN_ATTEMPT).allowed).toBe(true)
      }
      
      const result = rateLimiter.canProceed('user@test.com', RATE_LIMITS.LOGIN_ATTEMPT)
      expect(result.allowed).toBe(false)
      expect(result.retryAfter).toBeLessThanOrEqual(900) // 15 min = 900 seg
    })

    it('FILE_UPLOAD debe tener ventana de 1 hora', () => {
      vi.setSystemTime(0)
      
      // Llenar el límite
      for (let i = 0; i < 20; i++) {
        rateLimiter.canProceed('user-1', RATE_LIMITS.FILE_UPLOAD)
      }
      
      // Bloqueado
      expect(rateLimiter.canProceed('user-1', RATE_LIMITS.FILE_UPLOAD).allowed).toBe(false)
      
      // Avanzar 1 hora + 1 segundo
      vi.setSystemTime(60 * 60 * 1000 + 1000)
      
      // Debe permitir de nuevo
      expect(rateLimiter.canProceed('user-1', RATE_LIMITS.FILE_UPLOAD).allowed).toBe(true)
    })
  })

  describe('Edge cases', () => {
    it('debe manejar límite de 1 request', () => {
      const config = { maxRequests: 1, windowMs: 60000 }
      
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(true)
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(false)
    })

    it('debe manejar ventanas muy cortas', () => {
      vi.setSystemTime(0)
      const config = { maxRequests: 2, windowMs: 1000 } // 1 segundo
      
      rateLimiter.canProceed('user-1', config)
      rateLimiter.canProceed('user-1', config)
      
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(false)
      
      vi.setSystemTime(1001)
      
      expect(rateLimiter.canProceed('user-1', config).allowed).toBe(true)
    })

    it('debe manejar ventanas muy largas', () => {
      vi.setSystemTime(0)
      const config = { maxRequests: 1, windowMs: 24 * 60 * 60 * 1000 } // 24 horas
      
      rateLimiter.canProceed('user-1', config)
      
      const result = rateLimiter.canProceed('user-1', config)
      
      expect(result.allowed).toBe(false)
      expect(result.retryAfter).toBe(86400) // 24 horas en segundos
    })

    it('debe manejar keys con caracteres especiales', () => {
      const config = { maxRequests: 1, windowMs: 60000 }
      const key = 'user@test.com:192.168.1.1'
      
      expect(rateLimiter.canProceed(key, config).allowed).toBe(true)
      expect(rateLimiter.canProceed(key, config).allowed).toBe(false)
    })
  })
})