'use client';

import { useState } from 'react';
import { useForum } from '@/hooks/useForum';
import { ChatBubbleOvalLeftIcon, ArrowRightIcon, PaperAirplaneIcon, ShareIcon } from '@heroicons/react/24/outline';

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

  const handleSharePost = (post: any) => {
    if (navigator.share) {
      navigator.share({
        title: `Publicación de ${post.userName}`,
        text: post.content,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${post.content}\n\n- ${post.userName}`);
      alert('Publicación copiada al portapapeles');
    }
  };

  const handleShareComment = (comment: any, post: any) => {
    if (navigator.share) {
      navigator.share({
        title: `Respuesta de ${comment.userName}`,
        text: `${comment.content}\n\nEn respuesta a: ${post.content.substring(0, 100)}...`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        `"${comment.content}"\n\n- ${comment.userName}\n\nEn respuesta a: ${post.content.substring(0, 100)}...`
      );
      alert('Respuesta copiada al portapapeles');
    }
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
    <div className="bg-gradient-to-br from-blue-50/80 via-white to-blue-100/40 dark:from-gray-900 dark:via-blue-950/10 dark:to-blue-900/0 rounded-2xl shadow-xl shadow-blue-500/10 dark:shadow-black/20 border border-blue-200/50 dark:border-blue-900/30 overflow-hidden max-w-4xl mx-auto backdrop-blur-sm">
      
      {/* Efecto liquid glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-transparent to-blue-100/20 dark:from-blue-900/0 dark:via-transparent dark:to-blue-700/20 pointer-events-none" />
      
      {/* Header con tema blue-700 */}
      <div className="p-8 border-b border-blue-200/30 dark:border-blue-700/30 bg-gradient-to-r from-blue-800/10 to-blue-800/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-800/20">
            <ChatBubbleOvalLeftIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Espacio de Consultas
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              Comparte tus dudas y conversemos juntos
            </p>
          </div>
        </div>
      </div>

      {/* Nueva publicación - CON TU USUARIO VISIBLE */}
      <div className="p-8 border-b border-blue-200/30 dark:border-blue-900/30 bg-white/70 dark:bg-gray-900 backdrop-blur-md relative z-10">
      
        {/* Tu usuario */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg shadow-blue-800/20">
            {currentUserName[0].toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-800 dark:text-white">
              {currentUserName}
            </div>
          </div>
        </div>

        <form onSubmit={handleCreatePost}>
          <div className="mb-6">
            <div className="bg-white/70 dark:bg-gray-800/20 rounded-3xl border-1 border-blue-300/50 dark:border-blue-700/30   transition-all duration-300 hover:border-blue-400/70 dark:hover:border-blue-700/50 focus-within:border-blue-700 dark:focus-within:border-blue-400 focus-within:shadow-lg ">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Comparte tu duda o consulta con la comunidad..."
                className="w-full bg-transparent border-0 rounded-3xl p-6 resize-none min-h-[140px] text-sm focus:outline-none focus:ring-0 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 leading-relaxed "
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newPostContent.trim()}
              className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-4 py-1.5 rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm shadow-blue-600/30 hover:shadow-blue-700/40   flex items-center gap-1.5 border border-blue-500/20 "
            >
              Publicar 
              <PaperAirplaneIcon className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Posts */}
      <div className="divide-y divide-blue-300/20 dark:divide-blue-700/20 relative z-10">
        {posts.length === 0 ? (
          <div className="text-center py-8 px-8">
            <div className="max-w-md mx-auto">
              <div className="w-18 h-18 bg-gradient-to-br from-blue-800 to-blue-700 rounded-3xl flex items-center justify-center text-white mx-auto mb-4 ">
                <ChatBubbleOvalLeftIcon className="w-8 h-8" />
              </div>
              <p className="font-bold text-gray-800 dark:text-gray-300 text-sm leading-relaxed">
                Sé el primero en iniciar una conversación. Tus preguntas pueden ayudar a otros.
              </p>
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="p-8 group relative">
              {/* Header del post */}
              <div className="flex items-start gap-3 mb-6 mt-1 relative z-10">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-semibold shadow-md shadow-blue-600/30  ">
                  {post.userName[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-800 dark:text-white text-lg">
                      {post.userName}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-blue-100/50 dark:bg-blue-900/50 px-3 py-1 rounded-full">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed whitespace-pre-wrap bg-white/70 dark:bg-gray-800/50 rounded-xl p-5 border border-blue-200/30 dark:border-blue-700/30 shadow-sm ">
                    {post.content}
                  </div>
                </div>
              </div>

              {/* Acciones con botón de compartir */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group/btn bg-blue-100/50 dark:bg-blue-900/30 px-4 py-2 rounded-xl hover:bg-blue-200/50 dark:hover:bg-blue-800/30 "
                  >
                    <ChatBubbleOvalLeftIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span className="font-medium">
                      {post.comments.length === 0
                        ? 'Iniciar conversación'
                        : `${post.comments.length} respuesta${post.comments.length !== 1 ? 's' : ''}`}
                    </span>
                  </button>

                  {/* Botón de compartir */}
                  <button
                    onClick={() => handleSharePost(post)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group/share bg-blue-100/50 dark:bg-blue-900/30 px-3 py-2 rounded-xl hover:bg-blue-200/50 dark:hover:bg-blue-800/30 "
                    title="Compartir esta publicación"
                  >
                    <ShareIcon className="w-4 h-4 group-hover/share:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Compartir</span>
                  </button>
                </div>
              </div>

              {/* Sección de comentarios */}
              {showComments[post.id] && (
                <div className="mt-6 space-y-4 relative z-10">
                  {post.comments.length > 0 && (
                    <div className="space-y-4">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-semibold shadow-md shadow-blue-500/20">
                            {comment.userName[0].toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="bg-blue-100/30 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/30 dark:border-blue-700/30 ">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="font-semibold text-gray-800 dark:text-white text-sm">
                                    {comment.userName}
                                  </div>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatDate(comment.createdAt)}
                                  </span>
                                </div>
                                
                                {/* Botón de compartir en comentario */}
                                <button
                                  onClick={() => handleShareComment(comment, post)}
                                  className="text-gray-400 hover:text-blue-500 transition-colors duration-200 p-1 rounded-lg hover:bg-blue-100/50 dark:hover:bg-blue-800/30"
                                  title="Compartir esta respuesta"
                                >
                                  <ShareIcon className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Input para comentar */}
                  <div className="flex gap-3 mt-6 pt-4 border-t border-blue-200/20 dark:border-blue-700/20">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white text-xs font-semibold shadow-md shadow-blue-600/20">
                      {currentUserName[0].toUpperCase()}
                    </div>
                    <div className="flex-1 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-blue-200/30 dark:border-blue-700/30 shadow-sm focus-within:shadow-md focus-within:border-blue-400/50 dark:focus-within:border-blue-500/50 transition-all duration-300 ">
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                        }
                        placeholder="Agrega tu respuesta..."
                        className="w-full bg-transparent border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-0 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleAddComment(post.id)
                          }
                        }}
                      />
                    </div>
                    <button
                      onClick={() => handleAddComment(post.id)}
                      disabled={!commentInputs[post.id]?.trim()}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-700/40 transform hover:scale-105 flex items-center gap-1 border border-blue-500/20 "
                    >
                      <ArrowRightIcon className="w-4 h-4" />
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