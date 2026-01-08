'use client'

import { useState } from 'react'
import Image from 'next/image'
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
export const PostCard = (props: Props) => {
  const [showComments, setShowComments] = useState(false)
  const { post } = props

  return (
    <div className="p-6 flex gap-4 relative group">
      {/* COLUMNA DEL HILO */}
      <div className="flex flex-col items-center shrink-0">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 z-10 shadow-sm">
          <Image
            src={post.userAvatar || '/avatar.webp'}
            alt={post.userName}
            fill
            className="object-cover"
          />
        </div>
        {/* La línea solo aparece si los comentarios están abiertos */}
        {showComments && (
          <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-800 mt-2 rounded-full" />
        )}
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 min-w-0 pt-0.5">
        <PostHeader 
          post={post} 
          currentUserName={props.currentUserName}
          isCurrentUserAdmin={props.isCurrentUserAdmin}
          onDeletePost={props.onDeletePost}
        />

        <PostActions
          commentsCount={post.comments.length}
          onToggleComments={() => setShowComments(v => !v)}
          onShare={() => props.onSharePost(post)}
        />

        <CommentsSection
          post={post}
          open={showComments}
          currentUserName={props.currentUserName}
          isCurrentUserAdmin={props.isCurrentUserAdmin} 
          onAddComment={props.onAddComment}
          onDeleteComment={props.onDeleteComment}
          onShareComment={props.onShareComment}
        />
      </div>
    </div>
  )
}