import { supabase } from '../client';

export interface UserProgress {
  user_id: string;
  course_id: string;
  lesson_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completed_at?: string;
  updated_at: string;
  lessons?: any;
  courses?: any;
}

export interface CourseProgressStats {
  user_id: string;
  course_id: string;
  total_lessons: number;
  completed_lessons: number;
  progress_percentage: number;
}

export const progressQueries = {
  getUserProgress: async (userId: string) => {
    // Usamos (supabase as any) para evitar que TS analice el esquema completo
    const { data, error } = await (supabase as any)
      .from('user_progress')
      .select('*, lessons(*), courses(*)')
      .eq('user_id', userId);
    
    return { data: data as UserProgress[], error };
  },

  getCourseProgress: async (userId: string, courseId: string) => {
    const { data, error } = await (supabase as any)
      .from('user_progress')
      .select('*, lessons(*)')
      .eq('user_id', userId)
      .eq('course_id', courseId);
    
    return { data: data as UserProgress[], error };
  },

  updateLessonProgress: async (
    userId: string,
    courseId: string,
    lessonId: string,
    status: 'not_started' | 'in_progress' | 'completed'
  ) => {
    const { data, error } = await (supabase as any)
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
    
    return { data: data as UserProgress[], error };
  },

  markLessonComplete: async (userId: string, courseId: string, lessonId: string) => {
    const { data, error } = await (supabase as any)
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
    
    return { data: data as UserProgress[], error };
  },

  getLessonProgress: async (userId: string, lessonId: string) => {
    const { data, error } = await (supabase as any)
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('lesson_id', lessonId)
      .single();
    
    return { data: data as UserProgress, error };
  },

  getProgressStats: async (userId: string) => {
    const { data, error } = await (supabase as any)
      .from('course_progress_stats')
      .select('*')
      .eq('user_id', userId);
    
    return { data: data as CourseProgressStats[], error };
  },
};