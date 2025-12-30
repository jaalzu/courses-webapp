import { create } from 'zustand';
import type { User } from '@/entities/user/model/types';
import { authService } from '@/shared/services/authServices';

interface AuthStore {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setCurrentUser: (user: User | null) => void; // Ahora acepta null para cerrar sesión
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<User> & { name?: string }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  currentUser: null,
  isAuthenticated: false,
  isLoading: false,

  setCurrentUser: (user) => {
    set({
      currentUser: user,
      isAuthenticated: !!user,
    });
  },

  // Login con email/password
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      const { user } = await authService.signIn(email, password);
      if (user) {
        set({
          currentUser: user,
          isAuthenticated: true,
        });
      }
    } catch (error: any) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Registrar nuevo usuario
  register: async (email: string, password: string, name: string) => {
    try {
      set({ isLoading: true });
      await authService.signUp(email, password, name);
      // Después del registro, hacer login automático
      await get().login(email, password);
    } catch (error: any) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Login con Google
  loginWithGoogle: async () => {
    try {
      set({ isLoading: true });
      await authService.signInWithGoogle();
    } catch (error: any) {
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout
  logout: async () => {
    try {
      await authService.signOut();
      set({
        currentUser: null,
        isAuthenticated: false,
      });
    } catch (error: any) {
      throw error;
    }
  },

  updateUserProfile: async (updates) => {
    try {
      const { currentUser } = get();
      if (!currentUser) return;

      const updatedUser = await authService.updateProfile(currentUser.id, updates);
      
      set({
        currentUser: updatedUser,
      });
    } catch (error: any) {
      console.error("Error en store:", error);
      throw error;
    }
  },

  // Verificar autenticación al cargar la app
  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const user = await authService.getCurrentUser();
      
      set({
        currentUser: user,
        isAuthenticated: !!user,
      });
    } catch (error) {
      set({
        currentUser: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));