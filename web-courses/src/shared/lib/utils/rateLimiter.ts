// shared/lib/utils/rateLimiter.ts

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map()

  canProceed(key: string, config: RateLimitConfig): { allowed: boolean; retryAfter?: number } {
    const now = Date.now()
    const userRequests = this.requests.get(key) || []

    // Limpiar requests viejos
    const validRequests = userRequests.filter(timestamp => now - timestamp < config.windowMs)

    // Verificar límite
    if (validRequests.length >= config.maxRequests) {
      const oldestRequest = validRequests[0]
      const retryAfter = Math.ceil((oldestRequest + config.windowMs - now) / 1000)
      
      return { allowed: false, retryAfter }
    }

    // Agregar nuevo request
    validRequests.push(now)
    this.requests.set(key, validRequests)

    return { allowed: true }
  }

  clear(key: string) {
    this.requests.delete(key)
  }

  clearAll() {
    this.requests.clear()
  }
}

export const rateLimiter = new RateLimiter()

// ⭐ Configs completos
export const RATE_LIMITS = {
  // === FORO ===
  FORUM_POST: {
    maxRequests: 5,
    windowMs: 5 * 60 * 1000 // 5 minutos
  },
  FORUM_COMMENT: {
    maxRequests: 3,
    windowMs: 1 * 60 * 1000 // 1 minuto
  },
  
  // === AUTENTICACIÓN ===
  LOGIN_ATTEMPT: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000 // 15 minutos
  },
  REGISTER: {
    maxRequests: 3,
    windowMs: 24 * 60 * 60 * 1000 // 24 horas
  },
  PASSWORD_RESET: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000 // 1 hora
  },
  
  // === CURSOS (ADMIN) ===
  COURSE_CREATE: {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000 // 1 hora
  },
  COURSE_UPDATE: {
    maxRequests: 30,
    windowMs: 60 * 60 * 1000 // 1 hora
  },
  LESSON_CREATE: {
    maxRequests: 50,
    windowMs: 60 * 60 * 1000 // 1 hora
  },
  
  // === PERFIL ===
  PROFILE_UPDATE: {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000 // 1 hora
  },
  
  // === OTROS ===
  FILE_UPLOAD: {
    maxRequests: 20,
    windowMs: 60 * 60 * 1000 // 1 hora
  },
}