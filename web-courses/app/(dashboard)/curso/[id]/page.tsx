'use client'

import { useParams } from "next/navigation"
import CourseNotFound from "@/widgets/courseContent/courseNotFound"
import CoursePageContent from "@/widgets/courseContent/coursePageContent"
import { useCourseStore } from "@/entities/course/model/useCourseStore"

export default function CoursePage() {
  const { id } = useParams()
  const courseId = Number(id)
  const getCourse = useCourseStore(state => state.getCourseById)
  const course = getCourse(courseId)

  if (isNaN(courseId)) return <CourseNotFound />
  if (!course) return <CourseNotFound />

  return <CoursePageContent courseId={courseId} />
}