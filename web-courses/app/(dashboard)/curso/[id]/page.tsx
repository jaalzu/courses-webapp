'use client'

import { useParams } from "next/navigation"
import CourseNotFound from "@/entities/course/ui/courseNotFound"
import CoursePageContent from "@/entities/course/ui/coursePageContent"
import { useCourseStore } from "@/entities/course/model/useCoursesStore"

export default function CoursePage() {
  const { id } = useParams()
  const courseId = Number(id)
  const getCourse = useCourseStore(state => state.getCourse)
  const course = getCourse(courseId)

  if (isNaN(courseId)) return <CourseNotFound />
  if (!course) return <CourseNotFound />

  return <CoursePageContent courseId={courseId} />
}