export function getAuthErrorMessage(error: unknown): string {
  const err = error as { message?: string; code?: string }
  const errorMessage = err?.message?.toLowerCase() || ''
  const errorCode = err?.code || ''

  if (errorCode === '23503' || errorMessage.includes('foreign key') || errorMessage.includes('violates')) {
    return 'No se puede eliminar: este elemento tiene otros datos vinculados (alumnos, posteos, etc.)'
  }

  if (errorMessage.includes('invalid login credentials') ||
      errorMessage.includes('invalid email or password') ||
      errorMessage.includes('credenciales')) {
    return 'Email o contraseña incorrectos'
  }

  if (errorMessage.includes('email not confirmed')) {
    return 'Debes confirmar tu email antes de iniciar sesión'
  }

  if (errorMessage.includes('user already registered') ||
      errorMessage.includes('already registered') ||
      errorMessage.includes('ya está registrado')) {
    return 'Este email ya está registrado. Intentá iniciar sesión'
  }

  if (errorMessage.includes('password') && errorMessage.includes('at least')) {
    return 'La contraseña debe tener al menos 6 caracteres'
  }

  if (errorMessage.includes('email') && errorMessage.includes('invalid')) {
    return 'El formato del email no es válido'
  }

  if (errorMessage.includes('rate limit') || errorMessage.includes('too many requests')) {
    return 'Demasiados intentos. Esperá unos minutos e intentá de nuevo'
  }

  if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
    return 'Problema de conexión. Revisá tu internet'
  }

  return err?.message || 'Ocurrió un error inesperado. Intenta nuevamente'
}
