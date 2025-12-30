// 📁 features/favorites/model/hooks/useFavoriteCourses.ts
import { useFavoriteIds } from './useFavoritesIds'
import { useCourseStore } from '@/entities/course/model/useCourseStore'
import type { Course } from '@/entities/course/types'

export function useFavoriteCourses(): { favoriteCourses: Course[] } {
  const { favorites } = useFavoriteIds()
  const courses = useCourseStore(state => state.courses)

  const favoriteCourses = courses.filter(course => favorites.includes(course.id))

  return { favoriteCourses }
}
