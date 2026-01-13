import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useForum } from './useForum'
import { forumQueries } from '@/shared/lib/supabase/queries/forum'
import { rateLimiter } from '@/shared/lib/utils/rateLimiter'

// 1. Mocks
vi.mock('@/shared/lib/supabase/queries/forum')
vi.mock('@/shared/lib/utils/rateLimiter')

describe('useForum', () => {
  const mockCourseId = 'course-123'
  const mockPosts = [{ id: 'p1', content: 'Hola', comments: [] }]

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock default del rate limiter: siempre permitido
    vi.mocked(rateLimiter.canProceed).mockReturnValue({ allowed: true, retryAfter: 0 })
    // Mock de carga inicial
    vi.mocked(forumQueries.getPosts).mockResolvedValue({ data: mockPosts, error: null })
  })

  it('debería cargar los posts al inicializar', async () => {
    const { result } = renderHook(() => useForum(mockCourseId))

    // Esperamos a que el useEffect termine
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.posts).toEqual(mockPosts)
    expect(result.current.loading).toBe(false)
  })

  it('debería agregar un nuevo post a la lista localmente', async () => {
    const newPost = { id: 'p2', content: 'Nuevo', comments: [] }
    vi.mocked(forumQueries.createPost).mockResolvedValue({ data: newPost, error: null })

    const { result } = renderHook(() => useForum(mockCourseId))

    await act(async () => {
      await result.current.createPost('Nuevo', 'user-1')
    })

    expect(result.current.posts[0]).toEqual(newPost)
    expect(result.current.posts).toHaveLength(2)
  })

  it('debería bloquear la publicación si el rate limit se excede', async () => {
    vi.mocked(rateLimiter.canProceed).mockReturnValue({ allowed: false, retryAfter: 30 })
    const notify = vi.fn()
    
    const { result } = renderHook(() => useForum(mockCourseId))

    await act(async () => {
      await result.current.createPost('Contenido', 'user-1', notify)
    })

    expect(forumQueries.createPost).not.toHaveBeenCalled()
    expect(notify).toHaveBeenCalledWith(expect.stringContaining('espera 30 segundos'), 'warning')
  })

  it('debería eliminar un comentario localmente', async () => {
    const postsWithComment = [{ 
      id: 'p1', 
      content: 'Post', 
      comments: [{ id: 'c1', content: 'Comentario' }] 
    }]
    vi.mocked(forumQueries.getPosts).mockResolvedValue({ data: postsWithComment, error: null })
    vi.mocked(forumQueries.deleteComment).mockResolvedValue({ error: null })

    const { result } = renderHook(() => useForum(mockCourseId))

    await act(async () => {
      await result.current.deleteComment('p1', 'c1')
    })

    expect(result.current.posts[0].comments).toHaveLength(0)
  })
})