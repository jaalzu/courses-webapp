import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationQueries } from '@/shared/lib/supabase/queries/notifications'
import { useNotificationStore } from './useNotificationStore'

export function useMarkAsRead() {
  const queryClient = useQueryClient()
  const decrementUnread = useNotificationStore((s) => s.decrementUnread)

  return useMutation({
    mutationFn: (notificationIds: string[]) =>
      notificationQueries.markAsRead(notificationIds),
    onSuccess: (_, notificationIds) => {
      decrementUnread(notificationIds.length)
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient()
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount)

  return useMutation({
    mutationFn: () => notificationQueries.markAllAsRead(),
    onSuccess: () => {
      setUnreadCount(0)
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}