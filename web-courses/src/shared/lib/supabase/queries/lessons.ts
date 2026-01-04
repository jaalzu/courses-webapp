import { supabase } from '../client';

export const lessonQueries = {
  syncLessons: async (courseId: string, lessons: any[]) => {
    // 1. Borramos las lecciones actuales del curso
    const { error: deleteError } = await supabase
      .from('lessons')
      .delete()
      .eq('course_id', courseId);

    if (deleteError) throw deleteError;

    // 2. Insertamos las lecciones actualizadas
    if (lessons.length > 0) {
      const lessonsToInsert = lessons.map((l, index) => ({
        course_id: courseId,
        title: l.title,
        // Convertimos a número porque la DB espera 'number'
        // Si el usuario puso "10:30", Number() dará NaN, así que lo protegemos
        duration: isNaN(Number(l.duration)) ? 0 : Number(l.duration),
        video_url: l.videoUrl || l.video_url || '',
        // AGREGAMOS ESTO: Es obligatorio según tu esquema de DB
        order_index: index 
      }));

      // Usamos 'as any' aquí si TS sigue molestando con el tipo del array, 
      // pero con 'order_index' ya debería reconocerlo.
      const { error } = await supabase.from('lessons').insert(lessonsToInsert as any);
      
      if (error) throw error;
    }
  }
}