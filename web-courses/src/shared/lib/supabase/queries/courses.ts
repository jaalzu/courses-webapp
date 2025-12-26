import { supabase } from '../client';

export const courseQueries = {
  // Obtener todos los cursos
  getAll: async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  // Obtener curso por ID
  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  // Buscar cursos
  search: async (query: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    
    return { data, error };
  },

  // Filtrar por dificultad
  getByDifficulty: async (difficulty: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('difficulty', difficulty);
    
    return { data, error };
  },
};