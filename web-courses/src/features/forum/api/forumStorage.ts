import { ForumPost, ForumComment } from '@/entities/forum-post/index';

const STORAGE_KEY = 'course_forum_posts';

export const forumStorage = {
  getPosts: (courseId: string): ForumPost[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const allPosts: ForumPost[] = JSON.parse(data);
    return allPosts
      .filter(p => p.courseId === courseId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  savePost: (post: ForumPost): void => {
    if (typeof window === 'undefined') return;
    const data = localStorage.getItem(STORAGE_KEY);
    const posts: ForumPost[] = data ? JSON.parse(data) : [];
    posts.push(post);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  },

  addComment: (postId: string, comment: ForumComment): void => {
    if (typeof window === 'undefined') return;
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    const posts: ForumPost[] = JSON.parse(data);
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.comments.push(comment);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }
  },

  deleteComment: (postId: string, commentId: string): void => {
    if (typeof window === 'undefined') return;
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    const posts: ForumPost[] = JSON.parse(data);
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.comments = post.comments.filter(c => c.id !== commentId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }
  },
  deletePost: (postId: string): void => {
  if (typeof window === 'undefined') return;
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;
  const posts: ForumPost[] = JSON.parse(data);
  const filteredPosts = posts.filter(p => p.id !== postId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
}
};