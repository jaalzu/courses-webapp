'use client'

import { DeleteButton } from "@/features/admin/components/DeleteButton"
import { EditButton } from "@/features/admin/components/EditButton"
import { FavoriteButton } from "@/features/favorites/ui/favoriteButton"
import { useFavorites } from "@/features/favorites/model/hooks/useFavorites"
import { localStorageFavorites } from "@/features/favorites/lib/favoriteStorage"
import { getLevelConfig } from "@/entities/course/lib/helpers"
import { Button } from "@/shared/ui/button"
import { Progress } from "@/shared/ui/index"
import { Badge } from "@/shared/ui/index"
import Image from "next/image"
import Link from "next/link"
import type { Course } from "@/entities/course/model/types"
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useCourseStore } from "@/entities/course/model/useCourseStore"
import { useCourseProgress } from "@/features/course-progress/model/useCourseProgress" // ← AGREGAR

interface CardProps {
  courseId: number
  title: string
  description: string
  image?: string
  href: string
  className?: string
  level: "beginner" | "intermediate" | "advanced"
  enableEdit?: boolean
  courseData: Course
  onEdit?: () => void
}

export default function Card({
  courseData,
  enableEdit = false,
  courseId,
  href,
  className = "",
  level,
  onEdit,  
}: CardProps) {
  const { isFavorite, toggleFavorite } = useFavorites(localStorageFavorites)
  const levelConfig = level ? getLevelConfig(level) : null
  const deleteCourse = useCourseStore(state => state.deleteCourse)
  
  // ✅ OBTENER PROGRESO DEL STORE EN TIEMPO REAL
  const isLessonCompleted = useCourseProgress(state => state.isLessonCompleted)
  
  // ✅ CALCULAR PROGRESO DINÁMICAMENTE
  const completedCount = courseData.lessons.filter(
    lesson => isLessonCompleted(courseId, lesson.id)
  ).length
  const totalLessons = courseData.lessons.length
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0
  const completed = { done: completedCount, total: totalLessons }

  const handleEditClick = () => {
    if (onEdit) {
      onEdit()  
    }
  }

  const handleDeleteClick = () => {
    if (!confirm("¿Seguro que querés eliminar este curso? Esta acción no se puede deshacer.")) return
    deleteCourse(courseId)
  }

  return (
    <div className={`relative ${className} flex flex-col h-full`}>
      {/* Botones superiores */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {enableEdit && courseData && onEdit && <EditButton onEdit={handleEditClick} />}
        {enableEdit && courseData && <DeleteButton onDelete={handleDeleteClick} />}
        <FavoriteButton
          isFavorite={isFavorite(courseId)}
          onToggle={() => toggleFavorite(courseId)}
        />
      </div>

      <Link
        href={href}
        className="bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-md overflow-hidden flex flex-col h-full transition-shadow shadow-sm hover:shadow-md duration-300 border border-gray-200 dark:border-gray-600"
      >
        <Image
          src={courseData.image.startsWith("/") ? courseData.image : `/${courseData.image}`}
          alt={courseData.title}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />

        <div className="p-4 flex flex-col flex-1 justify-between">
          <div className="flex flex-col flex-1">
            <h3 className="text-lg font-semibold mb-2 mt-2">{courseData.title}</h3>
            {levelConfig && <Badge variant={levelConfig.variant}>{levelConfig.label}</Badge>}
            <p className="text-gray-500 dark:text-gray-300 text-sm mt-3 mb-4 flex-1">{courseData.description}</p>
          </div>

          <Button className="w-full mb-4">Entrar</Button>

          <div className="flex justify-between items-center mt-6">
            <span className="text-sm text-gray-600 dark:text-gray-200 font-medium">Lecciones</span>
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
        </div>

        <Progress value={progress} className="h-1.5 w-full" />
      </Link>
    </div>
  )
}