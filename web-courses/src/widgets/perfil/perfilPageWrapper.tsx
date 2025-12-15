'use client'
import { lazy, Suspense } from 'react'

const AvatarUser = lazy(() => import('@/widgets/perfil/avatarUser'))
const UserStats = lazy(() => import('@/widgets/perfil/userStats'))
const RecentActivity = lazy(() => import('@/widgets/perfil/recentActivity'))

interface PerfilWrapperProps {
  userName: string
  email: string
  completedCourses: number
  inProgressCourses: number
  totalCourses: number
  progressPercentage: number
  completedLessons: number
  totalLessons: number
}

export function PerfilPageWrapper({
  userName,
  email,
  completedCourses,
  inProgressCourses,
  totalCourses,
  progressPercentage,
  completedLessons,
  totalLessons
}: PerfilWrapperProps) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <div className="w-full min-h-screen bg-gray-50 dark:bg-neutral-900 p-6 md:p-10 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Avatar User */}
          <Suspense fallback={<div>Cargando avatar...</div>}>
            <AvatarUser name={userName} email={email} />
          </Suspense>

          {/* User Stats */}
          <Suspense fallback={<div>Cargando estadísticas...</div>}>
            <UserStats
              completedCourses={completedCourses}
              inProgressCourses={inProgressCourses}
              totalCourses={totalCourses}
              progressPercentage={progressPercentage}
              completedLessons={completedLessons}
              totalLessons={totalLessons}
            />
          </Suspense>

          {/* Recent Activity */}
          <Suspense fallback={<div>Cargando actividad reciente...</div>}>
            <RecentActivity />
          </Suspense>
        </div>
      </div>
    </Suspense>
  )
}
