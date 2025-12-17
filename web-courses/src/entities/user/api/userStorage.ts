// features/admin/api/userStorage.ts

import type { User, CreateUserInput } from '@/entities/user'

const STORAGE_KEY = 'app_users'

const isServer = () => typeof window === 'undefined'

const getAllUsers = (): User[] => {
  if (isServer()) return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveUsers = (users: User[]): void => {
  if (isServer()) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export const userStorage = {
  // Obtener todos los usuarios
  getAll: (): User[] => {
    return getAllUsers()
  },

  // Obtener usuario por ID
  getById: (id: string): User | undefined => {
    const users = getAllUsers()
    return users.find(u => u.id === id)
  },

  // Crear usuario
  create: (input: CreateUserInput): User => {
    const users = getAllUsers()
    
    const newUser: User = {
      id: crypto.randomUUID(),
      name: input.name,
      email: input.email,
      role: input.role || 'user',
      avatar: input.avatar,
      createdAt: new Date(),
      assignedCourses: input.assignedCourses || []
    }

    users.push(newUser)
    saveUsers(users)
    
    return newUser
  },

  // Actualizar usuario
  update: (id: string, updates: Partial<User>): User | null => {
    const users = getAllUsers()
    const index = users.findIndex(u => u.id === id)
    
    if (index === -1) return null

    users[index] = { ...users[index], ...updates }
    saveUsers(users)
    
    return users[index]
  },

  // Eliminar usuario
  delete: (id: string): boolean => {
    const users = getAllUsers()
    const filtered = users.filter(u => u.id !== id)
    
    if (filtered.length === users.length) return false
    
    saveUsers(filtered)
    return true
  },

  // Asignar curso a usuario
  assignCourse: (userId: string, courseId: number): boolean => {
    const users = getAllUsers()
    const user = users.find(u => u.id === userId)
    
    if (!user) return false
    if (user.assignedCourses.includes(courseId)) return false

    user.assignedCourses.push(courseId)
    saveUsers(users)
    
    return true
  },

  // Quitar curso de usuario
  removeCourse: (userId: string, courseId: number): boolean => {
    const users = getAllUsers()
    const user = users.find(u => u.id === userId)
    
    if (!user) return false

    user.assignedCourses = user.assignedCourses.filter(id => id !== courseId)
    saveUsers(users)
    
    return true
  },

  // Inicializar con data mock (útil para desarrollo)
  initializeMock: (mockUsers: User[]): void => {
    if (getAllUsers().length === 0) {
      saveUsers(mockUsers)
    }
  }
}