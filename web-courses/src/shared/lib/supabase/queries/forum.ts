import { supabase } from '../client';

// Validación de contenido para posts y comentarios
const validateContent = (content: string): { valid: boolean; error?: string } => {
  const trimmed = content.trim()
  
  if (trimmed.length < 3) {
    return { valid: false, error: 'El contenido debe tener al menos 3 caracteres' }
  }
  
  if (trimmed.length > 5000) {
    return { valid: false, error: 'El contenido no puede tener más de 5000 caracteres' }
  }
  
  // Verificar que tenga al menos algún carácter alfanumérico
  if (!/[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/.test(trimmed)) {
    return { valid: false, error: 'El contenido debe tener texto válido' }
  }
  
  return { valid: true }
}

export const forumQueries = {
  // Obtener posts de un curso con datos de usuario
  getPosts: async (courseId: string) => {
    const { data, error } = await supabase
      .from('forum_posts')
      .select(`
        *,
        profiles!inner(id, name, avatar_url),
        comments:forum_comments(
          *,
          profiles!inner(id, name, avatar_url)
        )
      `)
      .eq('course_id', courseId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error en getPosts:', error);
      return { data: null, error };
    }

    // Formatear datos de DB a frontend
    const formatted = (data || []).map((post: any) => ({
      id: post.id,
      courseId: post.course_id,
      userId: post.user_id,
      userName: post.profiles?.name || post.title || 'Usuario',
      userAvatar: post.profiles?.avatar_url || '/avatar.webp',
      content: post.content,
      createdAt: post.created_at,
      comments: (post.comments || []).map((comment: any) => ({
        id: comment.id,
        postId: comment.post_id,
        userId: comment.user_id,
        userName: comment.profiles?.name || 'Usuario',
        userAvatar: comment.profiles?.avatar_url || '/avatar.webp',
        content: comment.content,
        createdAt: comment.created_at
      }))
    }));

    return { data: formatted, error: null };
  },

  // Crear post
  createPost: async (courseId: string, userId: string, content: string) => {
    // Validar contenido antes de continuar
    const validation = validateContent(content)
    if (!validation.valid) {
      return { 
        data: null, 
        error: { message: validation.error } as any 
      }
    }

    try {
      // Obtener el nombre del usuario
      const { data: profile } = await supabase
        .from('profiles')
        .select('name, avatar_url')
        .eq('id', userId)
        .single();

      const userName = profile?.name || 'Usuario';

      const { data, error } = await supabase
        .from('forum_posts')
        .insert({
          course_id: courseId,
          user_id: userId,
          title: userName,
          content: content.trim(), // Siempre trimear
          is_pinned: false
        })
        .select()
        .single();

      if (error) {
        // Detectar si es un error de rate limit
        if (error.message?.includes('violates row-level security policy')) {
          return { 
            data: null, 
            error: { message: 'Has alcanzado el límite de publicaciones. Espera unos minutos.' } as any
          }
        }
        console.error('Error en createPost:', error);
        return { data: null, error };
      }

      return {
        data: {
          id: data.id,
          courseId: data.course_id,
          userId: data.user_id,
          userName: userName,
          userAvatar: profile?.avatar_url || '/avatar.webp',
          content: data.content,
          createdAt: data.created_at,
          comments: []
        },
        error: null
      };
    } catch (err: any) {
      console.error('Error en createPost:', err);
      return { data: null, error: err };
    }
  },

  // Eliminar post
  deletePost: async (postId: string) => {
    const { error } = await supabase
      .from('forum_posts')
      .delete()
      .eq('id', postId);

    if (error && error.message?.includes('violates row-level security policy')) {
      return { 
        error: { message: 'No tienes permisos para eliminar esta publicación' } as any
      }
    }

    return { error };
  },

  // Crear comentario
  createComment: async (postId: string, userId: string, content: string) => {
    // Validar contenido antes de continuar
    const validation = validateContent(content)
    if (!validation.valid) {
      return { 
        data: null, 
        error: { message: validation.error } as any 
      }
    }

    try {
      // Obtener nombre del usuario
      const { data: profile } = await supabase
        .from('profiles')
        .select('name, avatar_url')
        .eq('id', userId)
        .single();

      const userName = profile?.name || 'Usuario';

      const { data, error } = await supabase
        .from('forum_comments')
        .insert({
          post_id: postId,
          user_id: userId,
          content: content.trim() // Siempre trimear
        })
        .select()
        .single();

      if (error) {
        // Detectar si es un error de rate limit
        if (error.message?.includes('violates row-level security policy')) {
          return { 
            data: null, 
            error: { message: 'Has alcanzado el límite de comentarios. Espera un momento.' } as any
          }
        }
        console.error('Error en createComment:', error);
        return { data: null, error };
      }

      return {
        data: {
          id: data.id,
          postId: data.post_id,
          userId: data.user_id,
          userName: userName,
          userAvatar: profile?.avatar_url || '/avatar.webp',
          content: data.content,
          createdAt: data.created_at
        },
        error: null
      };
    } catch (err: any) {
      console.error('Error en createComment:', err);
      return { data: null, error: err };
    }
  },

  deleteComment: async (commentId: string) => {
    const { error } = await supabase
      .from('forum_comments')
      .delete()
      .eq('id', commentId);

    if (error && error.message?.includes('violates row-level security policy')) {
      return { 
        error: { message: 'No tienes permisos para eliminar este comentario' } as any
      }
    }

    return { error };
  }
};

export { validateContent };