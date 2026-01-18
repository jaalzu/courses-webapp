import { Notification } from '@/features/notifications/model/types'
import { useRouter } from 'next/navigation'
import { supabase } from '@/shared/lib/supabase/client'
import clsx from 'clsx'
import { formatTimeAgo } from '@/shared/lib/utils/formatTime'

interface Props {
  notification: Notification
  onMarkAsRead: () => void
}

export function NotificationItem({ notification, onMarkAsRead }: Props) {
  const router = useRouter()
  const { actorName, postId, type, isRead, createdAt } = notification

  const messageMap: Record<string, string> = {
    post_comment: 'comentó en tu publicación',
    thread_reply: 'también comentó en una publicación',
    direct_reply: 'respondió a tu comentario',
  }

  const handleClick = async () => {
    try {
      // Buscar el courseId del post
      const { data: post } = await supabase
        .from('forum_posts')
        .select('course_id')
        .eq('id', postId)
        .single()

      if (post?.course_id) {
        onMarkAsRead()
        router.push(`/curso/${post.course_id}#forum`)
      }
    } catch (error) {
      console.error('Error navegando al post:', error)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-gray-100 dark:hover:bg-gray-800',
        !isRead && 'bg-blue-50 dark:bg-blue-950/20'
      )}
    >
      {!isRead && (
        <div className="mt-2 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
      )}

      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {actorName}
          </span>{' '}
          <span className="text-gray-600 dark:text-gray-400">
            {messageMap[type]}
          </span>
        </p>

        <time className="text-xs text-gray-500">
          {formatTimeAgo(createdAt)}
        </time>
      </div>
    </button>
  )
}