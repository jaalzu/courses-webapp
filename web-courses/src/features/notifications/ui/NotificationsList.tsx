import { NotificationItem } from './NotificationItem'
import { useNotifications } from '@/features/notifications/model/useNotifications'
import { useMarkAsRead } from '@/features/notifications/model/useMarkAsRead'

export function NotificationsList() {
  const { notifications, isLoading } = useNotifications()
  const markAsRead = useMarkAsRead()

  if (isLoading) {
    return <p className="p-4 text-sm text-muted-foreground">Cargando…</p>
  }

  if (notifications.length === 0) {
    return (
      <p className="p-4 text-sm text-muted-foreground">
        No tenés notificaciones
      </p>
    )
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClick={() => {
            if (!notification.isRead) {
              markAsRead.mutate([notification.id])
            }
            // navegación futura al post
          }}
        />
      ))}
    </div>
  )
}
