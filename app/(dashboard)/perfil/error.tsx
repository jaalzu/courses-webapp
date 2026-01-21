'use client'

import { useRouter } from 'next/navigation'
import { ErrorBoundaryUI } from '@/shared/lib/utils/ErrorBoundary'
import { UserCircleIcon} from '@heroicons/react/24/outline'

export default function ProfileError({
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
      title="Error al cargar tu perfil"
      description="No pudimos cargar tu información de perfil. Esto puede ser un problema temporal."
      icon={
        <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-full">
          <UserCircleIcon className="w-16 h-16 text-purple-600 dark:text-purple-500" />
        </div>
      }
      queryKeys={['user', 'profile', 'progress']}
      secondaryAction={{
        label: 'Ir al dashboard',
        onClick: () => router.push('/dashboard')
      }}
      suggestions={['Si el problema persiste, intenta cerrar sesión y volver a ingresar']}
    />
  )
}