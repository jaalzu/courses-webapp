'use client'

import { useRouter } from 'next/navigation'
import { ErrorBoundaryUI } from '@/shared/lib/utils/ErrorBoundary'
import { HeartIcon } from '@heroicons/react/24/outline'

export default function FavoritosError({
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
      title="Error al cargar tus favoritos"
      description="No pudimos cargar tu lista de cursos favoritos. Esto puede ser un problema temporal."
      icon={
        <div className="p-4 bg-pink-100 dark:bg-pink-900/20 rounded-full">
          <HeartIcon className="w-16 h-16 text-pink-600 dark:text-pink-500" />
        </div>
      }
      queryKeys={['favorites']}
      secondaryAction={{
        label: 'Ver todos los cursos',
        onClick: () => router.push('/courses')
      }}
    />
  )
}