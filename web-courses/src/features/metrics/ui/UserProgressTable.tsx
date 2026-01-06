// features/metrics/ui/UserProgressTable.tsx
'use client'

import { useState } from 'react'
import { useUserActions } from '@/features/admin/model/useUserActions'

interface UserWithProgress {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string | Date;
  completedCourses: any[];
}

interface UserProgressTableProps {
  users: UserWithProgress[]
  onRoleUpdate?: () => void
}


export function UserProgressTable({ users }: UserProgressTableProps) {
  const getRoleStyles = (role: string) => {
    const isRed = role === 'admin';
    return isRed 
      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' 
      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow border dark:border-gray-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Usuarios y Progreso</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr className="text-gray-500 dark:text-gray-400">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Cursos Completados</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${getRoleStyles(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">
                  {user.completedCourses.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}