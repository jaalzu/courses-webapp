// entities/user/model/useUsers.ts
import { useCallback } from 'react'
import { useUserStore } from './useUserStore'
import { usersApi } from '@/shared/api/users'

export function useUsers() {
  const users = useUserStore((s) => s.users)
  const isLoading = useUserStore((s) => s.isLoading)
  const error = useUserStore((s) => s.error)

  const setUsers = useUserStore((s) => s.setUsers)
  const setLoading = useUserStore((s) => s.setLoading)
  const setError = useUserStore((s) => s.setError)
  const updateUserInState = useUserStore((s) => s.updateUserInState)

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

  const updateUserRole = useCallback(async (userId: string, newRole: 'admin' | 'student') => {
    setLoading(true)
    setError(null)

    try {
      await usersApi.updateRole(userId, newRole)
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