'use client'

import { ErrorBoundaryUI } from '@/shared/lib/utils/ErrorBoundary'
import { useRouter } from 'next/navigation'
import { AcademicCapIcon } from '@heroicons/react/24/outline'

export default function CoursesError({
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
      title="No pudimos cargar los cursos"
      description="Hubo un problema al cargar la lista de cursos. Esto puede deberse a un problema de conexión o un error temporal."
      icon={
        <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-full">
          <AcademicCapIcon className="w-16 h-16 text-orange-600 dark:text-orange-500" />
        </div>
      }
      primaryAction={{
        label: 'Reintentar carga',
        onClick: reset
      }}
      queryKeys={['courses']}
      secondaryAction={{
        label: 'Ir al dashboard',
        onClick: () => router.push('/dashboard')
      }}
      suggestions={[
        'Verifica tu conexión a internet',
        'Recarga la página completa (F5)',
        'Si el problema persiste, contacta soporte'
      ]}
    />
  )
}