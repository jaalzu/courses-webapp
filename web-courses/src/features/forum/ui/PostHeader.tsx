import { ForumPost } from '@/entities/forum-post'
import { formatDate } from '../model/forumHelpers'

export const PostHeader = ({ post }: { post: ForumPost }) => (
  <div className="flex items-start gap-3 mb-6 mt-1">
    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-semibold">
      {post.userName[0].toUpperCase()}
    </div>

    <div className="flex-1">
      <div className="flex items-center gap-3 mb-5">
        <h4 className="font-semibold text-lg">{post.userName}</h4>
        <span className="text-xs bg-blue-700 px-3 py-1 rounded-full">
          {formatDate(post.createdAt)}
        </span>
      </div>

      <div className="bg-100 rounded-lg p-5 mb-5 border">
        {post.content}
      </div>
    </div>
  </div>
)
