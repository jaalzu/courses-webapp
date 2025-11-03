'use client'
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline"

interface UserStatsProps {
  completedCourses: number
  inProgressCourses: number
  totalCourses: number
  progressPercentage: number
  completedLessons: number
  totalLessons: number
}

export default function UserStats({
  completedCourses, inProgressCourses, totalCourses,
  progressPercentage, completedLessons, totalLessons
}: UserStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
        <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
        <div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{completedCourses}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">de {totalCourses} cursos</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
        <ClockIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{inProgressCourses}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">cursos activos</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{progressPercentage}%</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
          <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progressPercentage}%` }} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{completedLessons}/{totalLessons} lecciones</p>
      </div>
    </div>
  )
}
