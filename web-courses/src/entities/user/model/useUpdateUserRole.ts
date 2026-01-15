// entities/user/model/useUpdateUserRole.ts
'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserRole, type UserRole } from '../api/updateUserRole'
import { toast } from 'sonner'

interface UpdateRoleVariables {
  userId: string
  newRole: UserRole
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, newRole }: UpdateRoleVariables) => {
      // Llamar a Server Action
      const response = await fetch('/api/users/update-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newRole }),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Error al actualizar rol')
      }

      return result
    },

    onSuccess: (_, variables) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['metrics'] })

      const roleLabel = variables.newRole === 'admin' ? 'Administrador' : 'Estudiante'
      toast.success(`Rol actualizado a ${roleLabel}`)
    },

    onError: (error: Error) => {
      toast.error(error.message || 'Error al actualizar el rol')
    },
  })
}