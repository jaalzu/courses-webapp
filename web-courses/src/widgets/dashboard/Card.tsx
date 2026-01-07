'use client'

import { useEffect } from "react" 
import { DeleteButton } from "@/features/admin/ui/shared/DeleteButton"
import { EditButton } from "@/features/admin/ui/shared/EditButton"
import { FavoriteButton } from "@/features/favorites/ui/favoriteButton"
import { useFavoriteIds } from "@/features/favorites/model/hooks/useFavoritesIds"
import { useCourses } from "@/entities/course/useCourses" // ← FIX: añade /model

import { Button } from "@/shared/ui/button"
import { Progress } from "@/shared/ui"
import { Badge } from "@/shared/ui"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { CheckCircleIcon } from "@heroicons/react/24/solid"

import { getLevelConfig } from "@/entities/course/model/helpers"
import type { Course } from "@/entities/course/types"
import { useProgressStore, getCourseStats } from "@/entities/progress"
import { useAuthStore } from '@/features/auth/model/useAuthStore'

interface CardProps {
  userId?: string 
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
  const router = useRouter()

  const currentUser = useAuthStore(state => state.currentUser)
  const actualUserId = currentUser?.id || "user-default"
  const isAdmin = currentUser?.role === 'admin'

  const { isFavorite, toggleFavorite } = useFavoriteIds()
  const levelConfig = level ? getLevelConfig(level) : null

  const { deleteCourse } = useCourses() // ← CAMBIA ESTO
  const progress = useProgressStore(state => state.progress)
  const fetchUserProgress = useProgressStore(state => state.fetchUserProgress)
  
  // 5. Calcular stats
  const stats = getCourseStats(courseData, progress, actualUserId)

  useEffect(() => {
    if (actualUserId && actualUserId !== "user-default") {
      fetchUserProgress(actualUserId)
    }
  }, [actualUserId, fetchUserProgress])
  
  // Handlers
  const handleEditClick = () => onEdit?.()

  const handleDeleteClick = () => {
    if (!confirm("¿Seguro que querés eliminar este curso? Esta acción no se puede deshacer.")) {
      return
    }
    deleteCourse(courseId)
  }

  const handleEnterCourse = async (e: React.MouseEvent) => {
    e.preventDefault()
    await router.prefetch(href)
    router.push(href)
  }

  return (
    <div className={`relative ${className} flex flex-col h-full`}>
      
      {/* --- BOTONES DE ACCIÓN (Admin & User) --- */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {/* Solo si la prop lo permite Y el usuario logueado es admin */}
        {enableEdit && isAdmin && (
          <>
            {onEdit && <EditButton onEdit={handleEditClick} />}
            <DeleteButton onDelete={handleDeleteClick} />
          </>
        )}
        
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
          src={courseData.image || "/curso1.webp"}
        alt={courseData.title || "Imagen del curso"}
            width={400}
          height={200}
          className="w-full h-40 object-cover"
          unoptimized 
        />

        <div className="p-4 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {courseData.title}
            </h3>

            {levelConfig && (
              <Badge variant={levelConfig.variant}>
                {levelConfig.label}
              </Badge>
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
                <span className="text-sm font-semibold">
                  ¡Completado!
                </span>
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