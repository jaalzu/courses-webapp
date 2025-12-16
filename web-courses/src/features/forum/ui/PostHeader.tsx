import { ForumPost } from '@/entities/forum-post'
import { formatDate } from '../model/forumHelpers'

export const PostHeader = ({ post }: { post: ForumPost }) => {
  const avatar = post.userAvatar || '/avatar.png'

  return (
    <div className="flex items-start gap-3 mb-6 mt-1">
      {/* AVATAR */}
      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
        <img
          src={avatar}
          alt={post.userName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="font-semibold text-lg">
            {post.userName}
          </h4>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(post.createdAt)}
          </span>
        </div>

        <div className="rounded-lg p-3 ">
          {post.content}
        </div>
      </div>
    </div>
  )
}
