import { useEffect, useState, useCallback } from 'react'
import { profileQueries } from '@/shared/lib/supabase/queries/profiles'
import type { User } from '@/entities/user/model/types'

export function useUserList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadUsers = useCallback(async () => {
    setIsLoading(true)
    try {
      const { data, error } = await profileQueries.search('')
      if (error) throw error
      
      if (data) {
        const mappedUsers: User[] = data.map((u: any) => ({
          id: u.id,
          email: u.email,
          name: u.name,
          role: u.role,
          avatarUrl: u.avatar_url,
          bio: u.bio,
          createdAt: u.created_at,
          updatedAt: u.updated_at
        }))
        setUsers(mappedUsers)
      }
    } catch (err) {
      console.error("Error cargando usuarios:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  return { users, isLoading, refetch: loadUsers }
}