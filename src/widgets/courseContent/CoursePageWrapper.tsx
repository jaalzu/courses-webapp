'use client'

import { useCourse } from '@/entities/course/model/useCourses'
import { MarkAsReadOnView } from '@/features/notifications/ui/MarkAsReadOnView'
import CourseNotFound from './CourseNotFound'
import CoursePageContent from './CoursePageContent'

interface Props {
  courseId: string
}

export function CoursePageWrapper({ courseId }: Props) {
  const { data: course, isLoading, error } = useCourse(courseId)

  if (isLoading) {
    return <div className="p-20 text-center">Cargando curso...</div>
  }

  if (error || !course) {
    return <CourseNotFound />
  }

  return (
    <>
      <MarkAsReadOnView postId={courseId} />
      <CoursePageContent courseId={courseId} />
    </>
  )
}