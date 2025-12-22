'use client'

import { useUserList } from '@/entities/user/hooks/useUserList'
import { useCourseStore } from '@/entities/course/model/useCourseStore'
import { useProgressStore } from '@/entities/progress/model/useProgressStore'

import { deriveMetrics } from '../lib/deriveMetrics'
import { StatsCard } from './StatsCard'
import { UserProgressTable } from './UserProgressTable'
import { PopularCourses } from './PopularCourses'

export function Metrics() {
  // 1. Obtener datos base
  const { users, refetch } = useUserList()
  const { courses } = useCourseStore()
  const { progress } = useProgressStore()

  // 2. Derivar métricas (lógica pura)
  const metrics = deriveMetrics({
    users,
    courses,
    progress,
  })

  // 3. Callback que se pasa a la tabla
  const handleRoleUpdate = () => {
    refetch()
  }

  // 4. UI
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-6 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Métricas del Sistema
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Panel de administración y estadísticas
          </p>
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

        {/* Users Table */}
        <UserProgressTable
          users={metrics.usersWithProgress}
          onRoleUpdate={handleRoleUpdate}
        />
      </div>
    </div>
  )
}
