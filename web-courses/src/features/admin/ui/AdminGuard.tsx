'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/features/auth/model/useAuthStore'

interface AdminGuardProps {
  children: React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { currentUser, isAuthenticated, isLoading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    // Si ya terminó de cargar y no cumple los requisitos, lo sacamos
    if (!isLoading) {
      if (!isAuthenticated || currentUser?.role !== 'admin') {
        router.replace('/') // Usamos replace para que no pueda volver atrás
      }
    }
  }, [currentUser, isAuthenticated, isLoading, router])

  // Mientras verifica o si no es admin, no mostramos nada (evita el "flicker")
  if (isLoading || !isAuthenticated || currentUser?.role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-pulse text-gray-500 font-medium">
          Verificando permisos de administrador...
        </div>
      </div>
    )
  }

  return <>{children}</>
}