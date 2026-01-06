import { supabase } from '../client';
import { getCourseImage } from '../storage';

// Helper para formatear cursos
const formatCourse = (dbCourse: any) => ({
  ...dbCourse,
  image: dbCourse.thumbnail_url ? getCourseImage(dbCourse.thumbnail_url) : '',
  level: dbCourse.difficulty || 'beginner',
  keyPoints: dbCourse.key_points || [], // ✅ Este sí
  lessons: (dbCourse.lessons || []).map((l: any) => ({
    ...l,
    duration: String(l.duration || '0'),
    videoUrl: l.video_url || ''
  }))
});

export const courseQueries = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*, lessons(*)')
      .order('created_at', { ascending: true });
  
    if (error) return { data: null, error };
    
    const formatted = (data || []).map(formatCourse);
    return { data: formatted, error: null };
  },

  getById: async (id: string) => {
    const { data, error } = await supabase
      .from('courses')
      .select('*, lessons(*)')
      .eq('id', id)
      .single();
    
    if (error) return { data: null, error };
    
    return { data: formatCourse(data), error: null };
  },



  create: async (course: any) => {
  // Mapear de frontend a DB antes de insertar
  const dbCourse = {
    title: course.title,
    description: course.description,
    thumbnail_url: course.image || null,
    duration: course.duration || null,
    instructor: course.instructor || null,
    difficulty: course.level,
    key_points: course.keyPoints || [],
  }

  const { data, error } = await supabase
    .from('courses')
    .insert(dbCourse) // Insertar el objeto mapeado
    .select()
    .single();
  
  if (error) return { data: null, error };
  
  return { data: formatCourse(data), error: null };
},


  update: async (id: string, updates: any) => {
    const { data, error } = await supabase
      .from('courses')
      .update(updates) 
      .eq('id', id)
      .select()
       .maybeSingle(); // Cambiá .single() por .maybeSingle()
  
  if (error) return { data: null, error };
  if (!data) return { data: null, error: { message: 'Curso no encontrado' } };
  
  return { data: formatCourse(data), error: null };
  },

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
    
    if (error) return { data: null, error };
    
    const formatted = (data || []).map(formatCourse);
    return { data: formatted, error: null };
  }
};