// model/forumFactories.ts
import { ForumPost, ForumComment } from '@/entities/forum-post'

export const createNewPost = (
  courseId: string,
  content: string,
  userId: string,
  userName: string
): ForumPost => ({
  id: crypto.randomUUID(),
  courseId,
  userId,
  userName,
  content,
  createdAt: new Date(),
  comments: []
})

export const createNewComment = (
  postId: string,
  content: string,
  userId: string,
  userName: string
): ForumComment => ({
  id: crypto.randomUUID(),
  postId,
  userId,
  userName,
  userAvatar: '/avatar.webp',
  content,
  createdAt: new Date()
})