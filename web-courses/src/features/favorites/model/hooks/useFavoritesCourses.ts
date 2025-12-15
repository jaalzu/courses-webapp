// 📁 features/favorites/model/hooks/useFavoriteCourses.ts
import { useFavorites } from './useFavorites'
import { localStorageFavorites } from '@/features/favorites/lib/favoriteStorage'
import { useCourseStore } from '@/entities/course/model/useCourseStore'
import type { Course } from '@/entities/course/model/types'

export function useFavoriteCourses(): { favoriteCourses: Course[] } {
  const { favorites } = useFavorites(localStorageFavorites)
  const courses = useCourseStore(state => state.courses)

  const favoriteCourses = courses.filter(c => favorites.includes(c.id))

  return { favoriteCourses }
}
