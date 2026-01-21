import { User } from '@/entities/user/model/types'

type Props = {
  users: User[]
  selectedUserId: string
  onSelect: (userId: string) => void
}

export function UserSelector({ users, selectedUserId, onSelect }: Props) {
  const selectedUser = users.find(u => u.id === selectedUserId)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border p-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Seleccionar Usuario
      </label>
      <select
        value={selectedUserId}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800"
      >
        <option value="">-- Elegir un usuario --</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name || 'Sin nombre'} - {user.email} ({user.role})
          </option>
        ))}
      </select>

      {selectedUser && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="space-y-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              Usuario seleccionado
            </p>
            <div className="flex flex-col gap-1 text-sm text-blue-700 dark:text-blue-300">
              <span><strong>Nombre:</strong> {selectedUser.name || 'Sin nombre'}</span>
              <span><strong>Email:</strong> {selectedUser.email}</span>
              <span><strong>Rol:</strong> {selectedUser.role}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}