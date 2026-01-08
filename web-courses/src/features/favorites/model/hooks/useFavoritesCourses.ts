// 📁 features/favorites/model/hooks/useFavoriteCourses.ts
import { useFavoriteIds } from './useFavoritesIds'
import { useCourses } from '@/entities/course/model/useCourses'
import type { Course } from '@/entities/course/types'

export function useFavoriteCourses(): { favoriteCourses: Course[] } {
  const { favorites } = useFavoriteIds()
  const {courses} = useCourses()

  const favoriteCourses = courses.filter(course => favorites.includes(course.id))

  return { favoriteCourses }
}
