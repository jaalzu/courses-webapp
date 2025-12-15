import { useCourseStore } from "@/entities/course/model/useCourseStore"
import type { UserProfileStats } from "./types"

export const useUserProfile = (userName: string, email: string): UserProfileStats => {
  const courses = useCourseStore(state => state.courses)

  const totalCourses = courses.length
  const completedCourses = courses.filter(c => c.lessons.every(l => l.completed)).length
  const inProgressCourses = courses.filter(
    c => c.lessons.some(l => l.completed) && !c.lessons.every(l => l.completed)
  ).length
  const totalLessons = courses.reduce((acc, c) => acc + c.lessons.length, 0)
  const completedLessons = courses.reduce(
    (acc, c) => acc + c.lessons.filter(l => l.completed).length,
    0
  )
  const progressPercentage = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0

  return {
    userName,
    email,
    totalCourses,
    completedCourses,
    inProgressCourses,
    totalLessons,
    completedLessons,
    progressPercentage
  }
}
