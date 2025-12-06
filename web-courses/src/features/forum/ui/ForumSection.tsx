'use client';

import { useState } from 'react';
import { useForum } from '../model/useForum';
import { ChatBubbleOvalLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { PostCard } from './PostCard';

interface Props {
  courseId: string;
  currentUserId: string;
  currentUserName: string;
}

export const ForumSection = ({ courseId, currentUserId, currentUserName }: Props) => {
  const { posts, loading, createPost, addComment } = useForum(courseId);
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      createPost(newPostContent, currentUserId, currentUserName);
      setNewPostContent('');
    }
  };

  const handleAddComment = (postId: string, content: string) => {
    addComment(postId, content, currentUserId, currentUserName);
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
      
      {/* Header */}
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

      {/* Nueva publicación */}
      <div className="p-8 border-b border-blue-200/30 dark:border-blue-900/30 bg-white/70 dark:bg-gray-900 backdrop-blur-md relative z-10">
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
            <div className="bg-white/70 dark:bg-gray-800/20 rounded-3xl border-1 border-blue-300/50 dark:border-blue-700/30 transition-all duration-300 hover:border-blue-400/70 dark:hover:border-blue-700/50 focus-within:border-blue-700 dark:focus-within:border-blue-400 focus-within:shadow-lg">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Comparte tu duda o consulta con la comunidad..."
                className="w-full bg-transparent border-0 rounded-3xl p-6 resize-none min-h-[140px] text-sm focus:outline-none focus:ring-0 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 leading-relaxed"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newPostContent.trim()}
              className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-4 py-1.5 rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm shadow-blue-600/30 hover:shadow-blue-700/40 flex items-center gap-1.5 border border-blue-500/20"
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
              <div className="w-18 h-18 bg-gradient-to-br from-blue-800 to-blue-700 rounded-3xl flex items-center justify-center text-white mx-auto mb-4">
                <ChatBubbleOvalLeftIcon className="w-8 h-8" />
              </div>
              <p className="font-bold text-gray-800 dark:text-gray-300 text-sm leading-relaxed">
                Sé el primero en iniciar una conversación. Tus preguntas pueden ayudar a otros.
              </p>
            </div>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUserId={currentUserId}
              currentUserName={currentUserName}
              onAddComment={handleAddComment}
            />
          ))
        )}
      </div>
    </div>
  );
};