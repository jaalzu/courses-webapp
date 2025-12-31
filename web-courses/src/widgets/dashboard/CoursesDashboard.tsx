'use client'

import { useEffect } from "react" // 1. Importar useEffect
import { useCourseStore } from "@/entities/course/model/useCourseStore"
import { useEditCourseFlow } from "@/features/admin/hooks/useEditCourseFlow"
import { NewCourseButton } from "@/features/admin/ui/shared/NewCourseButton"
import EditCourseManager from "@/features/admin/ui/courses/EditCourseManager"

import CoursesSkeleton from "./coursesSkeleton"
import { DashboardLayout } from "./DashboardLayout"
import { CoursesGrid } from "./CoursesGrid"

export function CoursesDashboard() {
  // 2. Traer isLoading y fetchCourses del store
  const { courses, isLoading, fetchCourses } = useCourseStore()
  const editFlow = useEditCourseFlow()

  // 3. Disparar la carga al montar el componente
  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  // 4. Si está CARGANDO, mostramos Skeleton
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

  // 5. Si NO está cargando pero NO hay cursos (Vacío real)
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

  // 6. Si hay cursos, mostramos la Grid
  return (
    <DashboardLayout title="Cursos" action={<NewCourseButton />}>
      <CoursesGrid courses={courses} onEdit={editFlow.open} />
      <EditCourseManager flow={editFlow} />
    </DashboardLayout>
  )
}