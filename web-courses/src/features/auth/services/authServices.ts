import { authQueries } from '@/shared/lib/supabase/queries/auth';
import { profileQueries } from '@/shared/lib/supabase/queries/profiles';
import { mapProfileToUser, mapUserToProfileUpdate } from './profileMapper';
import { supabase } from '@/shared/lib/supabase/client';
import type { User } from '@/entities/user/model/types';

export const authService = {
  /**
   * Registrar nuevo usuario
   */
  signUp: async (email: string, password: string, name: string) => {
    const { data, error } = await authQueries.signUp(email, password, {
      name,
    });

    if (error) throw error;
    return data;
  },

  
 signIn: async (email: string, password: string) => {
    const { data: authData, error: authError } = await authQueries.signIn(email, password);
    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned from auth');

    await new Promise(resolve => setTimeout(resolve, 100));

    const { data: profile, error: profileError } = await profileQueries.getById(authData.user.id);
    if (profileError) throw profileError;
    if (!profile) throw new Error('Profile not found');

    return {
      session: authData.session,
      user: mapProfileToUser(profile),
    };
  },

  /**
   * Cerrar sesión
   */
  signOut: async () => {
    const { error } = await authQueries.signOut();
    if (error) throw error;
  },

  /**
   * Obtener usuario actual
   */
  getCurrentUser: async (): Promise<User | null> => {
    const { data: authData } = await authQueries.getCurrentUser();
    if (!authData) return null;

    const { data: profile, error } = await profileQueries.getById(authData.id);
    if (error || !profile) return null;

    return mapProfileToUser(profile);
  },

  /**
   * Actualizar perfil del usuario
   */

updateProfile: async (userId: string, updates: Partial<User>) => {
  const supabaseUpdates = mapUserToProfileUpdate(updates);
  const { data, error } = await profileQueries.update(userId, supabaseUpdates);
  if (error) throw error;

  const { error: authError } = await supabase.auth.updateUser({
    data: { name: updates.name }
  });

  if (authError) console.error("Error actualizando sesión:", authError.message);

  return mapProfileToUser(data);
},

  /**
   * Iniciar sesión con Google OAuth
   */
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