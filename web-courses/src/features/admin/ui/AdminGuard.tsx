'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/features/auth/model/useAuthStore'

interface AdminGuardProps {
  children: React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const { currentUser, isAuthenticated, isLoading } = useAuthStore()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Timeout de seguridad: si pasa 5  segundos cargando, redirigir
    const timeout = setTimeout(() => {
      if (!isAuthenticated || currentUser?.role !== 'admin') {
        router.replace('/')
      }
      setIsChecking(false)
    }, 5000)

    // Si ya terminó de cargar antes del timeout
    if (!isLoading) {
      clearTimeout(timeout)
      
      if (!isAuthenticated || currentUser?.role !== 'admin') {
        router.replace('/')
      } else {
        setIsChecking(false)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentUser, isAuthenticated, isLoading, router])

  // Mientras verifica
  if (isLoading || isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-pulse text-gray-500 font-medium">
          Verificando permisos de administrador...
        </div>
      </div>
    )
  }

  // Si no es admin, no mostrar nada 
  if (!isAuthenticated || currentUser?.role !== 'admin') {
    return null
  }

  return <>{children}</>
}