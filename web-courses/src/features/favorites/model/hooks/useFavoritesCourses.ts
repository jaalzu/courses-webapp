// 📁 features/favorites/model/hooks/useFavoriteCourses.ts
import { useFavoriteIds } from './useFavoritesIds'
import { localStorageFavorites } from '@/features/favorites/lib/favoriteStorage'
import { useCourseStore } from '@/entities/course/model/useCourseStore'
import type { Course } from '@/entities/course/model/types'

export function useFavoriteCourses(): { favoriteCourses: Course[] } {
  const { favorites } = useFavoriteIds(localStorageFavorites)
  const courses = useCourseStore(state => state.courses)

  const favoriteCourses = courses.filter(course => favorites.includes(course.id))

  return { favoriteCourses }
}
