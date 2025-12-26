import { supabase } from '../client';

export const favoriteQueries = {
  // Obtener favoritos del usuario
  getUserFavorites: async (userId: string) => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*, courses(*)')
      .eq('user_id', userId);
    
    return { data, error };
  },

  // Agregar a favoritos
  addFavorite: async (userId: string, courseId: string) => {
    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        course_id: courseId,
      })
      .select();
    
    return { data, error };
  },

  // Remover de favoritos
  removeFavorite: async (userId: string, courseId: string) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('course_id', courseId);
    
    return { error };
  },

  // Chequear si un curso está en favoritos
  isFavorite: async (userId: string, courseId: string) => {
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();
    
    return { isFavorite: !!data, error };
  },
};