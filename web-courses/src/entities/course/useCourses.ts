// @/entities/course/api/useCourses.ts
import { useCourseStore } from './model/useCourseStore'

// hooks
export function useCourses() {
  return useCourseStore(s => s.courses)
}

export function useCourseActions() {
  return useCourseStore(s => ({
    addCourse: s.addCourse,
    updateCourse: s.updateCourse,
    deleteCourse: s.deleteCourse,
  }))
}
