'use client'

import { useEffect } from "react"
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { useCourses } from "@/entities/course/model/useCourses"
import { useUserProgress } from "@/entities/progress/model/useProgressQueries"
import { getUserProfileStats } from "@/features/profile/getUserProfileStats"
import { Button } from "@/shared/ui/index"
import { AvatarUser } from "./AvatarUser"
import { UserStats } from "./UserStats"
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'


export function PerfilWrapper() {
  const currentUser = useAuthStore(state => state.currentUser)
  const checkAuth = useAuthStore(state => state.checkAuth)
  const isLoadingAuth = useAuthStore(state => state.isLoading)
  
  const { courses } = useCourses() 
  const { data: progress = [], isLoading: progressLoading } = useUserProgress(currentUser?.id) 

  useEffect(() => {
    if (!currentUser) checkAuth()
  }, [currentUser, checkAuth])

  if (!currentUser && isLoadingAuth) {
    return <div className="p-10 text-center animate-pulse">Verificando sesión...</div>
  }

  if (!currentUser) {
    return (
      <div className="p-10 text-center space-y-4">
        <p>No se encontró una sesión activa.</p>
        <Button onClick={() => window.location.href = '/login'}>Ir al Login</Button>
      </div>
    )
  }

  const stats = getUserProfileStats({
    user: {
      id: currentUser.id,
      name: currentUser.name || currentUser.email?.split('@')[0] || 'Usuario',
      email: currentUser.email || '',
    },
    courses,
    progress: progress,
  })

  return (
    <DashboardLayout
  title="Mi Perfil"
  description="Gestiona tu información y revisa tu progreso"
>
      <AvatarUser 
        key={currentUser.name} 
        name={currentUser.name || 'Usuario'} 
        email={currentUser.email || ''} 
      />
      
      <UserStats 
        completedCourses={stats.completedCourses}
        inProgressCourses={stats.inProgressCourses}
        totalCourses={stats.totalCourses}
        progressPercentage={stats.progressPercentage}
      />
    </DashboardLayout>

  )
}





