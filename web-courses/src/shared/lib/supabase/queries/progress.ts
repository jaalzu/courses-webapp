import { supabase } from '../client';

export const progressQueries = {
  // Obtener progreso del usuario
  getUserProgress: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*, lessons(*), courses(*)')
      .eq('user_id', userId);
    
    return { data, error };
  },

  // Obtener progreso de un curso específico
  getCourseProgress: async (userId: string, courseId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*, lessons(*)')
      .eq('user_id', userId)
      .eq('course_id', courseId);
    
    return { data, error };
  },

  // Actualizar progreso de una lección (NECESITA course_id)
  updateLessonProgress: async (
    userId: string,
    courseId: string,
    lessonId: string,
    status: 'not_started' | 'in_progress' | 'completed'
  ) => {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert(
        {
          user_id: userId,
          course_id: courseId,
          lesson_id: lessonId,
          status,
          updated_at: new Date().toISOString(),
        }, 
        { onConflict: 'user_id,lesson_id' } 
      )
      .select();
    
    return { data, error };
  },

  // Marcar lección como completada (NECESITA course_id)
  markLessonComplete: async (userId: string, courseId: string, lessonId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert(
        {
          user_id: userId,
          course_id: courseId,
          lesson_id: lessonId,
          status: 'completed',
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,lesson_id' } 
      )
      .select();
    
    return { data, error };
  },

  // Obtener progreso de una lección específica
  getLessonProgress: async (userId: string, lessonId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single();
    
    return { data, error };
  },

  // Obtener estadísticas de progreso
  getProgressStats: async (userId: string) => {
    const { data, error } = await supabase
      .from('course_progress_stats')
      .select('*')
      .eq('user_id', userId);
    
    return { data, error };
  },
};