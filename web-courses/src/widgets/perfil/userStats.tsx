import { CheckCircleIcon, ClockIcon, AcademicCapIcon } from "@heroicons/react/24/outline"

interface UserStatsProps {
  completedCourses: number
  inProgressCourses: number
  totalCourses: number
  progressPercentage: number
}

export  function UserStats({
  completedCourses, 
  inProgressCourses, 
  totalCourses,
  progressPercentage, 
}: UserStatsProps) {
  return (
    <div className="space-y-4">
      {/* Título de sección */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Tu Progreso
      </h2>

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 📗 Cursos Completados */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <CheckCircleIcon className="w-10 h-10 text-green-400 dark:text-green-400" />
            <div>
             <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Cursos completados
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {completedCourses} <span className="text-lg font-normal text-gray-500 dark:text-gray-400">/ {totalCourses}</span>
              </p>
            </div>
          </div>
        </div>

        {/*  Cursos Activos */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className=" p-3 rounded-lg">
              <ClockIcon className="w-8 h-8 text-yellow-400 dark:text-yellow-400" />
            </div>
            <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Cursos en progreso
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {inProgressCourses}
              </p>

            </div>
          </div>
        </div>

        {/* Progreso Global */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-3">
            <div className=" p-3 rounded-lg">
              <AcademicCapIcon className="w-8 h-8 text-blue-600 dark:text-blue-700" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Progreso total
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {progressPercentage}<span className="text-xl">%</span>
              </p>
            </div>
          </div>
          
          {/* Barra de progreso */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-green-400 h-2.5 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  )
}