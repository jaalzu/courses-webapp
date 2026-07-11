import { delay, generateId, getMockStore, mutateMockStore } from '../store'

const validateContent = (content: string): { valid: boolean; error?: string } => {
  const trimmed = content.trim()

  if (trimmed.length < 3) {
    return { valid: false, error: 'El contenido debe tener al menos 3 caracteres' }
  }
  if (trimmed.length > 5000) {
    return { valid: false, error: 'El contenido no puede tener más de 5000 caracteres' }
  }
  if (!/[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/.test(trimmed)) {
    return { valid: false, error: 'El contenido debe tener texto válido' }
  }

  return { valid: true }
}

function getProfile(userId: string) {
  return getMockStore().profiles.find((p) => p.id === userId)
}

export const forumQueries = {
  getPosts: async (courseId: string) => {
    await delay()
    const store = getMockStore()
    const posts = store.forumPosts
      .filter((p) => p.course_id === courseId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    const formatted = posts.map((post) => {
      const profile = getProfile(post.user_id)
      const comments = store.forumComments
        .filter((c) => c.post_id === post.id)
        .map((comment) => {
          const commentProfile = getProfile(comment.user_id)
          return {
            id: comment.id,
            postId: comment.post_id,
            userId: comment.user_id,
            userName: commentProfile?.name || 'Usuario',
            userAvatar: commentProfile?.avatar_url || '/avatar.webp',
            content: comment.content,
            createdAt: comment.created_at,
          }
        })

      return {
        id: post.id,
        courseId: post.course_id,
        userId: post.user_id,
        userName: profile?.name || post.title || 'Usuario',
        userAvatar: profile?.avatar_url || '/avatar.webp',
        content: post.content,
        createdAt: post.created_at,
        comments,
      }
    })

    return { data: formatted, error: null }
  },

  createPost: async (courseId: string, userId: string, content: string) => {
    const validation = validateContent(content)
    if (!validation.valid) {
      return { data: null, error: { message: validation.error } }
    }

    await delay()
    const profile = getProfile(userId)
    const userName = profile?.name || 'Usuario'
    const id = generateId('post')
    const created_at = new Date().toISOString()

    mutateMockStore((s) => {
      s.forumPosts.push({
        id,
        course_id: courseId,
        user_id: userId,
        title: userName,
        content: content.trim(),
        is_pinned: false,
        created_at,
      })
    })

    return {
      data: {
        id,
        courseId,
        userId,
        userName,
        userAvatar: profile?.avatar_url || '/avatar.webp',
        content: content.trim(),
        createdAt: created_at,
        comments: [],
      },
      error: null,
    }
  },

  deletePost: async (postId: string) => {
    await delay()
    mutateMockStore((s) => {
      s.forumPosts = s.forumPosts.filter((p) => p.id !== postId)
      s.forumComments = s.forumComments.filter((c) => c.post_id !== postId)
    })
    return { error: null }
  },

  createComment: async (postId: string, userId: string, content: string) => {
    const validation = validateContent(content)
    if (!validation.valid) {
      return { data: null, error: { message: validation.error } }
    }

    await delay()
    const profile = getProfile(userId)
    const userName = profile?.name || 'Usuario'
    const id = generateId('comment')
    const created_at = new Date().toISOString()

    mutateMockStore((s) => {
      s.forumComments.push({
        id,
        post_id: postId,
        user_id: userId,
        content: content.trim(),
        created_at,
      })
    })

    return {
      data: {
        id,
        postId,
        userId,
        userName,
        userAvatar: profile?.avatar_url || '/avatar.webp',
        content: content.trim(),
        createdAt: created_at,
      },
      error: null,
    }
  },

  deleteComment: async (commentId: string) => {
    await delay()
    mutateMockStore((s) => {
      s.forumComments = s.forumComments.filter((c) => c.id !== commentId)
    })
    return { error: null }
  },

  getPostCourseId: async (postId: string) => {
    await delay()
    const post = getMockStore().forumPosts.find((p) => p.id === postId)
    return post?.course_id || null
  },
}

export { validateContent }
