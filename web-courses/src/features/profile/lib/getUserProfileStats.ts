import type { User } from "@/entities/user/model/types"
import type { Course } from "@/entities/course/types"
import type { LessonProgress } from "@/entities/progress/types"
import { getCourseStats } from "@/entities/progress"

interface GetUserProfileStatsParams {
  user: User
  courses: Course[]
  progress: LessonProgress[]
}

export function getUserProfileStats({
  user,
  courses,
  progress,
}: GetUserProfileStatsParams) {
  // Calcular stats por cada curso
  const courseStats = courses.map(course =>
    getCourseStats(course, progress, user.id)
  )

  const totalCourses = courses.length

  const completedCourses = courseStats.filter(
    stat => stat.isCompleted
  ).length

  const inProgressCourses = courseStats.filter(
    stat => !stat.isCompleted && stat.completedLessons > 0
  ).length

  const completedLessons = courseStats.reduce(
    (acc, stat) => acc + stat.completedLessons,
    0
  )

  const totalLessons = courseStats.reduce(
    (acc, stat) => acc + stat.totalLessons,
    0
  )

  const progressPercentage =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100)

  return {
    // info básica
    userName: user.name,
    email: user.email,

    // cursos
    totalCourses,
    completedCourses,
    inProgressCourses,

    // lecciones
    completedLessons,
    totalLessons,

    // progreso global
    progressPercentage,
  }
}