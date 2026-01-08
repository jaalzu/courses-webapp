'use client'

// 1. Types
interface UserWithProgress {
  id: string
  name: string
  email: string
  role: string
  createdAt: string | Date
  completedCoursesCount: number 
  totalLessonsCompleted: number 
}

interface UserProgressTableProps {
  users: UserWithProgress[]
}

export function UserProgressTable({ users }: UserProgressTableProps) {
  
  const getRoleStyles = (role: string) => {
    const isAdmin = role.toLowerCase() === 'admin'
    return isAdmin 
      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 border border-red-200 dark:border-red-800' 
      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-800'
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
            <tr className="text-gray-500 dark:text-gray-400">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Usuario</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Rol</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">Cursos Completos</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Lecciones Totales</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50/80 dark:hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{user.name}</span>
                    <span className="text-xs text-gray-500 font-mono">{user.email}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${getRoleStyles(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                
                <td className="px-6 py-4 text-center">
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {user.completedCoursesCount}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {user.totalLessonsCompleted} lecciones
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}