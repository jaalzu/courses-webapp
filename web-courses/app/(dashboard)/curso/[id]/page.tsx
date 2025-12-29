'use client'

import { useEffect } from "react" // 1. Importamos el hook
import { useParams } from "next/navigation"
import CourseNotFound from "@/widgets/courseContent/courseNotFound"
import CoursePageContent from "@/widgets/courseContent/coursePageContent"
import { useCourseStore } from "@/entities/course/model/useCourseStore"
// Importa un componente de carga si tienes uno
// import { CourseDetailSkeleton } from "@/widgets/courseContent/ui/skeleton"

export const dynamic = 'force-dynamic'

export default function CoursePage() {
  const { id } = useParams()
  const courseId = String(id)
  
  // 2. Traemos fetchCourses y el estado de carga
  const { getCourseById, fetchCourses, isLoading, courses } = useCourseStore()
  const course = getCourseById(courseId)

  // 3. Si refrescamos y no hay cursos, los pedimos a la DB
  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses()
    }
  }, [courses.length, fetchCourses])

  // 4. Lógica de renderizado por estados
  
  // Caso A: Está cargando de la DB y aún no tenemos el curso
  if (isLoading && !course) {
    return <div className="p-20 text-center">Cargando curso...</div> 
    // O mejor: return <CourseDetailSkeleton />
  }

  // Caso B: Ya terminó de cargar y el curso realmente NO existe
  if (!isLoading && !course) {
    return <CourseNotFound />
  }

  // Caso C: Tenemos el curso (ya sea porque estaba en el store o porque llegó de la DB)
  return <CoursePageContent courseId={courseId} />
}