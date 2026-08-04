import { notificationQueries as realNotificationQueries } from "@/shared/lib/supabase/queries/notifications";
import { notificationQueries as mockNotificationQueries } from "@/shared/mock/queries/notifications";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";
const notificationQueries = USE_MOCKS
  ? mockNotificationQueries
  : realNotificationQueries;

export const notificationsApi = {
  async getAll() {
    const { data, error } = await notificationQueries.getAll();
    if (error) throw new Error(error.message);
    return (data || []).map(mapNotificationFromDb);
  },

  async getUnreadCount() {
    const { count, error } = await notificationQueries.getUnreadCount();
    if (error) throw new Error(error.message);
    return count || 0;
  },

  async markAsRead(notificationIds: string[]) {
    const { error } = await notificationQueries.markAsRead(notificationIds);
    if (error) throw new Error(error.message);
  },

  async markAllAsRead() {
    const { error } = await notificationQueries.markAllAsRead();
    if (error) throw new Error(error.message);
  },
};

function mapNotificationFromDb(row: any) {
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
  };
}
