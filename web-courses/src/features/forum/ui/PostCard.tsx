'use client'

import { useState } from 'react'
import { ForumPost, ForumComment } from '@/entities/forum-post'

import { PostHeader } from './PostHeader'
import { PostActions } from './PostActions'
import { CommentsSection } from './CommentsSection'

interface Props {
  post: ForumPost
  currentUserName: string
  onAddComment: (postId: string, content: string) => void
  onSharePost: (post: ForumPost) => void
  onShareComment: (comment: ForumComment, post: ForumPost) => void
}

export const PostCard = ({
  post,
  currentUserName,
  onAddComment,
  onSharePost,
  onShareComment
}: Props) => {
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="p-8 group relative">
      {/* Header */}
      <PostHeader post={post} />

      {/* Acciones */}
      <PostActions
        commentsCount={post.comments.length}
        onToggleComments={() => setShowComments(v => !v)}
        onShare={() => onSharePost(post)}
      />

      {/* Comentarios */}
      <CommentsSection
        post={post}
        open={showComments}
        currentUserName={currentUserName}
        onAddComment={onAddComment}
        onShareComment={onShareComment}
      />
    </div>
  )
}
