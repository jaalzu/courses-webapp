import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useForum } from './useForum'
import { forumQueries } from '@/shared/lib/supabase/queries/forum'
import { rateLimiter } from '@/shared/lib/utils/rateLimiter'

// 1. Mocks de dependencias
vi.mock('@/shared/lib/supabase/queries/forum')
vi.mock('@/shared/lib/utils/rateLimiter')

describe('useForum', () => {
  const mockCourseId = 'course-123'
  const mockPosts = [{ id: 'p1', content: 'Hola', comments: [] }]

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock default del rate limiter: siempre permitido
    // Agregamos 'message' para cumplir con la interfaz de TypeScript
    vi.mocked(rateLimiter.canProceed).mockReturnValue({ 
      allowed: true, 
      retryAfter: 0,
      message: '' 
    })

    // Mock de carga inicial de posts
    vi.mocked(forumQueries.getPosts).mockResolvedValue({ 
      data: mockPosts, 
      error: null 
    })
  })

  it('debería cargar los posts al inicializar', async () => {
    const { result } = renderHook(() => useForum(mockCourseId))

    // Pequeña espera para que el useEffect de carga se ejecute
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    expect(result.current.posts).toEqual(mockPosts)
    expect(result.current.loading).toBe(false)
  })

  it('debería agregar un nuevo post a la lista localmente', async () => {
    const newPost = { id: 'p2', content: 'Nuevo Post', comments: [] }
    vi.mocked(forumQueries.createPost).mockResolvedValue({ data: newPost, error: null })

    const { result } = renderHook(() => useForum(mockCourseId))

    await act(async () => {
      // Usamos el nombre de función que tengas en tu hook (createPost o addPost)
      await result.current.createPost('Nuevo Post', 'user-1')
    })

    expect(result.current.posts).toContainEqual(newPost)
    expect(result.current.posts).toHaveLength(2)
  })

  it('debería bloquear la publicación si el rate limit se excede', async () => {
    // Configuramos el mock para que BLOQUEE
    vi.mocked(rateLimiter.canProceed).mockReturnValue({ 
      allowed: false, 
      retryAfter: 30,
      message: 'Espera 30 segundos antes de publicar de nuevo.' 
    })
    
    const notify = vi.fn()
    const { result } = renderHook(() => useForum(mockCourseId))

    await act(async () => {
      await result.current.createPost('Contenido bloqueado', 'user-1', notify)
    })

    // Verificamos que NO se llamó a Supabase
    expect(forumQueries.createPost).not.toHaveBeenCalled()
    
    // Verificamos que se notificó el error al usuario
    expect(notify).toHaveBeenCalledWith(
      expect.stringContaining('Espera 30 segundos'), 
      'warning'
    )
  })

  it('debería eliminar un comentario localmente', async () => {
    const postsWithComment = [{ 
      id: 'p1', 
      content: 'Post', 
      comments: [{ id: 'c1', content: 'Comentario a borrar' }] 
    }]
    
    vi.mocked(forumQueries.getPosts).mockResolvedValue({ data: postsWithComment, error: null })
    vi.mocked(forumQueries.deleteComment).mockResolvedValue({ error: null })

    const { result } = renderHook(() => useForum(mockCourseId))

    // Esperamos carga inicial
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    await act(async () => {
      await result.current.deleteComment('p1', 'c1')
    })

    // El comentario ya no debería estar en el estado local
    expect(result.current.posts[0].comments).toHaveLength(0)
  })
})