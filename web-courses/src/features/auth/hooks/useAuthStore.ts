import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/entities/user/model/types';
import { authService } from '@/shared/services/authServices';

interface AuthStore {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setCurrentUser: (user: User) => void;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      isLoading: false,

      setCurrentUser: (user) => {
        console.log('✅ Usuario establecido:', user);
        set({
          currentUser: user,
          isAuthenticated: true,
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
          console.error(' Error en login:', error.message);
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
          console.error(' Error en registro:', error.message);
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
          // El redirect se maneja automáticamente
        } catch (error: any) {
          console.error(' Error en login con Google:', error.message);
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      // Logout
      logout: async () => {
        try {
          console.log(' Cerrando sesión');
          await authService.signOut();
          set({
            currentUser: null,
            isAuthenticated: false,
          });
        } catch (error: any) {
          console.error(' Error en logout:', error.message);
          throw error;
        }
      },

      // Actualizar perfil
      updateUserProfile: async (updates: Partial<User>) => {
        try {
          const { currentUser } = get();
          if (!currentUser) return;

          const updatedUser = await authService.updateProfile(currentUser.id, updates);
          
          set({
            currentUser: updatedUser,
          });
        } catch (error: any) {
          console.error('❌ Error actualizando perfil:', error.message);
          throw error;
        }
      },

      // Verificar autenticación al cargar la app
      checkAuth: async () => {
        try {
          set({ isLoading: true });
          const user = await authService.getCurrentUser();
          
          if (user) {
            set({
              currentUser: user,
              isAuthenticated: true,
            });
          } else {
            set({
              currentUser: null,
              isAuthenticated: false,
            });
          }
        } catch (error) {
          console.error(' Error verificando auth:', error);
          set({
            currentUser: null,
            isAuthenticated: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      version: 2, // Incrementamos la versión
      // Solo persistimos cosas básicas
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
