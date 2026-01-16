'use client'

import { useMemo } from 'react'

// Entidades
import { useUsers } from '@/entities/user/model/useUsers'
import { useCourses } from '@/entities/course/model/useCourses'
import { useAllProgress } from '@/entities/progress/model/useProgressQueries'

// Features - Componentes de UI
import { MetricsSkeleton } from '@/features/metrics/ui/MetricsSkeleton'
import { StatsCard } from '@/features/metrics/ui/StatsCard'
import { UserProgressTable } from '@/features/metrics/ui/UserProgressTable'
import { PopularCourses } from '@/features/metrics/ui/PopularCourses'

// Helpers
import { deriveMetrics } from '@/features/metrics/lib/deriveMetrics'

export function Metrics() {
  
  const { users, fetchUsers, isLoading: usersLoading } = useUsers(true)
  
  const { 
    data: progress = [], 
    isLoading: progressLoading, 
    refetch: refetchProgress 
  } = useAllProgress()
  
  const { 
    allCourses, 
    refetchCourses, 
    isLoading: coursesLoading 
  } = useCourses()

  const metrics = useMemo(() => {
    if (!users || !allCourses || !progress) {
      return { 
        totalUsers: 0, admins: 0, students: 0, 
        popularCourses: [], usersWithProgress: [] 
      }
    }

    return deriveMetrics({
      users,
      courses: allCourses,
      progress,
    })
  }, [users, allCourses, progress])

  const isLoading = usersLoading || progressLoading || coursesLoading

 

  if (isLoading) return <MetricsSkeleton />

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-6 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Métricas del Sistema
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Panel de administración y estadísticas en tiempo real
            </p>
          </div>
          
        </div>

        {/* STATS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Usuarios" value={metrics.totalUsers} />
          <StatsCard title="Administradores" value={metrics.admins} />
          <StatsCard title="Estudiantes" value={metrics.students} />
        </div>

        {/* TABLES & LISTS */}
       <div className="space-y-8">
  <PopularCourses courses={metrics.popularCourses} />

  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
    <div className="p-6 border-b border-gray-100 dark:border-gray-800">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
        Gestión de Usuarios
      </h2>
    </div>
    <UserProgressTable users={metrics.usersWithProgress} />
  </div>
</div>

      </div>
    </div>
  )
}