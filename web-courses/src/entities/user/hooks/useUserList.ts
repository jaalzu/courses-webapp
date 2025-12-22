// entities/user/hooks/useUserList.ts
import { useEffect, useState, useCallback } from 'react'
import { userStorage } from '../api/userStorage'
import type { User } from '../model/types'
import { mockUsers } from '../model/mockUser'
// useUserList.ts
export function useUserList() {
  const [users, setUsers] = useState<User[]>([])

  const loadUsers = () => {
    setUsers(userStorage.getAll())
  }

  useEffect(() => {
    userStorage.initializeMock(mockUsers)
    loadUsers()
  }, [])

  const refetch = async () => {
    loadUsers()
  }

  return { users, refetch }
}
