'use client'

// 1. React & Next
import Image from "next/image"
import Link from "next/link"

// 2. Features (Lógica de negocio e interacción)
import { FavoriteButton } from "@/features/favorites/ui/favoriteButton"
import { useFavoriteIds } from "@/features/favorites/model/hooks/useFavoritesIds"
import { AdminCardActions } from "@/features/admin/ui/AdminCardActions"
import { useAuthStore } from '@/features/auth/model/useAuthStore'

// 3. Entities (Modelos de datos y estado específico)
import { useProgress } from "@/entities/progress/model/useProgress"
import { getCourseStats } from "@/entities/progress"
import { getLevelConfig } from "@/entities/course/model/helpers"
import type { Course } from "@/entities/course/types"

// 4. Shared (UI Components & Libs)
import { Button } from "@/shared/ui/button"
import { Progress, Badge } from "@/shared/ui"
import { CheckCircleIcon } from "@heroicons/react/24/solid"

interface CardProps {
  courseId: string
  href: string
  className?: string
  level: "beginner" | "intermediate" | "advanced"
  courseData: Course
  enableEdit?: boolean
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
  // 1. Auth & Permissions
  const currentUser = useAuthStore(state => state.currentUser)
  const isAdmin = currentUser?.role === 'admin'
  const userId = currentUser?.id || "user-default"

  // 2. Favorites & Progress
  const { isFavorite, toggleFavorite } = useFavoriteIds()
  const { progress } = useProgress() 
  
  const levelConfig = level ? getLevelConfig(level) : null
  const stats = getCourseStats(courseData, progress, userId)

  return (
    <div className={`relative ${className} flex flex-col h-full`}>
      
      {/* --- BOTONES DE ACCIÓN --- */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {enableEdit && isAdmin && (
          <AdminCardActions courseId={courseId} onEdit={onEdit} />
        )}
        
        <FavoriteButton
          isFavorite={isFavorite(courseId)}
          onToggle={() => toggleFavorite(courseId)}
        />
      </div>

      <Link
        href={href}
        className="bg-white dark:bg-gray-900 rounded-md overflow-hidden flex flex-col h-full transition-shadow shadow-sm hover:shadow-md border"
      >
        <Image
          src={courseData.image || "/curso1.webp"}
          alt={courseData.title || "Imagen del curso"}
          width={400}
          height={200}
          className="w-full h-40 object-cover"
          unoptimized 
        />

        <div className="p-4 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">{courseData.title}</h3>

            {levelConfig && (
              <Badge variant={levelConfig.variant}>{levelConfig.label}</Badge>
            )}

            <p className="text-sm text-dark dark:text-gray-300 mt-5 line-clamp-5">
              {courseData.description}
            </p>
          </div>

          <Button className="w-full mt-4">Entrar</Button>

          <div className="flex justify-between items-center mt-6">
            <span className="text-sm font-medium">Lecciones</span>

            {stats.isCompleted ? (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircleIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">¡Completado!</span>
              </div>
            ) : (
              <span className="text-sm font-medium">
                {stats.completedLessons}/{stats.totalLessons}
              </span>
            )}
          </div>
        </div>

        <Progress value={stats.progressPercentage} className="h-1.5 w-full" />
      </Link>
    </div>
  )
}