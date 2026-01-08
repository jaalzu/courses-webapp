'use client'

import { useEffect } from 'react'
import { useUserList } from '@/features/admin/model/useUserList'
import { useCourses } from '@/entities/course/useCourses'
import { useProgress } from '@/entities/progress/model/useProgress'

import { MetricsSkeleton } from './MetricsSkeleton'
import { deriveMetrics } from '../lib/deriveMetrics'
import { StatsCard } from './StatsCard'
import { UserProgressTable } from './UserProgressTable'
import { PopularCourses } from './PopularCourses'

export function Metrics() {
  const { users, isLoading: usersLoading, refetch } = useUserList()
  const { courses, isLoading: coursesLoading, fetchCourses } = useCourses()
  const { progress, isLoading: progressLoading, fetchAllProgress } = useProgress()

  useEffect(() => {
    if (courses.length === 0) fetchCourses()
    if (progress.length === 0 && fetchAllProgress) fetchAllProgress()
  }, [courses.length, progress.length, fetchCourses, fetchAllProgress])

  const isLoading = usersLoading || coursesLoading || progressLoading

  if (isLoading) {
    return <MetricsSkeleton />
  }

  // 4. Derivar métricas (solo cuando ya no hay carga)
  const metrics = deriveMetrics({
    users,
    courses,
    progress,
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-6 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Métricas del Sistema
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Panel de administración y estadísticas en tiempo real
            </p>
          </div>
          <button 
            onClick={() => refetch()}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Actualizar datos
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Usuarios"
            value={metrics.totalUsers}
          />
          <StatsCard
            title="Administradores"
            value={metrics.admins}
          />
          <StatsCard
            title="Estudiantes"
            value={metrics.students}
          />
        </div>

        {/* Popular Courses */}
        <div className="mb-8">
          <PopularCourses courses={metrics.popularCourses} />
        </div>

        {/* Users Table - Ahora de solo lectura según lo pedido */}
        <div className="mb-8">
          <UserProgressTable
            users={metrics.usersWithProgress}
          />
        </div>

      </div>
    </div>
  )
}