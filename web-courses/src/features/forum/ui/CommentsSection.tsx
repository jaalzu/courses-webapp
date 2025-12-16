'use client'

import { useState } from 'react'
import { ArrowRightIcon, ShareIcon } from '@heroicons/react/24/outline'
import { ForumPost, ForumComment } from '@/entities/forum-post'
import { formatDate } from '../model/forumHelpers'

interface Props {
  post: ForumPost
  currentUserName: string
  onAddComment: (postId: string, content: string) => void
  onShareComment: (comment: ForumComment, post: ForumPost) => void
  open: boolean
}

export const CommentsSection = ({
  post,
  currentUserName,
  onAddComment,
  onShareComment,
  open
}: Props) => {
  const [input, setInput] = useState('')

  const submit = () => {
    if (!input.trim()) return
    onAddComment(post.id, input)
    setInput('')
  }

  if (!open) return null

  return (
    <div className="mt-6 space-y-4 relative z-10">
      {post.comments.map((comment) => (
        <div key={comment.id} className="flex gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded-lg text-white flex items-center justify-center text-xs font-semibold">
            {comment.userName[0].toUpperCase()}
          </div>

          <div
  className="
     flex-1
    bg-white dark:bg-gray-800
    text-gray-800 dark:text-gray-100
    border border-blue-200/30 dark:border-blue-700/30
    rounded-xl p-4
    shadow-sm
  "
>
            <div className="flex justify-between mb-2">
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-sm">
                  {comment.userName}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(comment.createdAt)}
                </span>
              </div>

              <button
                onClick={() => onShareComment(comment, post)}
                className="text-gray-400 hover:text-blue-500"
              >
                <ShareIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-sm">{comment.content}</p>
          </div>
        </div>
      ))}

      {/* Input */}
      <div className="flex gap-3 border-t pt-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg text-white flex items-center justify-center text-xs font-semibold">
          {currentUserName[0].toUpperCase()}
        </div>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Agrega tu respuesta..."
          className="
  flex-1
  bg-white dark:bg-gray-900
  text-gray-800 dark:text-white
  border border-blue-200/40
  rounded-xl px-4 py-3 text-sm
  focus:outline-none focus:ring-2 focus:ring-blue-500/40
"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              submit()
            }
          }}
        />

        <button
          onClick={submit}
          disabled={!input.trim()}
          className="bg-blue-700 text-white p-3 rounded-xl disabled:opacity-40"
        >
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
