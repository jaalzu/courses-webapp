import { Notification } from '@/features/notifications/model/types'
import clsx from 'clsx'

interface Props {
  notification: Notification
  onClick?: () => void
}

export function NotificationItem({ notification, onClick }: Props) {
  const {
    actorName,
    actorAvatar,
    postTitle,
    type,
    isRead,
    createdAt,
  } = notification

  const messageMap: Record<string, string> = {
    post_comment: 'comentó tu publicación',
    thread_reply: 'respondió en un hilo donde participaste',
    direct_reply: 'respondió tu comentario',
  }

  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-muted',
        !isRead && 'bg-muted/50'
      )}
    >
      <img
        src={actorAvatar || '/avatar-placeholder.png'}
        alt={actorName}
        className="h-8 w-8 rounded-full"
      />

      <div className="flex flex-col gap-1 text-sm">
        <p>
          <span className="font-medium">{actorName}</span>{' '}
          {messageMap[type]}
        </p>

        {postTitle && (
          <p className="text-xs text-muted-foreground">
            “{postTitle}”
          </p>
        )}

        <time className="text-xs text-muted-foreground">
          {new Date(createdAt).toLocaleString()}
        </time>
      </div>
    </button>
  )
}
