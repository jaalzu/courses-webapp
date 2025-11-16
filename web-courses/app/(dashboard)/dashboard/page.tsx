'use client'
import Card from "@/components/dashboard/Card"
import { useCourseStore } from "@/lib/store/useCoursesStore"
import CoursesSkeleton from "@/components/dashboard/coursesSkeleton"
import { calculateCourseProgress } from "@/lib/utils/index"

export default function DashboardPage() {
  const courses = useCourseStore(state => state.courses)

  if (!courses || courses.length === 0) {
    return (
      <div className="p-6 lg:p-10">
        <h1 className="text-2xl font-bold mb-6">Cursos</h1>
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
      <h1 className="text-2xl font-bold">Cursos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 xl:gap-x-8 gap-y-9 justify-items-center">
        {courses.map((course) => {
          const { progress, completed } = calculateCourseProgress(course.lessons || [])

          return (
            <Card
              key={course.id}
              courseId={course.id}
              image={course.image}
              title={course.title}
              description={course.description}
              progress={progress}
              completed={completed}
              href={`/curso/${course.id}`}
              className="w-[100%] sm:w-[90%] md:w-[100%] lg:w-[95%] xl:w-[97%]"
              level={course.level}
              // 🆕 Props para habilitar edición
              enableEdit={true}  // 👈 En false para usuarios normales
              courseData={course}  // 👈 Datos completos del curso
            />
          )
        })}
      </div>
    </div>
  )
}