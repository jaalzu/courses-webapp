// entities/user/hooks/useUserActions.ts
import { useState } from 'react'
import { userStorage } from '../api/userStorage'
// import { supabase } from '@/shared/lib/supabase'

export function useUserActions() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateUserRole = async (
    userId: string,
    newRole: 'admin' | 'student'
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      // 🔮 FUTURO SUPABASE
      /*
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error
      */

      // ✅ PRESENTE (source of truth local)
      userStorage.updateRole(userId, newRole)

      return { success: true }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Error al actualizar rol'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    updateUserRole,
    isLoading,
    error,
  }
}
