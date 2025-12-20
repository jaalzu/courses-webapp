'use client'

import { useCurrentUser } from "@/shared/mocks/useCurrentUser"
import { useCourses } from "@/entities/course/api/useCourses"
import { useProgressStore, getUserProgress } from "@/entities/progress/model"
import { getUserProfileStats } from "@/features/profile/lib/getUserProfileStats"

import AvatarUser from "./AvatarUser"
import UserStats from "./UserStats"

export function PerfilPageWrapper() {
  const user = useCurrentUser()
  const courses = useCourses()
  
  // ✅ Leer estado del store
  const progress = useProgressStore(state => state.progress)
  
  // ✅ Filtrar solo progreso del usuario actual
  const userProgress = getUserProgress(progress, user.id)

  // ✅ Calcular estadísticas
  const stats = getUserProfileStats({
    user,
    courses,
    progress: userProgress,
  })

  return (
    <>
      <AvatarUser name={stats.userName} email={stats.email} />
      <UserStats {...stats} />
    </>
  )
}