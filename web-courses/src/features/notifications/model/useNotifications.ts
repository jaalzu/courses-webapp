import { useQuery } from '@tanstack/react-query'
import { notificationQueries } from '@/shared/lib/supabase/queries/notifications'
import { useNotificationStore } from './useNotificationStore'
import { useEffect } from 'react'
import { mapNotificationFromDb } from './mapper'


export function useNotifications() {
  const setUnreadCount = useNotificationStore((s) => s.setUnreadCount)

  const query = useQuery({
  queryKey: ['notifications'],
  queryFn: async () => {
    const { data, error } = await notificationQueries.getAll()
    if (error) throw error
    return (data || []).map(mapNotificationFromDb)
  },
  refetchInterval: 30000,
})


  const unreadQuery = useQuery({
    queryKey: ['notifications-unread-count'],
    queryFn: async () => {
      const { count, error } = await notificationQueries.getUnreadCount()
      if (error) throw error
      return count
    },
    refetchInterval: 30000,
  })

  // Sincronizar con Zustand
  useEffect(() => {
    if (unreadQuery.data !== undefined) {
      setUnreadCount(unreadQuery.data)
    }
  }, [unreadQuery.data, setUnreadCount])

  return {
    notifications: query.data || [],
    unreadCount: unreadQuery.data || 0,
    isLoading: query.isLoading,
    refetch: query.refetch,
  }
}