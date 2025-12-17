// entities/user/model/mockUsers.ts

import type { User } from './types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'user',
    avatar: '/avatar.png',
    createdAt: new Date('2024-01-15'),
    assignedCourses: [1, 2, 3]
  },
  {
    id: '2',
    name: 'María González',
    email: 'maria@example.com',
    role: 'instructor',
    avatar: '/avatar.png',
    createdAt: new Date('2024-02-20'),
    assignedCourses: [1, 4]
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: '/avatar.png',
    createdAt: new Date('2024-01-01'),
    assignedCourses: []
  }
]