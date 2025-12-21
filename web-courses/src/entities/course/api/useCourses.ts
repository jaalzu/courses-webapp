// @/entities/course/api/useCourses.ts
import { useCourseStore } from '../model/useCourseStore'

export function useCourses() {
  return useCourseStore(state => state.courses)
}