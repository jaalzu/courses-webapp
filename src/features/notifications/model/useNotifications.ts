import { useQuery } from "@tanstack/react-query";
// import { notificationQueries } from '@/shared/lib/supabase/queries/notifications'
import { useNotificationStore } from "./useNotificationStore";
import { notificationsApi } from "@/shared/api/notifications";

import { useEffect } from "react";
import { mapNotificationFromDb } from "./mapper";

export function useNotifications() {
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount);

  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      return await notificationsApi.getAll();
    },
    refetchInterval: 30000,
  });

  const unreadQuery = useQuery({
    queryKey: ["notifications-unread-count"],
    queryFn: async () => {
      return await notificationsApi.getUnreadCount();
    },
    refetchInterval: 30000,
  });

  // Sincronizar con Zustand
  useEffect(() => {
    if (unreadQuery.data !== undefined) {
      setUnreadCount(unreadQuery.data);
    }
  }, [unreadQuery.data, setUnreadCount]);

  return {
    notifications: query.data || [],
    unreadCount: unreadQuery.data || 0,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
