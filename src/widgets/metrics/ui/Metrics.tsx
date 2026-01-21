'use client'

import { useMemo } from 'react'
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'

// Entidades
import { useUsers } from '@/entities/user/model/useUsers'
import { useCourses } from '@/entities/course/model/useCourses'
import { useAllProgress } from '@/entities/progress/model/useProgressQueries'

// UI
import { MetricsSkeleton } from '@/features/metrics/ui/MetricsSkeleton'
import { StatsCard } from '@/features/metrics/ui/StatsCard'
import { UserProgressTable } from '@/features/metrics/ui/UserProgressTable'
import { PopularCourses } from '@/features/metrics/ui/PopularCourses'

// Helpers
import { deriveMetrics } from '@/features/metrics/lib/deriveMetrics'

export function Metrics() {
  const { users, isLoading: usersLoading } = useUsers(true)
  const { data: progress = [], isLoading: progressLoading } = useAllProgress()
  const { allCourses, isLoading: coursesLoading } = useCourses()

  const metrics = useMemo(() => {
    if (!users || !allCourses || !progress) {
      return {
        totalUsers: 0,
        admins: 0,
        students: 0,
        popularCourses: [],
        usersWithProgress: [],
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
    <DashboardLayout
      title="Métricas del Sistema"
      action={null}
    >
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard title="Total Usuarios" value={metrics.totalUsers} />
        <StatsCard title="Administradores" value={metrics.admins} />
        <StatsCard title="Estudiantes" value={metrics.students} />
      </div>

      {/* LISTAS */}
      <div className="space-y-8">
        <PopularCourses courses={metrics.popularCourses} />

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Usuarios y Roles
            </h2>
          </div>

          <UserProgressTable users={metrics.usersWithProgress} />
        </div>
      </div>
    </DashboardLayout>
  )
}
