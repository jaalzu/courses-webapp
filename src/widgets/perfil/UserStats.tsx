import { CheckCircleIcon, ClockIcon, AcademicCapIcon } from "@heroicons/react/24/outline"

interface UserStatsProps {
  completedCourses: number
  inProgressCourses: number
  totalCourses: number
  progressPercentage: number
}

export function UserStats({ 
  completedCourses, 
  inProgressCourses, 
  totalCourses, 
  progressPercentage 
}: UserStatsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Tu Progreso</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <CheckCircleIcon className="w-10 h-10 text-green-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cursos completados</p>
              <p className="text-3xl font-bold">
                {completedCourses} 
                <span className="text-lg font-normal text-gray-500"> / {totalCourses}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <ClockIcon className="w-10 h-10 text-yellow-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">En progreso</p>
              <p className="text-3xl font-bold">{inProgressCourses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-3">
            <AcademicCapIcon className="w-10 h-10 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Progreso total</p>
              <p className="text-3xl font-bold">{progressPercentage}%</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-green-400 h-2.5 transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}