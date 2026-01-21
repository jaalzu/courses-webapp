export type NotificationType = 'post_comment' | 'thread_reply' | 'direct_reply'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  postId: string
  commentId: string | null
  actorId: string
  actorName?: string
  actorAvatar?: string
  postTitle?: string
  isRead: boolean
  createdAt: string
}