// entities/user/api/userStorage.ts
import type { User } from '../model/types'

class UserStorage {
  private storageKey = 'app-users'

  initializeMock(users: User[]): void {
    if (!this.getAll().length) {
      localStorage.setItem(this.storageKey, JSON.stringify(users))
    }
  }

  getAll(): User[] {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(this.storageKey)
    return data ? JSON.parse(data) : []
  }

  create(user: User): User {
    const users = this.getAll()
    users.push(user)
    localStorage.setItem(this.storageKey, JSON.stringify(users))
    return user
  }

  updateRole(userId: string, newRole: 'admin' | 'student'): void {
    const users = this.getAll()
    const updatedUsers = users.map(u => 
      u.id === userId ? { ...u, role: newRole } : u
    )
    localStorage.setItem(this.storageKey, JSON.stringify(updatedUsers))
  }

  delete(userId: string): void {
    const users = this.getAll().filter(u => u.id !== userId)
    localStorage.setItem(this.storageKey, JSON.stringify(users))
  }
}

export const userStorage = new UserStorage()