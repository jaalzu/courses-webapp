'use client'

import { useEffect, useState } from 'react'
import { ForumPost, ForumComment } from '@/entities/forum-post'
import { forumStorage } from '../api/forumStorage'

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


  // CREATE POST
  const createPost = (
    content: string,
    userId: string,
    userName: string
  ) => {
    const newPost: ForumPost = {
      id: crypto.randomUUID(),
      courseId,
      userId,
      userName,
      content,
      createdAt: new Date(),
      comments: []
    }

    forumStorage.savePost(newPost)

    setPosts(prev => [newPost, ...prev])
  }

  // ADD COMMENT
  const addComment = (
    postId: string,
    content: string,
    userId: string,
    userName: string
  ) => {
    const newComment: ForumComment = {
      id: crypto.randomUUID(),
      postId,
      userId,
      userName,
      content,
      createdAt: new Date()
    }

    forumStorage.addComment(postId, newComment)

    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, newComment] 
            }
          : post
      )
    )
  }

  return {
    posts,
    loading,
    createPost,
    addComment
  }
}
