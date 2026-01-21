import { Course } from '@/entities/course/types'
import { User } from '@/entities/user/model/types'
import { CourseAccessItem } from './CourseAccessItem'

type Props = {
  user: User
  courses: Course[]
  accessedCourseIds: Set<string>
  onToggle: (courseId: string, hasAccess: boolean) => void
  isPending: boolean
  isLoading: boolean
}

export function CourseAccessList({ 
  user, 
  courses, 
  accessedCourseIds, 
  onToggle, 
  isPending,
  isLoading 
}: Props) {
  const accessCount = accessedCourseIds.size

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Cursos para: {user.name || user.email}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {accessCount} {accessCount === 1 ? 'curso con acceso' : 'cursos con acceso'}
        </p>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-gray-500">
          Cargando accesos...
        </div>
      ) : courses.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No hay cursos disponibles
        </div>
      ) : (
        <div className="divide-y">
          {courses.map(course => (
            <CourseAccessItem
              key={course.id}
              course={course}
              hasAccess={accessedCourseIds.has(course.id)}
              isInitial={course.is_initial || false}
              onToggle={onToggle}
              isPending={isPending}
            />
          ))}
        </div>
      )}
    </div>
  )
}