import type { User } from '@/entities/user/model/types'
import type { Course } from '@/entities/course/types'
import type { LessonProgress } from '@/entities/progress/types'

interface DeriveMetricsInput {
  users: User[]
  courses: Course[]
  progress: LessonProgress[]
}

export function deriveMetrics({ users, courses, progress }: DeriveMetricsInput) {
  // Agrupamos el progreso por userId de una sola vez para evitar .filter() constantes
  const progressByUser: Record<string, LessonProgress[]> = {}
  progress.forEach(p => {
    if (!progressByUser[p.userId]) progressByUser[p.userId] = []
    progressByUser[p.userId].push(p)
  })

  const totalUsers = users.length
  const admins = users.filter(u => u.role === 'admin').length
  const students = totalUsers - admins
  const totalCourses = courses.length

  const usersWithProgress = users.map(user => {
    const userProgress = progressByUser[user.id] || []
    
    // Creamos un Set de IDs completados para búsqueda O(1)
    const completedIds = new Set(
      userProgress.filter(p => p.completed).map(p => p.lessonId)
    )

    const completedCourses = courses.filter(course => {
      if (course.lessons.length === 0) return false
      return course.lessons.every(lesson => completedIds.has(lesson.id))
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      completedCoursesCount: completedCourses.length, 
      totalLessonsCompleted: completedIds.size,
      totalLessonsInProgress: userProgress.length
    }
  })

  // Contamos cuántas veces aparece cada curso como completado
  const courseCompletionMap: Record<string, number> = {}
  
  // En lugar de otro bucle triple, usamos los datos que ya procesamos arriba
  users.forEach(user => {
    const userProgress = progressByUser[user.id] || []
    const completedIds = new Set(userProgress.filter(p => p.completed).map(p => p.lessonId))
    
    courses.forEach(course => {
      if (course.lessons.length > 0 && course.lessons.every(l => completedIds.has(l.id))) {
        courseCompletionMap[course.id] = (courseCompletionMap[course.id] || 0) + 1
      }
    })
  })

  const popularCourses = courses
    .map(course => ({
      id: course.id.toString(),
      title: course.title,
      completionCount: courseCompletionMap[course.id] || 0
    }))
    .sort((a, b) => b.completionCount - a.completionCount)

  const totalCoursesCompleted = usersWithProgress.reduce(
    (sum, user) => sum + user.completedCoursesCount, 
    0
  )

  return {
    totalUsers,
    admins,
    students,
    totalCourses,
    totalCoursesCompleted,
    usersWithProgress,
    popularCourses
  }
}