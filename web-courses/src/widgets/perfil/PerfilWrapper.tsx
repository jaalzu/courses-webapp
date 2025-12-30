'use client'

import { useEffect, useState } from "react"
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { useCourses } from "@/entities/course/useCourses"
import { useProgressStore } from "@/entities/progress/model/useProgressStore"
import { getUserProgress } from "@/entities/progress/lib/getUserProgress"
import { getUserProfileStats } from "@/features/profile/lib/getUserProfileStats"
import { Avatar, AvatarFallback, Button } from "@/shared/ui/index"
import { 
  CheckCircleIcon, 
  ClockIcon, 
  AcademicCapIcon, 
  PencilIcon, 
  CheckIcon, 
  XMarkIcon 
} from "@heroicons/react/24/outline"

// ========== AvatarUser Component ==========
interface AvatarUserProps {
  name: string
  email: string
}

function AvatarUser({ name, email }: AvatarUserProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(name)

  useEffect(() => {
    setUserName(name)
  }, [name])

  const initials =
    typeof userName === "string" && userName.trim().length > 0
      ? userName
          .trim()
          .split(" ")
          .map(n => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "??"

  const handleSave = () => {
    // TIP: Aquí podrías usar supabase.auth.updateUser({ data: { full_name: userName } })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setUserName(name)
    setIsEditing(false)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <Avatar className="h-28 w-28 md:h-32 md:w-32">
            <AvatarFallback className="text-3xl font-semibold bg-blue-600 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 text-center md:text-left space-y-3 w-full">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full md:w-auto px-4 py-2.5 border-2 border-blue-500 dark:border-blue-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-lg"
                placeholder="Tu nombre"
                autoFocus
              />
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                  <CheckIcon className="w-4 h-4 mr-1" /> Guardar
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <XMarkIcon className="w-4 h-4 mr-1" /> Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {userName || 'Usuario'}
                </h1>
                <Button onClick={() => setIsEditing(true)} variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <PencilIcon className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ========== UserStats Component ==========
interface UserStatsProps {
  completedCourses: number
  inProgressCourses: number
  totalCourses: number
  progressPercentage: number
}

function UserStats({ completedCourses, inProgressCourses, totalCourses, progressPercentage }: UserStatsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Tu Progreso</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <CheckCircleIcon className="w-10 h-10 text-green-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cursos completados</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {completedCourses} <span className="text-lg font-normal text-gray-500">/ {totalCourses}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <ClockIcon className="w-10 h-10 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Cursos en progreso</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{inProgressCourses}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4 mb-3">
            <AcademicCapIcon className="w-10 h-10 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Progreso total</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{progressPercentage}%</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div className="bg-green-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
// ========== Main Component ==========
export function PerfilWrapper() {
  // 1. CORRECCIÓN: Usamos 'currentUser' que es el nombre real en tu AuthStore
  const currentUser = useAuthStore(state => state.currentUser)
  const checkAuth = useAuthStore(state => state.checkAuth)
  const isLoadingAuth = useAuthStore(state => state.isLoading)
  
  const courses = useCourses()
  const progress = useProgressStore(state => state.progress)
  const fetchUserProgress = useProgressStore(state => state.fetchUserProgress) 

  // 2. Verificación inicial: Si no hay usuario, disparamos checkAuth por si la persistencia falló
  useEffect(() => {
    if (!currentUser) {
      checkAuth()
    }
  }, [currentUser, checkAuth])

  // 3. Efecto para cargar progreso cuando tengamos el ID
  useEffect(() => {
    if (currentUser?.id) {
      fetchUserProgress(currentUser.id)
    }
  }, [currentUser?.id, fetchUserProgress])

  // 4. Estado de carga: Mientras no haya usuario Y el store esté "cargando"
  if (!currentUser && isLoadingAuth) {
    return (
      <div className="p-10 text-center">
        <p className="animate-pulse text-blue-600 font-medium">Verificando sesión...</p>
      </div>
    )
  }

  // 5. Si terminó de cargar y NO hay usuario, redirigir o mostrar mensaje
  if (!currentUser) {
    return (
      <div className="p-10 text-center space-y-4">
        <p className="text-gray-600">No se encontró una sesión activa.</p>
        <Button onClick={() => window.location.href = '/login'}>
          Ir al Login
        </Button>
      </div>
    )
  }

  // 6. Si llegamos aquí, tenemos un currentUser real
  const userProgress = getUserProgress(progress, currentUser.id)

  const stats = getUserProfileStats({
    user: {
      id: currentUser.id,
      // Usamos el tipado de Supabase que viene en tu store
      name: (currentUser as any).user_metadata?.full_name || currentUser.email?.split('@')[0] || 'Usuario',
      email: currentUser.email || '',
    },
    courses,
    progress: userProgress,
  })

  return (
    <main className="w-full p-6 lg:p-10 space-y-6">
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Mi Perfil</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Gestiona tu información y revisa tu progreso.</p>
      </div>

      <AvatarUser name={stats.userName} email={stats.email} />
      
      <UserStats 
        completedCourses={stats.completedCourses}
        inProgressCourses={stats.inProgressCourses}
        totalCourses={stats.totalCourses}
        progressPercentage={stats.progressPercentage}
      />
    </main>
  )
}