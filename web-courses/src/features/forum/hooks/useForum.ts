import { useState, useEffect } from 'react';
import { ForumPost, ForumComment } from '@/types/forum';
import { forumStorage } from '../lib/forumStorage';

export const useForum = (courseId: string) => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = () => {
    setLoading(true);
    const data = forumStorage.getPosts(courseId);
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
  }, [courseId]);

  const createPost = (content: string, userId: string, userName: string) => {
    const newPost: ForumPost = {
      id: `post_${Date.now()}`,
      courseId,
      userId,
      userName,
      content,
      createdAt: new Date(),
      comments: []
    };

    forumStorage.savePost(newPost);
    loadPosts();
  };

  const addComment = (postId: string, content: string, userId: string, userName: string) => {
    const newComment: ForumComment = {
      id: `comment_${Date.now()}`,
      postId,
      userId,
      userName,
      content,
      createdAt: new Date()
    };

    forumStorage.addComment(postId, newComment);
    loadPosts();
  };

  return {
    posts,
    loading,
    createPost,
    addComment
  };
};