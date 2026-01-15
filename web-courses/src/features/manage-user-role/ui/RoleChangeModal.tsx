// features/manage-user-role/ui/RoleChangeModal.tsx
'use client'

import { type UserRole } from '@/entities/user/api/updateUserRole'
import { useUpdateUserRole } from '@/entities/user/model/useUpdateUserRole'

interface RoleChangeModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
  userName: string
  currentRole: UserRole
  newRole: UserRole
}

export function RoleChangeModal({
  isOpen,
  onClose,
  userId,
  userName,
  currentRole,
  newRole,
}: RoleChangeModalProps) {
  const { mutate: updateRole, isPending } = useUpdateUserRole()

  if (!isOpen) return null

  const handleConfirm = () => {
    updateRole(
      { userId, newRole },
      {
        onSuccess: () => {
          onClose()
        },
      }
    )
  }

  const roleLabels = {
    admin: 'Administrador',
    student: 'Estudiante',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-800">
        
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Confirmar cambio de rol
          </h3>
        </div>

        {/* Body */}
        <div className="mb-6 space-y-3">
          <p className="text-gray-600 dark:text-gray-400">
            ¿Estás seguro de cambiar el rol del usuario <strong className="text-gray-900 dark:text-gray-100">{userName}</strong>?
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Rol actual:</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {roleLabels[currentRole]}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Nuevo rol:</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {roleLabels[newRole]}
              </span>
            </div>
          </div>

          {newRole === 'admin' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ El usuario tendrá acceso completo al panel de administración
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isPending}
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isPending}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Actualizando...' : 'Confirmar'}
          </button>
        </div>

      </div>
    </div>
  )
}