import type { Course } from "@/entities/course/types"
import type { LessonProgress } from "@/entities/progress/types"
import { getCourseStats } from "@/entities/progress"

interface GetUserProfileStatsParams {
  user: {
    id: string;
    name: string;
    email: string;
  }
  courses: Course[]
  progress: LessonProgress[]
}

export function getUserProfileStats({
  user,
  courses,
  progress,
}: GetUserProfileStatsParams) {
  // Guard Clause: Si no hay cursos, evitamos cálculos innecesarios
  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    return {
      userName: user.name,
      email: user.email,
      totalCourses: 0,
      completedCourses: 0,
      inProgressCourses: 0,
      completedLessons: 0,
      totalLessons: 0,
      progressPercentage: 0,
    }
  }

  // Variables acumuladoras (Single Pass)
  let completedCourses = 0
  let inProgressCourses = 0
  let completedLessons = 0
  let totalLessons = 0

  // Recorremos una sola vez para calcular todo
  courses.forEach(course => {
    const stat = getCourseStats(course, progress, user.id)
    
    completedLessons += stat.completedLessons
    totalLessons += stat.totalLessons

    if (stat.isCompleted) {
      completedCourses++
    } else if (stat.completedLessons > 0) {
      inProgressCourses++
    }
  })

  // Cálculo del porcentaje global
  const progressPercentage = totalLessons === 0
    ? 0
    : Math.round((completedLessons / totalLessons) * 100)

  return {
    userName: user.name,
    email: user.email,
    totalCourses: courses.length,
    completedCourses,
    inProgressCourses,
    completedLessons,
    totalLessons,
    progressPercentage,
  }
}