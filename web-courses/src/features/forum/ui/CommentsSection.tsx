'use client'

import { useState } from 'react'
import { ArrowRightIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ForumPost, ForumComment } from '@/entities/forum-post'
import { formatDate } from '../model/forumHelpers'
import Image from 'next/image'

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
    <div className="mt-4 pb-4">
      {/* Listado de Comentarios */}
      <div className="space-y-1">
        {post.comments.map((comment) => {
          const canDelete = comment.userName === currentUserName || isCurrentUserAdmin

          return (
            <div key={comment.id} className="relative group">
              {/* LA LÍNEA REDDIT: Se muestra a la izquierda del contenido */}
              <div className="flex gap-3 px-4">
                
                {/* Columna de la izquierda: Avatar + Línea de seguimiento */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 relative z-10 border-2 border-white dark:border-gray-900">
                    <Image
                      src={comment.userAvatar || '/avatar.webp'}
                      alt={comment.userName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Esta es la línea vertical de trackeo */}
                  <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-800 group-hover:bg-blue-500/50 transition-colors" />
                </div>

                {/* Contenido del comentario */}
                <div className="flex-1 pb-6">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-xs hover:underline cursor-pointer">
                        {comment.userName}
                      </span>
                      <span className="text-[10px] text-gray-500">
                        • {formatDate(comment.createdAt)}
                      </span>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {canDelete && (
                        <button
                          onClick={() => onDeleteComment(post.id, comment.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <TrashIcon className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => onShareComment(comment, post)}
                        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <ShareIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                    {comment.content}
                  </p>
                  
                  {/* Botón de respuesta rápido (Estético para que parezca Reddit) */}
                  <button className="text-[11px] font-bold text-gray-500 mt-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded">
                    Responder
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input de respuesta: Ahora más integrado */}
      <div className="flex gap-3 px-4 mt-2 ml-11">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="¿Qué piensas?"
          className="
            flex-1
            bg-gray-100 dark:bg-gray-800/50
            text-gray-800 dark:text-white
            border border-transparent
            focus:border-blue-500/50
            rounded-full px-4 py-2 text-sm
            focus:outline-none 
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-full disabled:opacity-40 transition-all"
        >
          <span className="text-xs font-bold uppercase tracking-wider">Publicar</span>
        </button>
      </div>
    </div>
  )
}