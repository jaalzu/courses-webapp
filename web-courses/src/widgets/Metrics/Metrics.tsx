// components/metrics/MetricsWidgets.tsx
interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

export function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

interface UserWithProgress {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string | Date;
  completedCourses: any[];
  totalLessonsCompleted: number;
  totalLessonsInProgress: number;
}

interface UserProgressTableProps {
  users: UserWithProgress[];
}

export function UserProgressTable({ users }: UserProgressTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Usuarios y Progreso</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Inicio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cursos Completados</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lecciones Completadas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.completedCourses.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.totalLessonsCompleted} / {user.totalLessonsInProgress}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Cursos Más Populares</h2>
      <div className="space-y-4">
        {topCourses.length === 0 ? (
          <p className="text-gray-500">No hay cursos completados aún</p>
        ) : (
          topCourses.map((course, index) => (
            <div key={course.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-700">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{course.title}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{course.completionCount}</p>
                <p className="text-xs text-gray-600">completados</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}