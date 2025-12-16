import { ForumPost, ForumComment } from '@/entities/forum-post/index';

const STORAGE_KEY = 'course_forum_posts';

//  Helpers privados
const isServer = () => typeof window === 'undefined';

const getAllPosts = (): ForumPost[] => {
  if (isServer()) return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const savePosts = (posts: ForumPost[]): void => {
  if (isServer()) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
};

//  API pública
export const forumStorage = {
  getPosts: (courseId: string): ForumPost[] => {
    const allPosts = getAllPosts();
    return allPosts
      .filter(p => p.courseId === courseId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  savePost: (post: ForumPost): void => {
    const posts = getAllPosts();
    posts.push(post);
    savePosts(posts);
  },

  addComment: (postId: string, comment: ForumComment): void => {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.comments.push(comment);
      savePosts(posts);
    }
  },

  deleteComment: (postId: string, commentId: string): void => {
    const posts = getAllPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
      post.comments = post.comments.filter(c => c.id !== commentId);
      savePosts(posts);
    }
  },

  deletePost: (postId: string): void => {
    const posts = getAllPosts();
    const filteredPosts = posts.filter(p => p.id !== postId);
    savePosts(filteredPosts);
  }
};