'use client'

import { useEffect } from "react"
import { useParams } from "next/navigation"
import CourseNotFound from "@/widgets/courseContent/courseNotFound"
import CoursePageContent from "@/widgets/courseContent/coursePageContent"
import { useCourses } from "@/entities/course/useCourses" 

export const dynamic = 'force-dynamic'

export default function CoursePage() {
  const { id } = useParams()
  const courseId = String(id)
  
  const { courses, fetchCourses, isLoading } = useCourses() 
  const course = courses.find(c => c.id === courseId) 

  useEffect(() => {
    if (courses.length === 0) {
      fetchCourses()
    }
  }, [courses.length, fetchCourses])

  if (isLoading && !course) {
    return <div className="p-20 text-center">Cargando curso...</div>
  }

  if (!isLoading && !course) {
    return <CourseNotFound />
  }

  return <CoursePageContent courseId={courseId} />
}