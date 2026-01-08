'use client'

import { TrashIcon } from '@heroicons/react/24/outline'
import { ForumPost } from '@/entities/forum-post'
import { formatDate } from '../model/forumHelpers'

interface Props {
  post: ForumPost
  currentUserName: string
  isCurrentUserAdmin?: boolean
  onDeletePost: (postId: string) => void
}

export const PostHeader = ({ post, currentUserName, isCurrentUserAdmin, onDeletePost }: Props) => {
  const canDelete = post.userName === currentUserName || isCurrentUserAdmin

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-gray-900 dark:text-white">
            {post.userName}
          </h4>
          <span className="text-[11px] text-gray-500">
            {formatDate(post.createdAt)}
          </span>
        </div>

        {canDelete && (
          <button
            onClick={() => onDeletePost(post.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  )
}