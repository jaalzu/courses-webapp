'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'

interface ErrorBoundaryUIProps {
  error: Error & { digest?: string }
  reset: () => void
  title: string
  description: string
  icon: React.ReactNode
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  queryKeys?: string[]
  suggestions?: string[]
}

export function ErrorBoundaryUI({
  error,
  reset,
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  queryKeys = [],
  suggestions,
}: ErrorBoundaryUIProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  useEffect(() => {
    console.error(`Error capturado: ${title}`, error)
  }, [error, title])

  const handleReset = () => {
    // Invalidar queries específicas
    queryKeys.forEach(key => {
      queryClient.invalidateQueries({ queryKey: [key] })
    })
    reset()
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Icono */}
        <div className="flex justify-center">
          {icon}
        </div>

        {/* Mensaje */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Detalles en desarrollo */}
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 text-left">
            <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
              Error de desarrollo:
            </p>
            <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto max-h-40">
              {error.message}
            </pre>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-xs text-gray-500 cursor-pointer">Stack trace</summary>
                <pre className="text-[10px] text-gray-600 dark:text-gray-400 mt-2 overflow-auto max-h-32">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* Acciones */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={primaryAction?.onClick || handleReset}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            {primaryAction?.label || 'Reintentar'}
          </Button>
          
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>

        {/* Sugerencias opcionales */}
        {suggestions && suggestions.length > 0 && (
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>💡 Posibles soluciones:</p>
            <ul className="list-disc list-inside text-left max-w-sm mx-auto">
              {suggestions.map((suggestion, idx) => (
                <li key={idx}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}