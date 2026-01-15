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
    ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' 
    : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30'

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${buttonColor}`}
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