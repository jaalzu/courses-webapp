// features/forum/ui/PostCard.tsx
'use client'

import { useState } from 'react'
import { ForumPost, ForumComment } from '@/entities/forum-post'
import { PostHeader } from './PostHeader'
import { PostActions } from './PostActions'
import { CommentsSection } from './CommentsSection'

interface Props {
  post: ForumPost
  currentUserName: string
  isCurrentUserAdmin?: boolean 
  onAddComment: (postId: string, content: string) => void
  onDeleteComment: (postId: string, commentId: string) => void
  onDeletePost: (postId: string) => void 
  onSharePost: (post: ForumPost) => void
  onShareComment: (comment: ForumComment, post: ForumPost) => void
}

export const PostCard = ({
  post,
  currentUserName,
  isCurrentUserAdmin = false, 
  onAddComment,
  onDeleteComment,
  onDeletePost,
  onSharePost,
  onShareComment
}: Props) => {
  const [showComments, setShowComments] = useState(false)

  return (
    <div className="p-8 group relative">
      <PostHeader 
        post={post} 
        currentUserName={currentUserName}
        isCurrentUserAdmin={isCurrentUserAdmin}
        onDeletePost={onDeletePost}
      />

      <PostActions
        commentsCount={post.comments.length}
        onToggleComments={() => setShowComments(v => !v)}
        onShare={() => onSharePost(post)}
      />

      <CommentsSection
        post={post}
        open={showComments}
        currentUserName={currentUserName}
        isCurrentUserAdmin={isCurrentUserAdmin} 
        onAddComment={onAddComment}
        onDeleteComment={onDeleteComment}
        onShareComment={onShareComment}
      />
    </div>
  )
}