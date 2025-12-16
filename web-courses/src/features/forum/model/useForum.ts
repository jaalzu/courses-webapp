'use client'

import { useEffect, useState } from 'react'
import { ForumPost } from '@/entities/forum-post'
import { forumStorage } from '../api/forumStorage'
import { createNewPost, createNewComment } from './forumFactories'

export const useForum = (courseId: string) => {
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const data = forumStorage.getPosts(courseId)
    const safeData = structuredClone(data)
    setPosts(safeData)
    setLoading(false)
  }, [courseId])

  const createPost = (
    content: string,
    userId: string,
    userName: string
  ) => {
    const newPost = createNewPost(courseId, content, userId, userName)
    forumStorage.savePost(newPost)
    setPosts(prev => [newPost, ...prev])
  }

  const addComment = (
    postId: string,
    content: string,
    userId: string,
    userName: string
  ) => {
    const newComment = createNewComment(postId, content, userId, userName)
    forumStorage.addComment(postId, newComment)

    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    )
  }

  const deleteComment = (postId: string, commentId: string) => {
    forumStorage.deleteComment(postId, commentId)

    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, comments: post.comments.filter(c => c.id !== commentId) }
          : post
      )
    )
  }

  const deletePost = (postId: string) => {
    forumStorage.deletePost(postId)
    setPosts(prev => prev.filter(post => post.id !== postId))
  }

  return {
    posts,
    loading,
    createPost,
    addComment,
    deleteComment,
    deletePost
  }
}