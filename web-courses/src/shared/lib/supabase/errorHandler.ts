export function getAuthErrorMessage(error: any): string {
  const errorMessage = error?.message?.toLowerCase() || ''

  // Errores de auth
  if (errorMessage.includes('invalid login credentials') || 
      errorMessage.includes('invalid email or password')) {
    return 'Email o contraseña incorrectos'
  }

  if (errorMessage.includes('email not confirmed')) {
    return 'Debes confirmar tu email antes de iniciar sesión'
  }

  if (errorMessage.includes('user already registered') ||
      errorMessage.includes('already registered')) {
    return 'Este email ya está registrado'
  }

  if (errorMessage.includes('password') && errorMessage.includes('at least')) {
    return 'La contraseña debe tener al menos 6 caracteres'
  }

  if (errorMessage.includes('email') && errorMessage.includes('invalid')) {
    return 'Email inválido'
  }

  if (errorMessage.includes('rate limit')) {
    return 'Demasiados intentos. Espera unos minutos'
  }

  // Si no matchea nada, mostrar el error original (para debug)
  return error?.message || 'Ocurrió un error. Intenta nuevamente'
}