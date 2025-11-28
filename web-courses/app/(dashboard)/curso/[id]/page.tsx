'use client'

import { useParams } from "next/navigation"
import CourseNotFound from "@/components/course/courseNotFound"
import CoursePageContent from "@/components/course/coursePageContent"
import { useCourseStore } from "@/lib/store/useCoursesStore"

export default function CoursePage() {
  const { id } = useParams()
  const courseId = Number(id)
  const getCourse = useCourseStore(state => state.getCourse)
  const course = getCourse(courseId)

  if (isNaN(courseId)) return <CourseNotFound />
  if (!course) return <CourseNotFound />

  return <CoursePageContent courseId={courseId} />
}