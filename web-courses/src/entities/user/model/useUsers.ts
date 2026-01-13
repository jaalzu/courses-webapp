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
    setError 
  } = useUserStore()

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

  useEffect(() => {
    if (autoFetch && users.length === 0) {
      fetchUsers()
    }
  }, [autoFetch, fetchUsers, users.length])

  return {
    users,
    isLoading,
    error,
    fetchUsers
  }
}