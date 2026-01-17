import { Course } from '@/entities/course/types'
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid'

type Props = {
  course: Course
  hasAccess: boolean
  isInitial: boolean
  onToggle: (courseId: string, hasAccess: boolean) => void
  isPending: boolean
}

export function CourseAccessItem({ 
  course, 
  hasAccess, 
  isInitial, 
  onToggle, 
  isPending 
}: Props) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        {/* Indicador visual */}
        <div className="flex-shrink-0">
          {hasAccess || isInitial ? (
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
          ) : (
            <LockClosedIcon className="w-6 h-6 text-gray-400" />
          )}
        </div>

        {/* Info del curso */}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {course.title}
          </h3>
          {isInitial && (
            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
              Acceso automático
            </span>
          )}
        </div>
      </div>

      {/* Botón de acción */}
      {!isInitial && (
        <button
          onClick={() => onToggle(course.id, hasAccess)}
          disabled={isPending}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            hasAccess
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isPending ? 'Procesando...' : hasAccess ? 'Revocar' : 'Otorgar'}
        </button>
      )}
    </div>
  )
}