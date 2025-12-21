// entities/user/hooks/useUserList.ts
import { useEffect, useState } from 'react'
import { userStorage } from '../api/userStorage'
import type { User } from '../model/types'
import { mockUsers } from '../model/mockUser' // ← Importar mockUsers

export function useUserList() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    userStorage.initializeMock(mockUsers) // ← Inicializar con mockUsers
    const data = userStorage.getAll()
    setUsers(data)
  }, [])

  return { users }
}