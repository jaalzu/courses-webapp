// @/shared/mocks/users.ts
import type { User } from '@/entities/user'
import { LOCAL_USER } from './localUser'

export const mockUsers: User[] = [
  LOCAL_USER, 
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "Juan Admiaaaan",
    email: "admin@plataforma.dev",
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=5",
    createdAt: new Date("2024-01-15"),
    assignedCourses: [1, 2],
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    name: "María López",
    email: "maria@plataforma.dev",
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=8",
    createdAt: new Date("2024-02-01"),
    assignedCourses: [2, 3],
  },
]