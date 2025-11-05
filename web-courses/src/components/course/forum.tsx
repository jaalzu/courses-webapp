// components/course/Forum.tsx
'use client'

import { useState } from 'react'
import { useForum } from '@/hooks/useForum'
import type { ForumThread } from '@/types/forum'
import { v4 as uuid } from 'uuid'

interface Props {
  courseId: number
  user: string
}

export default function Forum({ courseId, user }: Props) {
  const { threads, addThread, addReply } = useForum(courseId)
  const [newThreadTitle, setNewThreadTitle] = useState('')
  const [newReply, setNewReply] = useState<{[key: string]: string}>({})

  const handleAddThread = () => {
    if (!newThreadTitle.trim()) return
    addThread({
      id: uuid(),
      title: newThreadTitle,
      author: user,
      createdAt: new Date().toISOString(),
      replies: []
    })
    setNewThreadTitle('')
  }

  const handleAddReply = (threadId: string) => {
    const content = newReply[threadId]?.trim()
    if (!content) return
    addReply(threadId, {
      id: uuid(),
      content,
      author: user,
      createdAt: new Date().toISOString()
    })
    setNewReply(prev => ({ ...prev, [threadId]: '' }))
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          value={newThreadTitle}
          onChange={e => setNewThreadTitle(e.target.value)}
          placeholder="Nueva pregunta"
          className="flex-1 border rounded px-2 py-1"
        />
        <button onClick={handleAddThread} className="bg-blue-600 text-white px-4 py-1 rounded">
          Crear
        </button>
      </div>

      {threads.map(thread => (
        <div key={thread.id} className="border rounded p-3 space-y-2">
          <div className="font-semibold">{thread.title} <span className="text-sm text-gray-500">por {thread.author}</span></div>
          <div className="space-y-1 pl-2">
            {thread.replies.map(reply => (
              <div key={reply.id} className="text-sm">
                <span className="font-medium">{reply.author}:</span> {reply.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input
              value={newReply[thread.id] || ''}
              onChange={e => setNewReply(prev => ({ ...prev, [thread.id]: e.target.value }))}
              placeholder="Responder..."
              className="flex-1 border rounded px-2 py-1 text-sm"
            />
            <button
              onClick={() => handleAddReply(thread.id)}
              className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm"
            >
              Responder
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
