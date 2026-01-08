import { supabase } from '../client';

export const progressQueries = {
  getUserProgress: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*, lessons(*), courses(*)')
      .eq('user_id', userId);
    
    return { data, error };
  },

  getCourseProgress: async (userId: string, courseId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*, lessons(*)')
      .eq('user_id', userId)
      .eq('course_id', courseId);
    
    return { data, error };
  },

  // ✅ FIX: Cambiar onConflict
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
        { onConflict: 'user_id,course_id,lesson_id' } // ← CAMBIO AQUÍ
      )
      .select();
    
    return { data, error };
  },

  // ✅ FIX: Cambiar onConflict
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
        { onConflict: 'user_id,course_id,lesson_id' } // ← CAMBIO AQUÍ
      )
      .select();
    
    return { data, error };
  },

  getLessonProgress: async (userId: string, lessonId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single();
    
    return { data, error };
  },

  getProgressStats: async (userId: string) => {
    const { data, error } = await supabase
      .from('course_progress_stats')
      .select('*')
      .eq('user_id', userId);
    
    return { data, error };
  },
};