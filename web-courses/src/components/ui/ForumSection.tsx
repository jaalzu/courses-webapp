'use client';

import { useState } from 'react';
import { useForum } from '@/hooks/useForum';
import { ChatBubbleOvalLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Props {
  courseId: string;
  currentUserId: string;
  currentUserName: string;
}

export const ForumSection = ({ courseId, currentUserId, currentUserName }: Props) => {
  const { posts, loading, createPost, addComment } = useForum(courseId);
  const [newPostContent, setNewPostContent] = useState('');
  const [commentInputs, setCommentInputs] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      createPost(newPostContent, currentUserId, currentUserName);
      setNewPostContent('');
    }
  };

  const handleAddComment = (postId: string) => {
    const content = commentInputs[postId];
    if (content?.trim()) {
      addComment(postId, content, currentUserId, currentUserName);
      setCommentInputs({ ...commentInputs, [postId]: '' });
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments({ ...showComments, [postId]: !showComments[postId] });
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Justo ahora';
    if (minutes < 60) return `Hace ${minutes}m`;
    if (hours < 24) return `Hace ${hours}h`;
    if (days < 7) return `Hace ${days}d`;
    return d.toLocaleDateString('es-ES');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-sm text-gray-500 dark:text-gray-400">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-400 overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-400">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Deposita tus dudas o consultas aqui!
        </h2>
      </div>

      {/* Nueva publicación */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-400">
        <form onSubmit={handleCreatePost}>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder={`Sientete libre de preguntar ${currentUserName}`}
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-400 rounded-lg p-4 resize-none min-h-[150px] text-sm focus:outline-none focus:ring-1 focus:ring-green-500  transition-colors"
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={!newPostContent.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>

      {/* Posts */}
      <div className="divide-y divide-gray-100 dark:divide-gray-400">
        {posts.length === 0 ? (
          <div className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
            No hay publicaciones aún. ¡Sé el primero en compartir algo!
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              {/* Header del post */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                  {post.userName[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {post.userName}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <div className="text-gray-800 dark:text-gray-200 text-sm mt-2 whitespace-pre-wrap">
                    {post.content}
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                  <span>
                    {post.comments.length === 0
                      ? 'Comentar'
                      : `${post.comments.length} comentario${post.comments.length !== 1 ? 's' : ''}`}
                  </span>
                </button>
              </div>

              {/* Sección de comentarios */}
              {showComments[post.id] && (
                <div className="mt-4 space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                        {comment.userName[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-medium text-gray-900 dark:text-white text-xs">
                              {comment.userName}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-800 dark:text-gray-200 text-sm">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Input para nuevo comentario */}
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                      }
                      placeholder="Escribe un comentario..."
                      className="flex-1 border border-gray-200 dark:border-gray-400 rounded-full px-4 py-2 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleAddComment(post.id)
                        }
                      }}
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      disabled={!commentInputs[post.id]?.trim()}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                    >
                      <ArrowRightIcon  className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};