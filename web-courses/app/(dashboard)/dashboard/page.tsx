'use client'
import Card from "@/components/ui/Card"
import { useCourseStore } from "@/lib/store/courses"

export default function DashboardPage() {
  const courses = useCourseStore(state => state.courses)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 xl:gap-x-8 gap-y-9 justify-items-center p-6 lg:p-10">
      {courses.map(({ id, image, title, description, lessons, level }) => {
        const completedCount = lessons.filter(lesson => lesson.completed).length
        const totalLessons = lessons.length
        const progress = Math.round((completedCount / totalLessons) * 100)

        return (
          <Card
            key={id}
            image={image}
            title={title}
            description={description}
            progress={progress}
            completed={{ done: completedCount, total: totalLessons }}
            href={`/curso/${id}`}
            className="w-[100%] sm:w-[90%] md:w-[100%] lg:w-[95%] xl:w-[97%]"
            level={level}
          />
        )
      })}
    </div>
  )
}