'use client'

import { useEffect } from 'react'
import { useMarkAsRead } from '@/features/notifications/model/useMarkAsRead'
import { useNotifications } from '@/features/notifications/model/useNotifications'

interface Props {
  postId: string
}

export function MarkAsReadOnView({ postId }: Props) {
  const { notifications } = useNotifications()
  const markAsRead = useMarkAsRead()

  useEffect(() => {
    const unreadFromThisPost = notifications
      .filter(n => n.postId === postId && !n.isRead)
      .map(n => n.id)

    if (unreadFromThisPost.length > 0) {
      markAsRead.mutate(unreadFromThisPost)
    }
  }, [postId, notifications, markAsRead])

  return null // No renderiza nada
}