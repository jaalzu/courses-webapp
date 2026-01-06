import { TrashIcon } from '@heroicons/react/24/outline'
import { ForumPost } from '@/entities/forum-post'
import { formatDate } from '../model/forumHelpers'
import Image from 'next/image'

interface Props {
  post: ForumPost
  currentUserName: string
  isCurrentUserAdmin?: boolean
  onDeletePost: (postId: string) => void
}

export const PostHeader = ({ 
  post, 
  currentUserName, 
  isCurrentUserAdmin = false,
  onDeletePost 
}: Props) => {
  const avatar = post.userAvatar || '/avatar.webp'
  const canDelete = post.userName === currentUserName || isCurrentUserAdmin

  return (
    <div className="flex items-start gap-3 mb-6 mt-1">
      {/* AVATAR */}
      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 relative">
  <Image
    src={avatar}
    alt={post.userName}
    fill
    className="object-cover"
  />
</div>


      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h4 className="font-semibold text-lg">
              {post.userName}
            </h4>

            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(post.createdAt)}
            </span>
          </div>

          {/* Botón eliminar post */}
          {canDelete && (
            <button
              onClick={() => onDeletePost(post.id)}
              className="
                text-gray-400 hover:text-red-500 
                transition-colors
                p-2 hover:bg-red-50 dark:hover:bg-red-900/20
                rounded-lg
              "
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="rounded-lg p-3 ">
          {post.content}
        </div>
      </div>
    </div>
  )
}