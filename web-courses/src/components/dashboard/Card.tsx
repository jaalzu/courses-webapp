'use client'

import Link from "next/link"
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { CourseProgress, CourseLevel } from '@/types/course'
import Image from "next/image"
import { useFavorites } from "@/hooks/useFavorites"
import { localStorageFavorites } from "@/lib/favoriteStorage"

interface CardProps {
  image: string
  title: string
  description: string
  completed?: CourseProgress
  href: string
  className?: string
  level?: CourseLevel
  progress?: number
  courseId: number
}

export default function Card({
  image,
  title,
  description,
  completed,
  href,
  className = '',
  level,
  courseId
}: CardProps) {

  const progress = completed ? Math.round((completed.done / completed.total) * 100) : 0

  const levelVariants = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'danger'
  } as const

  const levelLabels = {
    beginner: 'Básico',
    intermediate: 'Intermedio',
    advanced: 'Avanzado'
  }

  // Hook de favoritos
  const { isFavorite, toggleFavorite } = useFavorites(localStorageFavorites)

  // Validar courseId
  if (!courseId || typeof courseId !== 'number') {
    console.error('Card: courseId inválido o undefined', { title, courseId, href })
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!courseId || typeof courseId !== 'number') {
      console.error('No se puede agregar a favoritos: courseId inválido', courseId)
      return
    }
    
    toggleFavorite(courseId)
  }

  return (
   <div className={`relative ${className} flex flex-col h-full`}>
  {/* Botón de favorito */}
  {courseId && (
    <button
      className="absolute top-2 right-2 z-10 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
      onClick={handleToggleFavorite}
      aria-label="Toggle Favorite"
    >
      {isFavorite(courseId) ? <HeartSolid className="w-5 h-5" /> : <HeartOutline className="w-5 h-5" />}
    </button>
  )}

  <Link
    href={href}
    className="bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-md overflow-hidden flex flex-col h-full transition-transform shadow-sm hover:shadow-md duration-300 border border-gray-200 dark:border-gray-600"
  >
    <Image
      src={image.startsWith('/') ? image : `/${image}`}
      alt={title}
      width={400}
      height={200}
      className="w-full h-40 object-cover"
      priority
    />

    <div className="p-4 flex flex-col flex-1 justify-between">
      <div className="flex flex-col flex-1">
        <h3 className="text-lg font-semibold leading-tight mb-2 mt-2">{title}</h3>

        {level && (
          <Badge variant={levelVariants[level]} className="mb-3">
            {levelLabels[level]}
          </Badge>
        )}

        <p className="text-gray-500 dark:text-gray-300 text-sm mb-4 flex-1">{description}</p>
      </div>

      <div>
        <Button className="w-full mb-4 pointer-events-none">Entrar</Button>

        {completed && (
          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-600 dark:text-gray-200 font-medium">
              Lecciones
            </span>

            {completed.done === completed.total ? (
              <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                <CheckCircleIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">¡Completado!</span>
              </div>
            ) : (
              <span className="text-sm text-gray-600 dark:text-gray-200 font-medium">
                {completed.done}/{completed.total}
              </span>
            )}
          </div>
        )}
      </div>
    </div>

    <Progress value={progress} className="h-1.5 w-full" />
  </Link>
</div>

  )
}