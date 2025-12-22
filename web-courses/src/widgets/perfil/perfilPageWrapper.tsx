'use client'

import { useCurrentUser } from "@/shared/mocks/useCurrentUser"
import { useCourses } from "@/entities/course/api/useCourses"
import { useProgressStore, getUserProgress } from "@/entities/progress/model"
import { getUserProfileStats } from "@/features/profile/lib/getUserProfileStats"

import AvatarUser from "./AvatarUser"
import UserStats from "./UserStats"

export default function PerfilPageWrapper() {
  const user = useCurrentUser()
  const courses = useCourses()
  
  const progress = useProgressStore(state => state.progress)
  const userProgress = getUserProgress(progress, user.id)

  const stats = getUserProfileStats({
    user,
    courses,
    progress: userProgress,
  })

  return (
    <main className="w-full p-6 lg:p-10 space-y-6">
      {/* Título de la página */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Mi Perfil
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Gestiona tu información y revisa tu progreso
        </p>
      </div>

      {/* Avatar y datos del usuario */}
      <AvatarUser name={stats.userName} email={stats.email} />

      {/* Estadísticas */}
      <UserStats {...stats} />
    </main>
  )
}