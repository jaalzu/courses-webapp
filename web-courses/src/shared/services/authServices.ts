import { supabase } from '@/shared/lib/supabase/client';
import { authQueries } from '@/shared/lib/supabase/queries/auth';
import type { User } from '@/entities/user/model/types';

export const authService = {
  // Registrar nuevo usuario
  signUp: async (email: string, password: string, name: string) => {
    const { data, error } = await authQueries.signUp(email, password, {
      name,
    });

    if (error) throw error;

    return data;
  },

  // Iniciar sesión
  signIn: async (email: string, password: string) => {
    const { data, error } = await authQueries.signIn(email, password);

    if (error) throw error;

    // Obtener el perfil del usuario desde la tabla profiles
    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      return {
        session: data.session,
        user: profile ? mapProfileToUser(profile) : null,
      };
    }

    return { session: data.session, user: null };
  },

  // Cerrar sesión
  signOut: async () => {
    const { error } = await authQueries.signOut();
    if (error) throw error;
  },

  // Obtener usuario actual
  getCurrentUser: async (): Promise<User | null> => {
    const { data } = await authQueries.getCurrentUser();
    
    if (!data) return null;

    // Obtener perfil completo
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.id)
      .single();

    if (!profile) return null;

    return mapProfileToUser(profile);
  },

  // Actualizar perfil
  updateProfile: async (userId: string, updates: Partial<User>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        name: updates.name,
        avatar_url: updates.avatar,
        role: updates.role,
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return mapProfileToUser(data);
  },

  // Iniciar sesión con Google
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  },
};

// Helper para mapear el perfil de Supabase a tipo User
function mapProfileToUser(profile: any): User {
  return {
    id: profile.id,
    name: profile.name || '',
    email: profile.email,
    role: profile.role as 'student' | 'admin',
    avatar: profile.avatar_url || undefined,
    createdAt: new Date(profile.created_at),
    assignedCourses: [], // Por ahora vacío
  };
}