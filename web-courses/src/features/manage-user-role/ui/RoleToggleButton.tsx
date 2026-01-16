// features/manage-user-role/ui/RoleToggleButton.tsx
'use client'

import { useState } from 'react'
import { type UserRole } from '@/entities/user/api/updateUserRole'
import { RoleChangeModal } from './RoleChangeModal'

interface RoleToggleButtonProps {
  userId: string
  userName: string
  currentRole: UserRole
}

export function RoleToggleButton({ userId, userName, currentRole }: RoleToggleButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const newRole: UserRole = currentRole === 'admin' ? 'student' : 'admin'
  
  const buttonText = currentRole === 'admin' ? 'Cambiar a Estudiante' : 'Promover a Admin'
  const buttonColor = currentRole === 'admin' 
    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600' 
    : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all ${buttonColor}`}
      >
        {buttonText}
      </button>

      <RoleChangeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
        userName={userName}
        currentRole={currentRole}
        newRole={newRole}
      />
    </>
  )
}