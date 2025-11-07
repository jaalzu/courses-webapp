'use client';

import { useState } from 'react';
import { ChatBubbleOvalLeftIcon, ArrowRightIcon, ShareIcon } from '@heroicons/react/24/outline';
import { formatDate, handleSharePost, handleShareComment } from '../utils/forumHelpers';

interface Comment {
  id: string;
  content: string;
  userName: string;
  createdAt: Date;
}

interface Post {
  id: string;
  content: string;
  userName: string;
  createdAt: Date;
  comments: Comment[];
}

interface Props {
  post: Post;
  currentUserId: string;
  currentUserName: string;
  onAddComment: (postId: string, content: string) => void;
}

export const PostCard = ({ post, currentUserName, onAddComment }: Props) => {
  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = () => {
    if (commentInput.trim()) {
      onAddComment(post.id, commentInput);
      setCommentInput('');
    }
  };

  return (
    <div className="p-8 group relative">
      {/* Header del post */}
      <div className="flex items-start gap-3 mb-6 mt-1 relative z-10">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-semibold shadow-md shadow-blue-600/30">
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
          <div className="text-gray-700 dark:text-gray-300 text-base leading-relaxed whitespace-pre-wrap bg-white/70 dark:bg-gray-800/50 rounded-xl p-5 border border-blue-200/30 dark:border-blue-700/30 shadow-sm">
            {post.content}
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group/btn bg-blue-100/50 dark:bg-blue-900/30 px-4 py-2 rounded-xl hover:bg-blue-200/50 dark:hover:bg-blue-800/30"
          >
            <ChatBubbleOvalLeftIcon className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            <span className="font-medium">
              {post.comments.length === 0
                ? 'Iniciar conversación'
                : `${post.comments.length} respuesta${post.comments.length !== 1 ? 's' : ''}`}
            </span>
          </button>

          <button
            onClick={() => handleSharePost(post)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 group/share bg-blue-100/50 dark:bg-blue-900/30 px-3 py-2 rounded-xl hover:bg-blue-200/50 dark:hover:bg-blue-800/30"
            title="Compartir esta publicación"
          >
            <ShareIcon className="w-4 h-4 group-hover/share:scale-110 transition-transform" />
            <span className="text-sm font-medium">Compartir</span>
          </button>
        </div>
      </div>

      {/* Sección de comentarios */}
      {showComments && (
        <div className="mt-6 space-y-4 relative z-10">
          {post.comments.length > 0 && (
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-semibold shadow-md shadow-blue-500/20">
                    {comment.userName[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-blue-100/30 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200/30 dark:border-blue-700/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-gray-800 dark:text-white text-sm">
                            {comment.userName}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        
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
            <div className="flex-1 bg-white/70 dark:bg-gray-800/50 rounded-xl border border-blue-200/30 dark:border-blue-700/30 shadow-sm focus-within:shadow-md focus-within:border-blue-400/50 dark:focus-within:border-blue-500/50 transition-all duration-300">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Agrega tu respuesta..."
                className="w-full bg-transparent border-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-0 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
              />
            </div>
            <button
              onClick={handleSubmitComment}
              disabled={!commentInput.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-700/40 transform hover:scale-105 flex items-center gap-1 border border-blue-500/20"
            >
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};