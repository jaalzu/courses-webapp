import {
  ChatBubbleOvalLeftIcon,
  ShareIcon
} from '@heroicons/react/24/outline'

interface Props {
  commentsCount: number
  onToggleComments: () => void
  onShare: () => void
}

export const PostActions = ({
  commentsCount,
  onToggleComments,
  onShare
}: Props) => (
  <div className="flex items-center gap-2 relative z-10">
    <button
      onClick={onToggleComments}
      className="
        flex items-center gap-2
        text-blue-800 dark:text-blue-200
        hover:bg-blue-100/70 dark:hover:bg-blue-800/40
        px-3 py-2 rounded-xl
        transition-colors
      "
    >
      <ChatBubbleOvalLeftIcon className="w-4 h-4" />
      <span className="text-sm font-medium">
        {commentsCount === 0
          ? 'Iniciar conversación'
          : `${commentsCount} respuesta${commentsCount !== 1 ? 's' : ''}`}
      </span>
    </button>

    <button
      onClick={onShare}
      className="
       flex items-center gap-2
        text-blue-800 dark:text-blue-200
        hover:bg-blue-100/70 dark:hover:bg-blue-800/40
        px-3 py-2 rounded-xl
        transition-colors
      "
    >
      <ShareIcon className="w-5 h-5" />
      <span className="text-sm font-medium">Compartir</span>
    </button>
  </div>
)
