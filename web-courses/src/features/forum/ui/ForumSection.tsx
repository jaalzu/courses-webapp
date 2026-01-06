// features/forum/ui/ForumSection.tsx
'use client';

import { useState } from 'react';
import { useForum } from '../model/useForum';
import { toast } from 'sonner'; 
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import { ForumPost, ForumComment } from '@/entities/forum-post'
import Image from 'next/image'
import { PostCard } from './PostCard';
import {
  handleSharePost as sharePostService,
  handleShareComment as shareCommentService
} from '../services/forumShare'

interface Props {
  courseId: string;
  currentUserId: string;
  currentUserName: string;
  isCurrentUserAdmin?: boolean;
}

export const ForumSection = ({ 
  courseId, 
  currentUserId, 
  currentUserName,
  isCurrentUserAdmin = false
}: Props) => {
  const { posts, loading, createPost, addComment, deleteComment, deletePost } = useForum(courseId);
  const [newPostContent, setNewPostContent] = useState('');

  // ⭐ Función para mostrar notificaciones con Sonner
  const notify = (message: string, type: 'error' | 'success' | 'warning') => {
    switch (type) {
      case 'error':
        toast.error(message);
        break;
      case 'success':
        toast.success(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPostContent.trim()) {
      createPost(newPostContent, currentUserId, notify);
      setNewPostContent('');
    }
  };

  const handleAddComment = (postId: string, content: string) => {
    addComment(postId, content, currentUserId, notify);
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    deleteComment(postId, commentId, notify);
  };

  const handleDeletePost = (postId: string) => {
    deletePost(postId, notify);
  };

  const sharePost = (post: ForumPost) => {
    sharePostService(post)
  }

  const shareComment = (comment: ForumComment, post: ForumPost) => {
    shareCommentService(comment, post)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-sm text-gray-500 dark:text-gray-400">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-900 rounded-2xl border border-blue-200/40 dark:border-blue-900/30 overflow-hidden max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="p-8 border-b border-blue-200/30 dark:border-white-100/10 bg-gradient-to-r from-blue-800/10 to-blue-800/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center text-black dark:text-white">
            <ChatBubbleOvalLeftIcon className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Deposita tus dudas o consultas!
            </h2>
          </div>
        </div>
      </div>

      {/* Nueva publicación */}
      <div className="p-6 border-b border-blue-200/30 dark:border-white-300/10 bg-white/70 dark:bg-gray-900 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
            <Image
              src="/avatar.webp"
              alt={currentUserName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-gray-800 dark:text-white">
              {currentUserName}
            </div>
          </div>
        </div>

        <form onSubmit={handleCreatePost}>
          <div className="mb-6">
            <div className="bg-white/70 dark:bg-gray-900 rounded-2xl border-1 border-dark-300 dark:border-white-200 transition-all duration-300">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Comparte tu duda o consulta con la comunidad..."
                className="w-full bg-transparent rounded-3xl p-5 resize-none min-h-[120px] text-sm focus:outline-none text-gray-800 dark:text-white placeholder-gray-400 leading-relaxed"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newPostContent.trim()}
              className="bg-blue-700 hover:from-blue-800 hover:to-blue-900 text-white px-4 py-1.5 rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-sm flex items-center gap-1.5 border border-blue-500/20"
            >
              Comentar 
            </button>
          </div>
        </form>
      </div>

      {/* Posts */}
      <div className="divide-y divide-blue-300/20 dark:divide-blue-700/20 relative z-10 text-gray-800 dark:text-gray-100">
        {posts.length === 0 ? (
          <div className="text-center py-8 px-8">
            <div className="max-w-md mx-auto">
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
              currentUserName={currentUserName}
              isCurrentUserAdmin={isCurrentUserAdmin}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
              onDeletePost={handleDeletePost}
              onSharePost={sharePost}
              onShareComment={shareComment}
            />
          ))
        )}
      </div>
    </div>
  );
};