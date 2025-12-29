// @/shared/supabase/queries/cursos.ts
import { supabase } from '../client';

export const courseQueries = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*, lessons(*)')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  // Cambiado de string a number
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*, lessons(*)')
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  create: async (course: any) => {
    const { data, error } = await supabase
      .from('courses')
      .insert(course)
      .select()
      .single();
    
    return { data, error };
  },

  // Cambiado a number
  update: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  // Cambiado a number
  delete: async (id: string) => {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    return { error };
  },

  search: async (query: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    
    return { data, error };
  }
};