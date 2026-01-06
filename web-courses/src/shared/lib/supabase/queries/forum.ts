// @/shared/lib/supabase/queries/forum.ts
import { supabase } from '../client';

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
    // Primero obtener el nombre del usuario
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
        content: content,
        is_pinned: false
      })
      .select()
      .single();

    if (error) {
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
  },

  // Eliminar post
  deletePost: async (postId: string) => {
    const { error } = await supabase
      .from('forum_posts')
      .delete()
      .eq('id', postId);

    return { error };
  },

  // Crear comentario
  createComment: async (postId: string, userId: string, content: string) => {
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
        content: content
      })
      .select()
      .single();

    if (error) {
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
  },

  // Eliminar comentario
  deleteComment: async (commentId: string) => {
    const { error } = await supabase
      .from('forum_comments')
      .delete()
      .eq('id', commentId);

    return { error };
  }
};