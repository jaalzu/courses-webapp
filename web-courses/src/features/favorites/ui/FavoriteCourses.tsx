'use client'

import dynamic from 'next/dynamic'
import { useFavoriteCourses } from '@/features/favorites/model/hooks/useFavoritesCourses'

const Card = dynamic(() => import('@/widgets/dashboard/Card'), {
  ssr: false,
})

export function FavoriteCourses() {
  const { favoriteCourses } = useFavoriteCourses()

  if (favoriteCourses.length === 0) {
    return (
      <main className="p-6 lg:p-10">
        <h1 className="text-2xl uppercase tracking-widest text-muted-foreground mb-3">Tus Favoritos</h1>
        <p className="text-gray-600 dark:text-gray-300">
          No tienes cursos favoritos todavía.{' '}
          <a href="/dashboard" className="text-blue-500">
            Ver cursos
          </a>
        </p>
      </main>
    )
  }

  return (
    <main className="p-6 lg:p-10 space-y-6">
      <h1 className="text-2xl font-bold">Tus Favoritos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 xl:gap-x-8 gap-y-9 justify-items-center">
        {favoriteCourses.map(({ id, image, title, description, level, ...courseData }) => (
          <Card
            key={id}
            courseId={id}
            href={`/curso/${id}`}
            level={level}
            className="w-[100%] sm:w-[90%] md:w-[100%] lg:w-[95%] xl:w-[97%]"
            courseData={{ id, image, title, description, level, ...courseData }}
          />
        ))}
      </div>
    </main>
  )
}
