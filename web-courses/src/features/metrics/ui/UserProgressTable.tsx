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


export function UserProgressTable({ users, onRoleUpdate }: UserProgressTableProps) {
  const [confirmingUser, setConfirmingUser] = useState<string | null>(null)
  const [pendingRole, setPendingRole] = useState<string | null>(null)
  const { updateUserRole, isLoading } = useUserActions()

  const handleRoleChange = async (userId: string, newRole: string) => {
    const user = users.find(u => u.id === userId)
    if (!user) return
    
    const currentRole = user.role
    
    if (newRole === 'admin' && currentRole !== 'admin') {
      setConfirmingUser(userId)
      setPendingRole(newRole)
      return
    }

    await performRoleUpdate(userId, newRole as 'admin' | 'student')
  }

  const performRoleUpdate = async (userId: string, newRole: 'admin' | 'student') => {
    const result = await updateUserRole(userId, newRole)
    
    if (result.success) {
  onRoleUpdate?.()
}

  }

  const confirmRoleChange = async () => {
    if (confirmingUser && pendingRole) {
      await performRoleUpdate(confirmingUser, pendingRole as 'admin' | 'student')
    }
    setConfirmingUser(null)
    setPendingRole(null)
  }

  const cancelRoleChange = () => {
    setConfirmingUser(null)
    setPendingRole(null)
  }

  const getRoleStyles = (role: string) => {
    const styles = {
      admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      student: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    }
    return styles[role as keyof typeof styles] || styles.student
  }

  return (
    <>
      {/* ================= MOBILE (VERTICAL) ================= */}
      <div className="space-y-4 md:hidden">
        {users.map(user => (
          <div
            key={user.id}
            className="bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-800 p-4 shadow"
          >
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Usuario</p>
                <p className="font-medium">{user.name}</p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400">Email</p>
                <p className="break-all">{user.email}</p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400">Rol</p>
                <select
                  value={user.role}
                  onChange={e =>
                    handleRoleChange(user.id, e.target.value)
                  }
                  disabled={isLoading}
                  className={`mt-1 w-full px-3 py-2 rounded text-sm font-medium
                  focus:ring-2 focus:ring-blue-500 ${getRoleStyles(
                    user.role
                  )}`}
                >
                  <option value="student">Estudiante</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Fecha inicio
                </p>
                <p>
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-gray-500 dark:text-gray-400">
                  Cursos completados
                </p>
                <p className="font-semibold">
                  {user.completedCourses.length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP (TABLA) ================= */}
      <div className="hidden md:block bg-white dark:bg-gray-900 rounded-lg shadow border dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold">Usuarios y Progreso</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Fecha Inicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">
                  Cursos Completados
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={e =>
                        handleRoleChange(user.id, e.target.value)
                      }
                      disabled={isLoading}
                      className={`px-3 py-1.5 text-xs rounded font-medium
                      focus:ring-2 focus:ring-blue-500 ${getRoleStyles(
                        user.role
                      )}`}
                    >
                      <option value="student">Estudiante</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {user.completedCourses.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {confirmingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 border dark:border-gray-800">
            <h3 className="text-lg font-bold mb-2">
              ¿Confirmar cambio de rol?
            </h3>
            <p className="text-sm mb-6">
              Estás por convertir a{' '}
              <span className="font-semibold">
                {users.find(u => u.id === confirmingUser)?.name}
              </span>{' '}
              en administrador.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelRoleChange}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={confirmRoleChange}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded"
              >
                Sí, hacer admin
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}