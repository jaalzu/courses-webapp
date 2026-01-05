import { supabase } from '../client';


export const lessonQueries = {
  syncLessons: async (courseId: string, lessons: any[]) => {
    // ... (parte del delete igual) ...

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

      // Mapeamos los campos de la DB al formato de tu interfaz Lesson
      const formattedLessons = (data || []).map(l => ({
        ...l,
        duration: String(l.duration || '0'), // Forzamos String aquí
        videoUrl: l.video_url || ''
      }));

      return { data: formattedLessons, error: null };
    }
    return { data: [], error: null };
  }
}