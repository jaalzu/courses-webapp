'use client'

import { useCourseStore } from "@/entities/course/model/useCourseStore"
import { useEditCourseFlow } from "@/features/admin/hooks/useEditCourseFlow"
import { NewCourseButton } from "@/features/admin/ui/shared/NewCourseButton"
import EditCourseManager from "@/features/admin/ui/courses/EditCourseManager"

import CoursesSkeleton from "./coursesSkeleton"
import { DashboardLayout } from "./DashboardLayout"
import { CoursesGrid } from "./CoursesGrid"

export function CoursesDashboard() {
  const courses = useCourseStore(state => state.courses)
  const editFlow = useEditCourseFlow()

  if (!courses || courses.length === 0) {
    return (
      <DashboardLayout
        title="Cursos"
        action={<NewCourseButton />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CoursesSkeleton key={i} />
          ))}
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="Cursos"
      action={<NewCourseButton />}
    >
      <CoursesGrid
        courses={courses}
        onEdit={editFlow.open}
      />

      <EditCourseManager flow={editFlow} />
    </DashboardLayout>
  )
}
