import { useNotificationStore } from '../model/useNotificationStore'

export function NotificationBadge() {
  const unreadCount = useNotificationStore((s) => s.unreadCount)

  if (unreadCount === 0) return null

  return (
    <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-medium text-white">
      {unreadCount > 99 ? '99+' : unreadCount}
    </span>
  )
}
