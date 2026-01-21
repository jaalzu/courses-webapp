// features/metrics/ui/PopularCourses.tsx
interface CourseWithCompletion {
  id: string;
  title: string;
  completionCount: number;
}

interface PopularCoursesProps {
  courses: CourseWithCompletion[];
}

export function PopularCourses({ courses }: PopularCoursesProps) {
  const topCourses = courses.slice(0, 5);
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
          Cursos Más Populares
        </h2>
        <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
          Completados
        </span>
      </div>
      
      <div className="space-y-4">
        {topCourses.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No hay cursos completados aún</p>
        ) : (
          topCourses.map((course, index) => (
            <div key={course.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
                  {index + 1}
                </div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{course.title}</p>
              </div>
              <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
                {course.completionCount}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}