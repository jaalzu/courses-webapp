import { authQueries as realAuthQueries } from "@/shared/lib/supabase/queries/auth";
import { authQueries as mockAuthQueries } from "@/shared/mock/queries/auth";
import { profileQueries as realProfileQueries } from "@/shared/lib/supabase/queries/profiles";
import { profileQueries as mockProfileQueries } from "@/shared/mock/queries/profiles";
import { mapProfileToUser, mapUserToProfileUpdate } from "./profileMapper";
import { supabase } from "@/shared/lib/supabase/client";
import type { User } from "@/entities/user/model/types";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";
const authQueries = USE_MOCKS ? mockAuthQueries : realAuthQueries;
const profileQueries = USE_MOCKS ? mockProfileQueries : realProfileQueries;

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

  /**
   * Iniciar sesión
   */
  signIn: async (email: string, password: string) => {
    const { data: authData, error: authError } = await authQueries.signIn(
      email,
      password,
    );
    if (authError) throw authError;
    if (!authData.user) throw new Error("No user returned from auth");

    await new Promise((resolve) => setTimeout(resolve, 100));

    const { data: profile, error: profileError } = await profileQueries.getById(
      authData.user.id,
    );
    if (profileError) throw profileError;
    if (!profile) throw new Error("Profile not found");

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
    const { data, error } = await profileQueries.update(
      userId,
      supabaseUpdates,
    );
    if (error) throw error;

    if (!USE_MOCKS) {
      const { error: authError } = await supabase.auth.updateUser({
        data: { name: updates.name },
      });

      if (authError)
        console.error("Error actualizando sesión:", authError.message);
    }

    return mapProfileToUser(data);
  },

  /**
   * Iniciar sesión con Google OAuth
   * En modo mock: auto-logea como admin con label "Mock Mode"
   * En modo real: redirige a Google OAuth
   */
  signInWithGoogle: async () => {
    if (USE_MOCKS) {
      // En modo mock, logea automático al admin
      const { data, error } = await mockAuthQueries.signInWithGoogle();
      if (error) throw error;
      return data;
    }

    // En modo real, redirige a Google
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) throw error;
    return data;
  },
};
