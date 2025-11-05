'use client'
import Card from "@/components/dashboard/Card"
import { useCourseStore } from "@/lib/store/courses"
import CoursesSkeleton from "@/components/dashboard/coursesSkeleton"

export default function DashboardPage() {
  const courses = useCourseStore(state => state.courses)


    if (!courses || courses.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6 lg:p-10">
        {[...Array(6)].map((_, i) => (
          <CoursesSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 xl:gap-x-8 gap-y-9 justify-items-center p-6 lg:p-10">
      {courses.map(({ id, image, title, description, lessons = [], level }) => {
  const totalLessons = lessons.length
  const completedCount = totalLessons > 0 
    ? lessons.filter(lesson => lesson.completed).length 
    : 0

  const progress = totalLessons > 0 
    ? Math.round((completedCount / totalLessons) * 100)
    : 0

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