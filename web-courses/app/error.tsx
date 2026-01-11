'use client'

import { useEffect } from 'react'
import { Button } from '@/shared/ui/button'
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log del error a un servicio de monitoreo (Sentry, LogRocket, etc)
    console.error('Error global capturado:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center space-y-6">
        
        {/* Icono de error */}
        <div className="flex justify-center">
          <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-600 dark:text-red-500" />
          </div>
        </div>

        {/* Mensaje */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Oops! Algo salió mal
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Ocurrió un error inesperado. Puedes intentar recargar esta sección o volver al inicio.
          </p>
        </div>

        {/* Detalles del error (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Detalles técnicos
            </summary>
            <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">Error ID: {error.digest}</p>
            )}
          </details>
        )}

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={reset}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Reintentar
          </Button>
          
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="flex-1"
          >
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  )
}