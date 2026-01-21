'use client'

import { ErrorBoundaryUI } from '@/shared/lib/utils/ErrorBoundary'
import { ShieldExclamationIcon } from '@heroicons/react/24/outline'

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorBoundaryUI
      error={error}
      reset={reset}
      title="Error de autenticación"
      description="Hubo un problema al cargar la página de autenticación. Por favor, intenta recargar."
      icon={
        <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-full">
          <ShieldExclamationIcon className="w-16 h-16 text-yellow-600 dark:text-yellow-500" />
        </div>
      }
      secondaryAction={{
        label: 'Volver al inicio',
        onClick: () => window.location.href = '/'
      }}
    />
  )
}