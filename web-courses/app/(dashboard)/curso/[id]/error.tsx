'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button'
import { ExclamationCircleIcon, ArrowPathIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'

export default function CourseDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  const queryClient = useQueryClient()

  useEffect(() => {
    console.error('Error cargando curso:', error)
  }, [error])

  const handleReset = () => {
    // Limpiar cache específico del curso
    queryClient.invalidateQueries({ queryKey: ['course'] })
    queryClient.invalidateQueries({ queryKey: ['progress'] })
    reset()
  }

  // Detectar tipo de error
  const isNotFound = error.message.includes('404') || error.message.includes('not found')
  const isPermission = error.message.includes('permission') || error.message.includes('unauthorized')

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Icono según tipo de error */}
        <div className="flex justify-center">
          <div className={`p-4 rounded-full ${
            isNotFound 
              ? 'bg-yellow-100 dark:bg-yellow-900/20' 
              : 'bg-red-100 dark:bg-red-900/20'
          }`}>
            <ExclamationCircleIcon className={`w-16 h-16 ${
              isNotFound 
                ? 'text-yellow-600 dark:text-yellow-500' 
                : 'text-red-600 dark:text-red-500'
            }`} />
          </div>
        </div>

        {/* Mensaje personalizado */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {isNotFound 
              ? 'Curso no encontrado' 
              : isPermission
              ? 'Acceso denegado'
              : 'Error al cargar el curso'
            }
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isNotFound 
              ? 'El curso que buscas no existe o fue eliminado.' 
              : isPermission
              ? 'No tienes permisos para acceder a este curso.'
              : 'Ocurrió un error al cargar el contenido del curso.'
            }
          </p>
        </div>

        {/* Detalles técnicos en dev */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-left">
            <p className="text-xs font-mono text-gray-700 dark:text-gray-300">
              {error.message}
            </p>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-xs text-gray-500 cursor-pointer">Stack trace</summary>
                <pre className="text-[10px] text-gray-600 dark:text-gray-400 mt-2 overflow-auto max-h-40">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* Acciones según el tipo de error */}
        <div className="flex flex-col gap-3">
          {!isNotFound && !isPermission && (
            <Button
              onClick={handleReset}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              Reintentar
            </Button>
          )}
          
          <Button
            onClick={() => router.push('/courses')}
            variant="outline"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Ver todos los cursos
          </Button>

          <Button
            onClick={() => router.push('/dashboard')}
            variant="ghost"
          >
            Ir al dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}