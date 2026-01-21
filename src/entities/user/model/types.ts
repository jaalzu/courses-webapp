export type UserRole = 'student'  | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: Date
  assignedCourses?: string[] 
}

// Para crear nuevos usuarios (sin id ni createdAt)
export interface CreateUserInput {
  name: string
  email: string
  role?: UserRole
  avatar?: string
  assignedCourses?: string[]
}