import { Notification } from './types'

export function mapNotificationFromDb(row: any): Notification {
  return {
    id: row.id,
    userId: row.user_id,
    postId: row.post_id,
    commentId: row.comment_id,
    actorId: row.actor_id,

    type: row.type,
    isRead: row.is_read,
    createdAt: row.created_at,

    actorName: row.actor?.name,
    actorAvatar: row.actor?.avatar_url,
    postTitle: row.post?.title,
  }
}
