export interface ForumPost {
  id: string
  courseId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  createdAt: Date
  comments: ForumComment[]
}

export interface ForumComment {
  id: string
  postId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  createdAt: Date
}