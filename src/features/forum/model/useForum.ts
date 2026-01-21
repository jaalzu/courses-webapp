import { useState, useEffect, useCallback } from 'react';
import { ForumPost } from '@/entities/forum-post';
import { forumQueries } from '@/shared/lib/supabase/queries/forum';
import { rateLimiter, RATE_LIMITS } from '@/shared/lib/utils/rateLimiter';
import { useAdminDemo } from "@/shared/hooks/useAdminDemo";

type NotifyFn = (message: string, type: 'error' | 'success' | 'warning') => void;

export const useForum = (courseId: string) => {
  const { runIfAllowed } = useAdminDemo(); 
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
    runIfAllowed(async () => {
      const rateLimitKey = `forum-post:${userId}`;
      const check = rateLimiter.canProceed(rateLimitKey, RATE_LIMITS.FORUM_POST);

      if (!check.allowed) {
        notify?.(check.message || 'Límite de publicaciones alcanzado', 'warning');
        return;
      }

      try {
        const { data, error } = await forumQueries.createPost(courseId, userId, content);
        
        if (error || !data) {
          notify?.(error?.message || 'Error al crear publicación', 'error');
          return;
        }
        
        setPosts(prevPosts => [data, ...prevPosts]);
        notify?.('Publicación creada exitosamente', 'success');
        
      } catch (error: any) {
        notify?.('Error inesperado al crear publicación', 'error');
      }
    });
  };

  const addComment = async (postId: string, content: string, userId: string, notify?: NotifyFn) => {
    runIfAllowed(async () => {
      const rateLimitKey = `forum-comment:${userId}`;
      const check = rateLimiter.canProceed(rateLimitKey, RATE_LIMITS.FORUM_COMMENT);

      if (!check.allowed) {
        notify?.(check.message || 'Espera un momento antes de comentar de nuevo', 'warning');
        return;
      }

      try {
        const { data, error } = await forumQueries.createComment(postId, userId, content);

        if (error || !data) {
          notify?.(error?.message || 'Error al agregar comentario', 'error');
          return;
        }

        setPosts(prevPosts => prevPosts.map(p =>
          p.id === postId
            ? { ...p, comments: [...p.comments, data] }
            : p
        ));
        
      } catch (error: any) {
        notify?.('Error inesperado al agregar comentario', 'error');
      }
    });
  };

  const deleteComment = async (postId: string, commentId: string, notify?: NotifyFn) => {
    runIfAllowed(async () => {
      try {
        const { error } = await forumQueries.deleteComment(commentId);
        
        if (error) {
          notify?.(error.message || 'Error al eliminar comentario', 'error');
          return;
        }

        setPosts(prevPosts => prevPosts.map(p =>
          p.id === postId
            ? { ...p, comments: p.comments.filter(c => c.id !== commentId) }
            : p
        ));
        notify?.('Comentario eliminado', 'success');
        
      } catch (error: any) {
        notify?.('Error inesperado al eliminar comentario', 'error');
      }
    });
  };

  const deletePost = async (postId: string, notify?: NotifyFn) => {
    runIfAllowed(async () => {
      try {
        const { error } = await forumQueries.deletePost(postId);
        
        if (error) {
          notify?.(error.message || 'Error al eliminar publicación', 'error');
          return;
        }

        setPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
        notify?.('Publicación eliminada', 'success');
        
      } catch (error: any) {
        notify?.('Error inesperado al eliminar publicación', 'error');
      }
    });
  };

  return { posts, loading, createPost, addComment, deleteComment, deletePost };
};