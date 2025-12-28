import { supabase } from '../client';

export const profileQueries = {
  // Obtener perfil por ID
  getById: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    return { data, error };
  },

  // Crear perfil (por si acaso, aunque el trigger lo hace automático)
  create: async (profile: {
    id: string;
    email: string;
    name?: string;
  }) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();
    
    return { data, error };
  },

  // Actualizar perfil
  update: async (userId: string, updates: {
    name?: string;
    avatar_url?: string;
    role?: string;
    bio?: string;
  }) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    return { data, error };
  },

  // Buscar perfiles (para después, si necesitás)
  search: async (query: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`name.ilike.%${query}%,email.ilike.%${query}%`);
    
    return { data, error };
  },
};