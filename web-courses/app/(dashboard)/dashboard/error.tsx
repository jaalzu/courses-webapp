'use client'

import { useRouter } from 'next/navigation'
import { ErrorBoundaryUI } from '@/shared/lib/utils/ErrorBoundary'
import { HomeIcon } from '@heroicons/react/24/outline'

export default function DashboardError({
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
      title="Error al cargar el dashboard"
      description="No pudimos cargar tu panel principal. Esto puede ser un problema temporal con tus datos o conexión."
      icon={
        <div className="p-4 bg-indigo-100 dark:bg-indigo-900/20 rounded-full">
          <HomeIcon className="w-16 h-16 text-indigo-600 dark:text-indigo-500" />
        </div>
      }
      queryKeys={['courses', 'progress', 'user']}
      secondaryAction={{
        label: 'Ver todos los cursos',
        onClick: () => router.push('/courses')
      }}
      suggestions={[
        'Verifica tu conexión a internet',
        'Intenta cerrar sesión y volver a ingresar'
      ]}
    />
  )
}