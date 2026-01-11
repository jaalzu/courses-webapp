'use client'

import { useRouter } from 'next/navigation'
import { ErrorBoundaryUI } from '@/shared/lib/utils/ErrorBoundary'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

export default function FAQsError({
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
      title="Error al cargar las FAQs"
      description="No pudimos cargar las preguntas frecuentes. Mientras tanto, puedes contactarnos directamente o revisar la documentación en el dashboard."
      icon={
        <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
          <QuestionMarkCircleIcon className="w-16 h-16 text-green-600 dark:text-green-500" />
        </div>
      }
      secondaryAction={{
        label: 'Ir al dashboard',
        onClick: () => router.push('/dashboard')
      }}
    />
  )
}