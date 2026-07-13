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
    return data || [];
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
