// features/metrics/lib/deriveMetrics.ts
import type { User } from '@/entities/user/model/types'
import type { Course } from '@/entities/course/model/types'
import type { LessonProgress } from '@/entities/progress/model/types'

interface DeriveMetricsInput {
  users: User[]
  courses: Course[]
  progress: LessonProgress[]
}

export function deriveMetrics({ users, courses, progress }: DeriveMetricsInput) {
  // Stats básicas
  const totalUsers = users.length
  const admins = users.filter(u => u.role === 'admin').length
  const students = users.filter(u => u.role === 'user').length
  const totalCourses = courses.length
  
  // Usuarios con progreso detallado
  const usersWithProgress = users.map(user => {
    const userProgress = progress.filter(p => p.userId === user.id)
    
    // Cursos completados: un curso está completo si todas sus lecciones están completadas
    const completedCourses = courses.filter(course => {
      const courseLessonIds = course.lessons.map(l => l.id)
      const completedLessonIds = userProgress
        .filter(p => p.courseId === course.id && p.completed)
        .map(p => p.lessonId)
      
      return courseLessonIds.length > 0 && 
             courseLessonIds.every(id => completedLessonIds.includes(id))
    })
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      completedCourses: completedCourses,
      totalLessonsCompleted: userProgress.filter(p => p.completed).length,
      totalLessonsInProgress: userProgress.length
    }
  })
  
  // Cursos más populares
  const popularCourses = courses
    .map(course => {
      const completionCount = users.filter(user => {
        const userProgress = progress.filter(p => p.userId === user.id && p.courseId === course.id)
        const courseLessonIds = course.lessons.map(l => l.id)
        const completedLessonIds = userProgress
          .filter(p => p.completed)
          .map(p => p.lessonId)
        
        return courseLessonIds.length > 0 && 
               courseLessonIds.every(id => completedLessonIds.includes(id))
      }).length
      
      return {
        id: course.id.toString(),
        title: course.title,
        completionCount
      }
    })
    .sort((a, b) => b.completionCount - a.completionCount)
  
  // Total de cursos completados
  const totalCoursesCompleted = usersWithProgress.reduce(
    (sum, user) => sum + user.completedCourses.length, 
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