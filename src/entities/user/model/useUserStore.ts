import { create } from 'zustand'
import type { User } from './types'

interface UserState {
  users: User[]
  isLoading: boolean
  error: string | null
}

interface UserActions {
  setUsers: (users: User[]) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  updateUserInState: (userId: string, updates: Partial<User>) => void
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  setUsers: (users) => set({ users }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  
  updateUserInState: (userId, updates) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, ...updates } : u
      )
    }))
}))