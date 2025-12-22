// entities/user/model/types.ts

export type UserRole = 'student'  | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: Date
  assignedCourses?: number[] 
}

// Para crear nuevos usuarios (sin id ni createdAt)
export interface CreateUserInput {
  name: string
  email: string
  role?: UserRole
  avatar?: string
  assignedCourses?: number[]
}