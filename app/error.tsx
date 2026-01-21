'use client'

import { ErrorBoundaryUI } from '../src/shared/lib/utils/ErrorBoundary'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Error({
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
      title="¡Oops! Algo salió mal"
      description="Ocurrió un error inesperado. Puedes intentar recargar esta sección o volver al inicio."
      icon={
        <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
          <ExclamationTriangleIcon className="w-12 h-12 text-red-600 dark:text-red-500" />
        </div>
      }
      secondaryAction={{
        label: 'Volver al inicio',
        onClick: () => window.location.href = '/'
      }}
    />
  )
}