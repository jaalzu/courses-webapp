import { NotificationItem } from './NotificationItem'
import { useNotifications } from '@/features/notifications/model/useNotifications'
import { useMarkAsRead } from '@/features/notifications/model/useMarkAsRead'

export function NotificationsList() {
  const { notifications, isLoading } = useNotifications()
  const markAsRead = useMarkAsRead()

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-gray-500">Cargando notificaciones...</p>
      </div>
    )
  }

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-gray-500">No tenés notificaciones</p>
      </div>
    )
  }

  return (
    <div className="max-h-[400px] overflow-y-auto">
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={() => {
              if (!notification.isRead) {
                markAsRead.mutate([notification.id])
              }
            }}
          />
        ))}
      </div>
    </div>
  )
}