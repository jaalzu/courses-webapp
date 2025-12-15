'use client'

import Card from "@/widgets/dashboard/Card"
import { useCourseStore } from "@/entities/course/model/useCourseStore"
import CoursesSkeleton from "@/widgets/dashboard/coursesSkeleton"
import { NewCourseButton } from "@/features/admin/components/NewCourseButton"
import { useEditCourseFlow } from "@/features/admin/hooks/useEditCourseFlow"
import EditCourseManager from "@/features/admin/components/EditCourseManager"

export default function DashboardPage() {
  const courses = useCourseStore(state => state.courses)
  const editFlow = useEditCourseFlow() 

  if (!courses || courses.length === 0) {
    return (
      <div className="p-6 lg:p-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Cursos</h1>
          <NewCourseButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CoursesSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-10 space-y-6">
      {/* Encabezado con acción */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cursos</h1>
        <NewCourseButton />
      </div>

      {/* Grid de cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 xl:gap-x-8 gap-y-9 justify-items-center">
        {courses.map(({ id, image, title, description, level, lessons, ...rest }) => {
  return (
    <Card
      key={id}
      courseId={id}
      href={`/curso/${id}`}
      className="w-[100%] sm:w-[90%] md:w-[100%] lg:w-[95%] xl:w-[97%]"
      level={level}
      enableEdit={true}
      courseData={{ id, image, title, description, level, lessons, ...rest }}
      onEdit={() => editFlow.open(id)}
    />
  )
})}
      </div>
      {/* Manager de modales de edición */}
      <EditCourseManager flow={editFlow} /> 
    </div>
  )
}