'use client'

import { useFavorites } from '@/hooks/useFavorites'
import { localStorageFavorites } from '@/lib/favoriteStorage'
import { useCourseStore } from '@/lib/store/courses'
import Card from '@/components/dashboard/Card'
import { calculateCourseProgress } from '@/lib/utils'

export default function FavoritosPage() {
  const { favorites } = useFavorites(localStorageFavorites)
  const courses = useCourseStore(state => state.courses)

  const favoriteCourses = courses.filter(c => favorites.includes(c.id))

  if (favoriteCourses.length === 0) {
    return (
      <main className="p-6 lg:p-10">
        <h1 className="text-2xl font-bold mb-4">Tus Favoritos</h1>
        <p className="text-gray-600 dark:text-gray-300">No tienes cursos favoritos todavía.</p>
      </main>
    )
  }

  return (
    <main className="p-6 lg:p-10 space-y-6">
      <h1 className="text-2xl font-bold">Tus Favoritos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 xl:gap-x-8 gap-y-9 justify-items-center">
        {favoriteCourses.map(course => {
          const { progress, completed } = calculateCourseProgress(course.lessons || [])

          return (
            <Card
              key={course.id}
              courseId={course.id}
              image={course.image}
              title={course.title}
              description={course.description}
              href={`/curso/${course.id}`}
              completed={completed}
              progress={progress}
              level={course.level}
              className="w-[100%] sm:w-[90%] md:w-[100%] lg:w-[95%] xl:w-[97%]"
            />
          )
        })}
      </div>
    </main>
  )
}