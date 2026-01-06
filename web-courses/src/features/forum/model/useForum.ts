// @/features/forum/model/useForum.ts
import { useState, useEffect, useCallback } from 'react';
import { ForumPost } from '@/entities/forum-post';
import { forumQueries } from '@/shared/lib/supabase/queries/forum';
import { rateLimiter, RATE_LIMITS } from '@/shared/lib/utils/rateLimiter';

type NotifyFn = (message: string, type: 'error' | 'success' | 'warning') => void;

export const useForum = (courseId: string) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await forumQueries.getPosts(courseId);
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error cargando posts:', error);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const createPost = async (content: string, userId: string, notify?: NotifyFn) => {
    // Rate limiting
    const rateLimitKey = `forum-post:${userId}`;
    const { allowed, retryAfter } = rateLimiter.canProceed(rateLimitKey, RATE_LIMITS.FORUM_POST);

    if (!allowed) {
      notify?.(`Por favor espera ${retryAfter} segundos antes de publicar de nuevo`, 'warning');
      return;
    }

    try {
      const { data, error } = await forumQueries.createPost(
        courseId,
        userId,
        content
      );
      
      if (error) {
        console.error('Error desde forumQueries.createPost:', error);
        notify?.(error.message || 'Error al crear publicación', 'error');
        return;
      }
      
      if (!data) {
        console.error('No se recibió data de createPost');
        notify?.('No se pudo crear la publicación', 'error');
        return;
      }
      
      setPosts([data, ...posts]);
      notify?.('Publicación creada exitosamente', 'success');
      
    } catch (error: any) {
      console.error('Error en createPost (catch):', error);
      notify?.('Error inesperado al crear publicación', 'error');
    }
  };

  const addComment = async (postId: string, content: string, userId: string, notify?: NotifyFn) => {
    // Rate limiting
    const rateLimitKey = `forum-comment:${userId}`;
    const { allowed, retryAfter } = rateLimiter.canProceed(rateLimitKey, RATE_LIMITS.FORUM_COMMENT);

    if (!allowed) {
      notify?.(`Por favor espera ${retryAfter} segundos antes de comentar de nuevo`, 'warning');
      return;
    }

    try {
      const { data, error } = await forumQueries.createComment(
        postId,
        userId,
        content
      );

      if (error) {
        console.error('Error desde forumQueries.createComment:', error);
        notify?.(error.message || 'Error al agregar comentario', 'error');
        return;
      }

      if (!data) {
        console.error('No se recibió data de createComment');
        notify?.('No se pudo crear el comentario', 'error');
        return;
      }

      setPosts(posts.map(p =>
        p.id === postId
          ? { ...p, comments: [...p.comments, data] }
          : p
      ));
      
    } catch (error: any) {
      console.error('Error en addComment (catch):', error);
      notify?.('Error inesperado al agregar comentario', 'error');
    }
  };

  const deleteComment = async (postId: string, commentId: string, notify?: NotifyFn) => {
    try {
      const { error } = await forumQueries.deleteComment(commentId);
      
      if (error) {
        console.error('Error desde forumQueries.deleteComment:', error);
        notify?.(error.message || 'Error al eliminar comentario', 'error');
        return;
      }

      setPosts(posts.map(p =>
        p.id === postId
          ? { ...p, comments: p.comments.filter(c => c.id !== commentId) }
          : p
      ));
      notify?.('Comentario eliminado', 'success');
      
    } catch (error: any) {
      console.error('Error en deleteComment (catch):', error);
      notify?.('Error inesperado al eliminar comentario', 'error');
    }
  };

  const deletePost = async (postId: string, notify?: NotifyFn) => {
    try {
      const { error } = await forumQueries.deletePost(postId);
      
      if (error) {
        console.error('Error desde forumQueries.deletePost:', error);
        notify?.(error.message || 'Error al eliminar publicación', 'error');
        return;
      }

      setPosts(posts.filter(p => p.id !== postId));
      notify?.('Publicación eliminada', 'success');
      
    } catch (error: any) {
      console.error('Error en deletePost (catch):', error);
      notify?.('Error inesperado al eliminar publicación', 'error');
    }
  };

  return {
    posts,
    loading,
    createPost,
    addComment,
    deleteComment,
    deletePost
  };
};