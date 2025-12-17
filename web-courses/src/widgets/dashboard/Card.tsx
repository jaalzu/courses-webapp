'use client'

// features
import { DeleteButton } from "@/features/admin/ui/shared/DeleteButton"
import { EditButton } from "@/features/admin/ui/shared/EditButton"
import { FavoriteButton } from "@/features/favorites/ui/favoriteButton"
import { useFavoriteIds } from "@/features/favorites/model/hooks/useFavoritesIds"
import { localStorageFavorites } from "@/features/favorites/lib/favoriteStorage"

// ui
import { Button } from "@/shared/ui/button"
import { Progress } from "@/shared/ui"
import { Badge } from "@/shared/ui"

// next
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

// icons
import { CheckCircleIcon } from "@heroicons/react/24/solid"

// entities
import { getLevelConfig } from "@/entities/course/lib/helpers"
import type { Course } from "@/entities/course/model/types"
import { useCourseStore } from "@/entities/course/model/useCourseStore"
import { useProgressStore } from "@/entities/progress/model"
import { isLessonCompleted } from "@/entities/progress/model"

interface CardProps {
  userId: string
  courseId: number
  href: string
  className?: string
  level: "beginner" | "intermediate" | "advanced"
  courseData: Course
  enableEdit?: boolean
  onEdit?: () => void
}

export default function Card({
  userId,
  courseData,
  enableEdit = false,
  courseId,
  href,
  className = "",
  level,
  onEdit,
}: CardProps) {
  const router = useRouter()

  // Favoritos
  const { isFavorite, toggleFavorite } = useFavoriteIds(localStorageFavorites)

  // Nivel
  const levelConfig = level ? getLevelConfig(level) : null

  // Cursos
  const deleteCourse = useCourseStore(state => state.deleteCourse)

  // Progreso (estado global)
  const progress = useProgressStore(state => state.progress)

  // 🔢 Lecciones completadas (CORREGIDO)
  const completedCount = courseData.lessons.filter(lesson =>
    isLessonCompleted(
      progress,
      userId,
      courseId,
      lesson.id
    )
  ).length

  const totalLessons = courseData.lessons.length

  const progressPercentage =
    totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0

  // Handlers
  const handleEditClick = () => onEdit?.()

  const handleDeleteClick = () => {
    if (!confirm("¿Seguro que querés eliminar este curso? Esta acción no se puede deshacer.")) return
    deleteCourse(courseId)
  }

  const handleEnterCourse = async (e: React.MouseEvent) => {
    e.preventDefault()
    await router.prefetch(href)
    router.push(href)
  }

  return (
    <div className={`relative ${className} flex flex-col h-full`}>
      {/* Botones */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {enableEdit && onEdit && <EditButton onEdit={handleEditClick} />}
        {enableEdit && <DeleteButton onDelete={handleDeleteClick} />}
        <FavoriteButton
          isFavorite={isFavorite(courseId)}
          onToggle={() => toggleFavorite(courseId)}
        />
      </div>

      <Link
        href={href}
        onClick={handleEnterCourse}
        className="bg-white dark:bg-gray-900 rounded-md overflow-hidden flex flex-col h-full transition-shadow shadow-sm hover:shadow-md border"
      >
        <Image
          src={
            courseData.image
              ? courseData.image.startsWith("/")
                ? courseData.image
                : `/${courseData.image}`
              : "/curso1.jpg"
          }
          alt={courseData.title}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
        />

        <div className="p-4 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">{courseData.title}</h3>
            {levelConfig && (
              <Badge variant={levelConfig.variant}>
                {levelConfig.label}
              </Badge>
            )}
            <p className="text-sm text-gray-500 mt-3">
              {courseData.description}
            </p>
          </div>

          <Button className="w-full mt-4">Entrar</Button>

          <div className="flex justify-between items-center mt-6">
            <span className="text-sm font-medium">Lecciones</span>

            {completedCount === totalLessons && totalLessons > 0 ? (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircleIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">¡Completado!</span>
              </div>
            ) : (
              <span className="text-sm font-medium">
                {completedCount}/{totalLessons}
              </span>
            )}
          </div>
        </div>

        <Progress value={progressPercentage} className="h-1.5 w-full" />
      </Link>
    </div>
  )
}
