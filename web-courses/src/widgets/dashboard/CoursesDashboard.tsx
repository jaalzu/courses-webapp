'use client'

// 1. React & Next
import { useEffect } from "react"

// 2. Features (Lógica de negocio y flujos)
import { useAuthStore } from '@/features/auth/model/useAuthStore' 
import { useEditCourseFlow } from "@/features/admin/hooks/useEditCourseFlow"
import { NewCourseButton } from "@/features/admin/ui/shared/NewCourseButton"
import EditCourseManager from "@/features/admin/ui/courses/EditCourseManager"

// 3. Entities (Modelos de datos y estado)
import { useCourses } from "@/entities/course/model/useCourses" 
import { useProgress } from "@/entities/progress/model/useProgress" 

// 4. UI Local (Componentes específicos de este dashboard)
import CoursesSkeleton from "./coursesSkeleton"
import { DashboardLayout } from "./DashboardLayout"
import { CoursesGrid } from "./CoursesGrid"





export function CoursesDashboard() {
  const { courses, isLoading, fetchCourses } = useCourses() 
  const { fetchUserProgress } = useProgress() 
  const currentUser = useAuthStore(state => state.currentUser)
  const editFlow = useEditCourseFlow()

  useEffect(() => {
    fetchCourses()
    // Si hay usuario, traemos su progreso una sola vez para todos los cursos
    if (currentUser?.id) {
      fetchUserProgress(currentUser.id)
    }
  }, [fetchCourses, fetchUserProgress, currentUser?.id])

  if (isLoading) {
    return (
      <DashboardLayout title="Cursos" action={<NewCourseButton />}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CoursesSkeleton key={i} />
          ))}
        </div>
      </DashboardLayout>
    )
  }

  if (!courses || courses.length === 0) {
    return (
      <DashboardLayout title="Cursos" action={<NewCourseButton />}>
        <div className="p-10 text-center border-2 border-dashed rounded-lg">
          <p className="text-gray-500">No hay cursos disponibles. ¡Crea el primero!</p>
          <div className="mt-4"><NewCourseButton /></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Cursos" action={<NewCourseButton />}>
      {/* La Grid ahora recibirá los cursos y el progreso ya estará en el store */}
      <CoursesGrid courses={courses} onEdit={editFlow.open} />
      <EditCourseManager flow={editFlow} />
    </DashboardLayout>
  )
}