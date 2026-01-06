// @/features/forum/model/useForum.ts
import { useState, useEffect } from 'react';
import { ForumPost } from '@/entities/forum-post';
import { forumQueries } from '@/shared/lib/supabase/queries/forum'; 

export const useForum = (courseId: string) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar posts al montar
  useEffect(() => {
    loadPosts();
  }, [courseId]);

  const loadPosts = async () => {
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
  };

  const createPost = async (content: string, userId: string) => {
    try {
      const { data, error } = await forumQueries.createPost(
        courseId,
        userId,
        content
      );
      
      if (error) throw error;
      if (data) {
        setPosts([data, ...posts]);
      }
    } catch (error) {
      console.error('Error creando post:', error);
      alert('Error al crear publicación');
    }
  };

  const addComment = async (postId: string, content: string, userId: string) => {
    try {
      const { data, error } = await forumQueries.createComment(
        postId,
        userId,
        content
      );

      if (error) throw error;
      if (data) {
        setPosts(posts.map(p =>
          p.id === postId
            ? { ...p, comments: [...p.comments, data] }
            : p
        ));
      }
    } catch (error) {
      console.error('Error agregando comentario:', error);
      alert('Error al agregar comentario');
    }
  };

  const deleteComment = async (postId: string, commentId: string) => {
    try {
      const { error } = await forumQueries.deleteComment(commentId);
      if (error) throw error;

      setPosts(posts.map(p =>
        p.id === postId
          ? { ...p, comments: p.comments.filter(c => c.id !== commentId) }
          : p
      ));
    } catch (error) {
      console.error('Error eliminando comentario:', error);
      alert('Error al eliminar comentario');
    }
  };

  const deletePost = async (postId: string) => {
    try {
      const { error } = await forumQueries.deletePost(postId);
      if (error) throw error;

      setPosts(posts.filter(p => p.id !== postId));
    } catch (error) {
      console.error('Error eliminando post:', error);
      alert('Error al eliminar publicación');
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