import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/entities/user/model/types' 

interface AuthStore {
  currentUser: User | null
  isAuthenticated: boolean
  
  // Actions
  setCurrentUser: (user: User) => void
  logout: () => void
  updateUserProfile: (updates: Partial<User>) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,

      setCurrentUser: (user) => {
        console.log('✅ Usuario establecido:', user)
        set({ 
          currentUser: user, 
          isAuthenticated: true 
        })
      },

      logout: () => {
        console.log('👋 Cerrando sesión')
        set({ 
          currentUser: null, 
          isAuthenticated: false 
        })
      },

      updateUserProfile: (updates) =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, ...updates }
            : null
        }))
    }),
    {
      name: 'auth-storage',
      version: 1
    }
  )
)