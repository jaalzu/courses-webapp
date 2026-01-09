'use client'

// 1. React & Next.js
import { useMemo } from 'react'

// 2. Features / Entities
import { useUsers } from '@/entities/user/model/useUsers'
import { useCourses } from '@/entities/course/model/useCourses'
import { useProgress } from '@/entities/progress/model/useProgress'

// 3. Components
import { MetricsSkeleton } from './MetricsSkeleton'
import { StatsCard } from './StatsCard'
import { UserProgressTable } from './UserProgressTable'
import { PopularCourses } from './PopularCourses'

// 4. Lib / Helpers
import { deriveMetrics } from '../lib/deriveMetrics'

export function Metrics() {
  // --- DATA FETCHING ---
  // Pasamos 'true' para que los useEffect que agregamos disparen la carga al montar
  const { users, fetchUsers, isLoading: usersLoading } = useUsers(true)
  const { progress, fetchAllProgress, isLoading: progressLoading } = useProgress(true)
  const { allCourses, refetchCourses, isLoading: coursesLoading } = useCourses()

  // --- LÓGICA DE DERIVACIÓN ---
  const metrics = useMemo(() => {
    // Protección: si no hay data aún, devolvemos valores por defecto para evitar errores
    if (!users || !allCourses || !progress) {
      return { 
        totalUsers: 0, 
        admins: 0, 
        students: 0, 
        popularCourses: [], 
        usersWithProgress: [] 
      }
    }

    return deriveMetrics({
      users: users,
      courses: allCourses,
      progress: progress,
    })
  }, [users, allCourses, progress])

  // Estado de carga unificado
  const isLoading = usersLoading || coursesLoading || progressLoading

  // Función de actualización manual
  const handleRefresh = async () => {
    await Promise.all([
      fetchUsers(),
      fetchAllProgress(),
      refetchCourses()
    ])
  }

  // --- RENDERING ---
  // Si está cargando o no tenemos métricas calculadas aún
  if (isLoading || !metrics) return <MetricsSkeleton />

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
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm active:scale-95"
          >
            Actualizar datos
          </button>
        </div>

        {/* STATS CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Usuarios" value={metrics.totalUsers} />
          <StatsCard title="Administradores" value={metrics.admins} />
          <StatsCard title="Estudiantes" value={metrics.students} />
        </div>

        {/* TABLES & LISTS */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-1 shadow-sm">
            <PopularCourses courses={metrics.popularCourses} />
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-gray-100 dark:border-gray-800">
               <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                 Progreso Detallado
               </h2>
             </div>
             <UserProgressTable users={metrics.usersWithProgress} />
          </div>
        </div>

      </div>
    </div>
  )
}