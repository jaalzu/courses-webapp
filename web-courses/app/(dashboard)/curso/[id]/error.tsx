'use client'

import { useRouter } from 'next/navigation'
import { ErrorBoundaryUI } from '@/shared/lib/utils/ErrorBoundary'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'

export default function CourseDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  const isNotFound = error.message.includes('404') || error.message.includes('not found')
  const isPermission = error.message.includes('permission') || error.message.includes('unauthorized')

  const title = isNotFound 
    ? 'Curso no encontrado' 
    : isPermission
    ? 'Acceso denegado'
    : 'Error al cargar el curso'

  const description = isNotFound 
    ? 'El curso que buscas no existe o fue eliminado.' 
    : isPermission
    ? 'No tienes permisos para acceder a este curso.'
    : 'Ocurrió un error al cargar el contenido del curso.'

  return (
    <ErrorBoundaryUI
      error={error}
      reset={reset}
      title={title}
      description={description}
      icon={
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
      }
      primaryAction={!isNotFound && !isPermission ? {
        label: 'Reintentar',
        onClick: reset
      } : undefined}
      queryKeys={['course', 'progress']}
      secondaryAction={{
        label: 'Ver todos los cursos',
        onClick: () => router.push('/courses')
      }}
    />
  )
}