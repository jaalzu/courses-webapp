import { supabase } from '../client';

export const lessonQueries = {
  syncLessons: async (courseId: string, lessons: any[]) => {
    const { error: deleteError } = await supabase
      .from('lessons')
      .delete()
      .eq('course_id', courseId);
    
    if (deleteError) throw deleteError;

    if (lessons.length > 0) {
      const lessonsToInsert = lessons.map((l, index) => ({
        course_id: courseId,
        title: l.title,
        duration: String(l.duration || '0'), 
        video_url: l.videoUrl || l.video_url || '',
        order_index: index 
      }));

      const { data, error } = await supabase
        .from('lessons')
        .insert(lessonsToInsert as any)
        .select();
      
      if (error) throw error;

      const formattedLessons = (data || []).map(l => ({
        ...l,
        duration: String(l.duration || '0'),
        videoUrl: l.video_url || ''
      }));

      return { data: formattedLessons, error: null };
    }
    
    return { data: [], error: null };
  },

  // ✅ Nuevo método para borrar todas las lecciones de un curso
  deleteByCourseId: async (courseId: string) => {
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('course_id', courseId);

    return { error };
  }
}
