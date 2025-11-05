'use client'

import Link from "next/link"
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { CourseProgress, CourseLevel } from '@/types/course'
import Image from "next/image"

interface CardProps {
  image: string
  title: string
  description: string
  completed?: CourseProgress
  href: string
  className?: string
  level?: CourseLevel
  progress?: number
}

export default function Card({
  image,
  title,
  description,
  completed,
  href,
  className = '',
  level,
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

  return (
    <Link
      href={href}
      className={`
        bg-white dark:bg-gray-900
        text-black dark:text-gray-100
        rounded-md overflow-hidden flex flex-col
        transition-transform shadow-sm hover:shadow-md duration-300
        border border-gray-200 dark:border-gray-600
        ${className}
      `}
    >
      <Image
        src={image.startsWith('/') ? image : `/${image}`}
        alt={title}
        width={400}
        height={200}
        className="w-full h-40 object-cover"
          priority={true} // <- agrega esto si está visible al cargar
      />

      <div className="p-4 flex flex-col flex-1 min-h-[260px] md:min-h-[260px] justify-between">
        <div>
          <h3 className="text-lg font-semibold leading-tight mb-2 mt-2">{title}</h3>

          {level && (
            <Badge variant={levelVariants[level]} className="mb-3">
              {levelLabels[level]}
            </Badge>
          )}

          <p className="text-gray-500 dark:text-gray-300 text-sm mb-9">{description}</p>
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
  )
}
