// @/shared/lib/rateLimiter.ts

export const RATE_LIMITS = {
  FILE_UPLOAD: { maxRequests: 20, windowMs: 60 * 60 * 1000 }, // 20 fotos por hora
  COURSE_UPDATE: { maxRequests: 10, windowMs: 5 * 60 * 1000 },  // 10 edits cada 5 min
  FORUM_POST: { 
    maxRequests: 5, 
    windowMs: 5 * 60 * 1000 // 5 minutos
  },
  FORUM_COMMENT: { 
    maxRequests: 3, 
    windowMs: 1 * 60 * 1000 // 1 minuto
  },
  LOGIN_ATTEMPT: { maxRequests: 5, windowMs: 900000 },
}



class RateLimiter {
  private getHistory(key: string): number[] {
    const data = localStorage.getItem(`rl_${key}`)
    return data ? JSON.parse(data) : []
  }

  private saveHistory(key: string, history: number[]) {
    localStorage.setItem(`rl_${key}`, JSON.stringify(history))
  }

  clear(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`rl_${key}`);
    }
  }

  clearAll() {
    if (typeof window !== 'undefined') {
      // Buscamos todas las keys que empiecen con 'rl_' para no borrar 
      // cosas de la sesión del usuario o tokens de auth
      Object.keys(localStorage)
        .filter(k => k.startsWith('rl_'))
        .forEach(k => localStorage.removeItem(k));
    }
  }

 // @/shared/lib/utils/rateLimiter.ts

canProceed(key: string, config: { maxRequests: number; windowMs: number }) {
  const now = Date.now();
  let history = this.getHistory(key);

  history = history.filter(time => now - time < config.windowMs);

  if (history.length >= config.maxRequests) {
    const oldest = history[0];
    const diffMs = (oldest + config.windowMs) - now;
    const retryAfter = Math.ceil(diffMs / 1000); // <--- El número que extrañabas
    
    return { 
      allowed: false, 
      retryAfter, // Lo devolvemos acá para los tests y lógica custom
      message: `Espera ${retryAfter} segundos antes de publicar de nuevo.` // Mensaje dinámico
    };
  }

  history.push(now);
  this.saveHistory(key, history);
  return { allowed: true };
}

}

export const rateLimiter = new RateLimiter()