'use client'

import { useParams } from "next/navigation"
import CourseNotFound from "@/widgets/courseContent/courseNotFound"
import CoursePageContent from "@/widgets/courseContent/coursePageContent"
import { useCourses } from "@/entities/course/model/useCourses" 

export const dynamic = 'force-dynamic'

export default function CoursePage() {

  const { id } = useParams()
  const courseId = String(id)
  
  const { courses, isLoading } = useCourses() 
  const course = courses?.find(c => c.id === courseId) 

 if (isLoading) {
    return <div className="p-20 text-center">Cargando curso...</div>
  }

  if (!course) {
    return <CourseNotFound />
  }

  return <CoursePageContent courseId={courseId} />
}