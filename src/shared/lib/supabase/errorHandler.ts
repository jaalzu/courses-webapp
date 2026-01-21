export function getAuthErrorMessage(error: any): string {
  const errorMessage = error?.message?.toLowerCase() || ''
  const errorCode = error?.code || '' 

  if (errorCode === '23503' || errorMessage.includes('foreign key') || errorMessage.includes('violates')) {
    return 'No se puede eliminar: este elemento tiene otros datos vinculados (alumnos, posteos, etc.)'
  }

  if (errorMessage.includes('invalid login credentials') || 
      errorMessage.includes('invalid email or password')) {
    return 'Email o contraseña incorrectos'
  }

  if (errorMessage.includes('email not confirmed')) {
    return 'Debes confirmar tu email antes de iniciar sesión'
  }

  if (errorMessage.includes('user already registered') ||
      errorMessage.includes('already registered')) {
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

  return error?.message || 'Ocurrió un error inesperado. Intenta nuevamente'
}