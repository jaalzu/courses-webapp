'use client';

// 1. React & Next.js
import { useState } from 'react';

// 2. Features & Hooks
import { useForum } from '../model/useForum';
import { PostCard } from './PostCard';

// 3. Shared & Services
import { Avatar, AvatarFallback } from "@/shared/ui/index"
import { getAvatarColor, getInitials } from "@/shared/lib/utils/avatar"
import { toast } from 'sonner'; 
import { ChatBubbleOvalLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { 
  handleSharePost as sharePostService, 
  handleShareComment as shareCommentService 
} from '../services/forumShare';


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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notify = (message: string, type: 'error' | 'success' | 'warning') => {
    toast[type](message);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await createPost(newPostContent, currentUserId, notify);
      setNewPostContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <ForumSkeleton />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-blue-100 dark:border-gray-800 shadow-sm overflow-hidden transition-all">
        
        {/* Header con estilo moderno */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none">
              <ChatBubbleOvalLeftIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                Foro de la Comunidad
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pregunta, responde y aprende junto a otros.</p>
            </div>
          </div>
        </div>

        {/* Formulario de Nueva Publicación */}
        <div className="p-6">
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div className="flex gap-4">
                <Avatar className="w-10 h-10 shrink-0 border border-gray-100 dark:border-gray-700">
    <AvatarFallback className={`${getAvatarColor(currentUserName)} text-white text-sm`}>
      {getInitials(currentUserName)}
    </AvatarFallback>
  </Avatar>
              <div className="flex-1 group">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="¿Tienes alguna duda sobre este curso?"
                  className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 resize-none min-h-[100px] text-sm focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-gray-800 outline-none border border-transparent focus:border-blue-500/50 transition-all text-gray-800 dark:text-gray-100"
                />
              </div>
            </div>
            
            <div className="flex justify-end items-center gap-3">
              <span className="text-[10px] text-gray-400 font-medium italic">
                {newPostContent.length > 0 && `${newPostContent.length} caracteres`}
              </span>
              <button
                type="submit"
                disabled={!newPostContent.trim() || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold disabled:opacity-50 transition-all shadow-md shadow-blue-200 dark:shadow-none flex items-center gap-2"
              >
                {isSubmitting ? 'Publicando...' : 'Publicar consulta'}
              </button>
            </div>
          </form>
        </div>

        {/* Listado de Posts */}
        <div className="divide-y divide-gray-50 dark:divide-gray-800 border-t border-gray-100 dark:border-gray-800">
          {posts.length === 0 ? (
            <div className="py-16 flex flex-col items-center text-center px-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-full mb-4">
                <SparklesIcon className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">Aún no hay preguntas</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mt-1">
                Sé el primero en romper el hielo. Tu duda puede ser la de muchos otros.
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserName={currentUserName}
                isCurrentUserAdmin={isCurrentUserAdmin}
                onAddComment={(postId, content) => addComment(postId, content, currentUserId, notify)}
                onDeleteComment={(postId, commentId) => deleteComment(postId, commentId, notify)}
                onDeletePost={(postId) => deletePost(postId, notify)}
                onSharePost={sharePostService}
                onShareComment={shareCommentService}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Componente Interno para Carga
const ForumSkeleton = () => (
  <div className="max-w-5xl mx-auto space-y-4 animate-pulse">
    <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl w-full" />
    <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-2xl w-full" />
    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-32 bg-gray-50 dark:bg-gray-800/50 rounded-2xl w-full" />
      ))}
    </div>
  </div>
);