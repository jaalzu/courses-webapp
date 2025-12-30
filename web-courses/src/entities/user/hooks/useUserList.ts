import { useEffect, useState } from 'react'
import { profileQueries } from '@/shared/lib/supabase/queries/profiles' // Ajustá la ruta
import type { User } from '../model/types'

export function useUserList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

 const loadUsers = async () => {
    setIsLoading(true)
    const { data, error } = await profileQueries.search('') 

    if (error) {
      console.error("Error en base de datos:", error.message)
    } else if (data) {
      //  Transformamos snake_case a camelCase para que TS no llore
      const mappedUsers: User[] = data.map((u: any) => ({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        avatarUrl: u.avatar_url, // mapeo
        bio: u.bio,
        createdAt: u.created_at, // mapeo
        updatedAt: u.updated_at  // mapeo
      }))
      
      setUsers(mappedUsers)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return { users, isLoading, refetch: loadUsers }
}