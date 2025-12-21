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
   <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 border dark:border-gray-800">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Cursos Más Populares</h2>
      <div className="space-y-4">
        {topCourses.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No hay cursos completados aún</p>
        ) : (
          topCourses.map((course, index) => (
            <div key={course.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{course.title}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-900 dark:text-gray-100">{course.completionCount}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">completados</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}