import { useCallback, useEffect } from 'react' 
import { useUserStore } from './useUserStore'
import { usersApi } from '@/shared/api/users'

export function useUsers(autoFetch = false) {
  const users = useUserStore((s) => s.users)
  const isLoading = useUserStore((s) => s.isLoading)
  const error = useUserStore((s) => s.error)

  const { 
    setUsers, 
    setLoading, 
    setError, 
    updateUserInState 
  } = useUserStore()

  // --- FETCH DE USUARIOS ---
  const fetchUsers = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await usersApi.getAll()
      setUsers(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [setUsers, setLoading, setError])

  // --- AUTO-FETCH (Para Metrics) ---
  useEffect(() => {
    // Si autoFetch es true y no tenemos usuarios, los traemos automáticamente
    if (autoFetch && users.length === 0) {
      fetchUsers()
    }
  }, [autoFetch, fetchUsers, users.length])

  // --- ACCIONES ---
  const updateUserRole = useCallback(async (userId: string, newRole: 'admin' | 'student') => {
    setLoading(true)
    setError(null)

    try {
      await usersApi.updateRole(userId, newRole)
      // Actualización optimista en el store de Zustand
      updateUserInState(userId, { role: newRole })
    } catch (err: any) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [updateUserInState, setLoading, setError])

  return {
    users,
    isLoading,
    error,
    fetchUsers,
    updateUserRole
  }
}