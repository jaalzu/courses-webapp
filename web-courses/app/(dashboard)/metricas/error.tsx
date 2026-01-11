'use client'

import { useRouter } from 'next/navigation'
import { ErrorBoundaryUI } from '@/shared/lib/utils/ErrorBoundary'
import { ChartBarIcon } from '@heroicons/react/24/outline'

export default function MetricsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  return (
    <ErrorBoundaryUI
      error={error}
      reset={reset}
      title="Error al cargar las métricas"
      description="No pudimos cargar las estadísticas y métricas. Los datos pueden estar temporalmente no disponibles."
      icon={
        <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
          <ChartBarIcon className="w-16 h-16 text-blue-600 dark:text-blue-500" />
        </div>
      }
      primaryAction={{
        label: 'Recargar métricas',
        onClick: reset
      }}
      queryKeys={['metrics', 'stats', 'analytics']}
      secondaryAction={{
        label: 'Volver al dashboard',
        onClick: () => router.push('/dashboard')
      }}
      suggestions={[
        'Los servicios de analíticas están caídos',
        'Problema de conexión temporal',
        'Datos aún no disponibles'
      ]}
    />
  )
}