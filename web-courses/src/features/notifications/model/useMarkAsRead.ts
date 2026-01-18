import { useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationQueries } from '@/shared/lib/supabase/queries/notifications'

export function useMarkAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (notificationIds: string[]) =>
      notificationQueries.markAsRead(notificationIds),
    onSuccess: () => {
      //  Invalidar queries para refetch inmediato
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] })
    },
  })
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => notificationQueries.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['notifications-unread-count'] })
    },
  })
}