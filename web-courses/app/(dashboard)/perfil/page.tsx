'use client'
import { useCourseStore } from "@/entities/course/model/useCourseStore"
import AvatarUser from "@/widgets/perfil/avatarUser"
import UserStats from "@/widgets/perfil/userStats"
import RecentActivity from "@/widgets/perfil/recentActivity"

export default function PerfilPage() {
  const courses = useCourseStore(state => state.courses)
  const userName = "Juan Pérez"

  const totalCourses = courses.length
  const completedCourses = courses.filter(c => c.lessons.every(l => l.completed)).length
  const inProgressCourses = courses.filter(c => c.lessons.some(l => l.completed) && !c.lessons.every(l => l.completed)).length
  const totalLessons = courses.reduce((acc, c) => acc + c.lessons.length, 0)
  const completedLessons = courses.reduce((acc, c) => acc + c.lessons.filter(l => l.completed).length, 0)
  const progressPercentage = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-neutral-900 p-6 md:p-10 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <AvatarUser name={userName} email="estudiante@ejemplo.com" />
        <UserStats
          completedCourses={completedCourses}
          inProgressCourses={inProgressCourses}
          totalCourses={totalCourses}
          progressPercentage={progressPercentage}
          completedLessons={completedLessons}
          totalLessons={totalLessons}
        />
        <RecentActivity />
      </div>
    </div>
  )
}
