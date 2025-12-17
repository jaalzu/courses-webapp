// // entities/user/model/user.store.ts
// import { create } from 'zustand'
// import { userStorage } from '@/features/admin/api/userStorage'
// import type { User, CreateUserInput } from './types'
// import { mockUsers } from './mockUsers'

// interface UserStore {
//   users: User[]

//   loadUsers: () => void
//   createUser: (input: CreateUserInput) => void
//   updateUser: (id: string, updates: Partial<User>) => void
//   deleteUser: (id: string) => void
//   assignCourse: (userId: string, courseId: number) => void
//   removeCourse: (userId: string, courseId: number) => void
// }

// export const useUserStore = create<UserStore>((set) => ({
//   users: [],

//   loadUsers: () => {
//     userStorage.initializeMock(mockUsers)
//     set({ users: userStorage.getAll() })
//   },

//   createUser: (input) => {
//     userStorage.create(input)
//     set({ users: userStorage.getAll() })
//   },

//   updateUser: (id, updates) => {
//     userStorage.update(id, updates)
//     set({ users: userStorage.getAll() })
//   },

//   deleteUser: (id) => {
//     userStorage.delete(id)
//     set({ users: userStorage.getAll() })
//   },

//   assignCourse: (userId, courseId) => {
//     userStorage.assignCourse(userId, courseId)
//     set({ users: userStorage.getAll() })
//   },

//   removeCourse: (userId, courseId) => {
//     userStorage.removeCourse(userId, courseId)
//     set({ users: userStorage.getAll() })
//   }
// }))
