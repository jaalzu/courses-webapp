'use client'
import Card from "@/components/ui/Card"
import { useCourseStore } from "@/lib/store/courses"



export default function DashboardPage() {
  const courses = useCourseStore(state => state.courses)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 xl:gap-x-8 gap-y-9 justify-items-center p-6">
      {courses.map((course) => {
        // Calcular progreso dinámico
        const completedCount = course.lessons.filter(l => l.completed).length
        const totalLessons = course.lessons.length
        const progress = Math.round((completedCount / totalLessons) * 100)

        return (
          <Card
            key={course.id}
            image={course.image}
            title={course.title}
            description={course.description}
            progress={progress}  // ← Progreso calculado dinámicamente
            completed={{ done: completedCount, total: totalLessons }}
            href={`/dashboard/cursos/${course.id}`}
            className="w-[100%] sm:w-[90%] md:w-[100%] lg:w-[95%] xl:w-[97%]"
          />
        )
      })}
    </div>
  )
}