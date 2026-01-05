import { supabase } from '../client';


export const lessonQueries = {
  syncLessons: async (courseId: string, lessons: any[]) => {
    // 1. PRIMERO: Eliminar todas las lecciones existentes del curso
    const { error: deleteError } = await supabase
      .from('lessons')
      .delete()
      .eq('course_id', courseId);
    
    if (deleteError) throw deleteError;

    // 2. SEGUNDO: Si hay lecciones nuevas, insertarlas
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
        duration: String(l.duration || '0'),
        videoUrl: l.video_url || ''
      }));

      return { data: formattedLessons, error: null };
    }
    
    // Si no hay lecciones nuevas, retornamos array vacío
    return { data: [], error: null };
  }
}