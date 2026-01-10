'use client'

import { useState } from 'react'
import { ArrowRightIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ForumPost, ForumComment } from '@/entities/forum-post'
import { formatDate } from '../model/forumHelpers'
import { Avatar, AvatarFallback } from "@/shared/ui/index"
import { getAvatarColor, getInitials } from "@/shared/lib/utils/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip"

interface Props {
  post: ForumPost
  currentUserName: string
  isCurrentUserAdmin?: boolean
  onAddComment: (postId: string, content: string) => void
  onShareComment: (comment: ForumComment, post: ForumPost) => void
  onDeleteComment: (postId: string, commentId: string) => void
  open: boolean
}

export const CommentsSection = ({
  post,
  currentUserName,
  isCurrentUserAdmin = false, 
  onAddComment,
  onShareComment,
  onDeleteComment,
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
    <div className="mt-4 space-y-2">
      {post.comments.map((comment, index) => {
        const canDelete = comment.userName === currentUserName || isCurrentUserAdmin
        const isLast = index === post.comments.length - 1

        return (
          <div key={comment.id} className="flex gap-4 group/comment relative">
            
            <div className="flex flex-col items-center shrink-0 w-10">
              <div className="w-0.5 h-4 bg-gray-200 dark:bg-gray-800" />
              
              <Avatar className="w-8 h-8 border-1 border-white dark:border-gray-900 z-10 shadow-sm shrink-0">
                <AvatarFallback className={`${getAvatarColor(comment.userName)} text-white text-xs`}>
                  {getInitials(comment.userName)}
                </AvatarFallback>
              </Avatar>

              {!isLast && (
                <div className="w-0.5 flex-1 bg-gray-200 dark:bg-gray-800" />
              )}
            </div>

            <div className="flex-1 min-w-0 pb-4">
              <div className="bg-gray-50 dark:bg-gray-800/40 rounded-2xl p-3 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 transition-all">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-900 dark:text-gray-100">
                      {comment.userName}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>

                  <TooltipProvider>
                    <div className="flex gap-2 opacity-0 group-hover/comment:opacity-100 transition-opacity">
                      {canDelete && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button onClick={() => onDeleteComment(post.id, comment.id)} className="p-1 text-gray-400 hover:text-red-500">
                              <TrashIcon className="w-3.5 h-3.5" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Eliminar comentario</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button onClick={() => onShareComment(comment, post)} className="p-1 text-gray-400 hover:text-blue-500">
                            <ShareIcon className="w-3.5 h-3.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Compartir comentario</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          </div>
        )
      })}

      {/* INPUT DE RESPUESTA */}
      <div className="flex gap-4 items-start pt-2">
        <div className="flex flex-col items-center shrink-0 w-10">
          <div className="w-0.5 h-4 bg-gray-200 dark:bg-gray-800" />
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shadow-sm z-10 shrink-0">
             <span className="text-[10px] font-bold text-white">Tú</span>
          </div>
        </div>

        <div className="flex-1 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Escribe una respuesta..."
            className="flex-1 bg-white dark:bg-gray-900 text-sm border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white"
          />
          <button
            onClick={submit}
            disabled={!input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl disabled:opacity-30 transition-all shadow-sm"
          >
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}