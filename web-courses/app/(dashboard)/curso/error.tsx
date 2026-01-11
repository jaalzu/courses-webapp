'use client'

import { useEffect } from 'react'
import { Button } from '@/shared/ui/button'
import { AcademicCapIcon, ArrowPathIcon, HomeIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'

export default function CoursesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const queryClient = useQueryClient()

  useEffect(() => {
    console.error('Error en página de cursos:', error)
  }, [error])

  const handleReset = () => {
    // Limpiar cache de React Query antes de reintentar
    queryClient.invalidateQueries({ queryKey: ['courses'] })
    reset()
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        
        {/* Icono contextual */}
        <div className="flex justify-center">
          <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-full">
            <AcademicCapIcon className="w-16 h-16 text-orange-600 dark:text-orange-500" />
          </div>
        </div>

        {/* Mensaje específico */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            No pudimos cargar los cursos
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Hubo un problema al cargar la lista de cursos. Esto puede deberse a un problema de conexión o un error temporal.
          </p>
        </div>

        {/* Detalles en desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 text-left">
            <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
              Error de desarrollo:
            </p>
            <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto">
              {error.message}
            </pre>
          </div>
        )}

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleReset}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Reintentar carga
          </Button>
          
          <Button
            onClick={() => window.location.href = '/dashboard'}
            variant="outline"
          >
            <HomeIcon className="w-4 h-4 mr-2" />
            Ir al dashboard
          </Button>
        </div>

        {/* Sugerencias */}
        <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p>💡 Posibles soluciones:</p>
          <ul className="list-disc list-inside text-left max-w-sm mx-auto">
            <li>Verifica tu conexión a internet</li>
            <li>Recarga la página completa (F5)</li>
            <li>Si el problema persiste, contacta soporte</li>
          </ul>
        </div>
      </div>
    </div>
  )
}