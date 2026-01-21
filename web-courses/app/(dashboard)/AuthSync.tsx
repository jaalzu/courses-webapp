'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { useSearchParams } from 'next/navigation'

export function AuthSync() {
  const { checkAuth } = useAuthStore()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Si viene de Google OAuth, forzar recarga del usuario
    if (searchParams.get('refresh') === 'true') {
      checkAuth()
      // Limpiar el parámetro de la URL
      window.history.replaceState({}, '', '/dashboard')
    }
  }, [searchParams, checkAuth])

  return null
}