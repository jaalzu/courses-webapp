import { describe, it, expect, vi, beforeEach } from 'vitest'
import { handleSharePost, handleShareComment } from './forumShare'

describe('forumShare.service', () => {
  const mockPost = {
    id: 'p1',
    userName: 'Juan',
    content: 'Contenido del post original',
    comments: []
  } as any

  const mockComment = {
    id: 'c1',
    userName: 'Maria',
    content: 'Este es mi comentario'
  } as any

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock de window.location
    Object.defineProperty(window, 'location', {
      value: { href: 'https://tuapp.com/foro' },
      writable: true
    })

    // Mock de navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
      }
    })
  })

  it('debería usar navigator.share si está disponible', async () => {
    // Simulamos que el navegador soporta Share API
    navigator.share = vi.fn().mockResolvedValue(undefined)

    await handleSharePost(mockPost)

    expect(navigator.share).toHaveBeenCalledWith({
      title: 'Publicación de Juan',
      text: 'Contenido del post original',
      url: 'https://tuapp.com/foro'
    })
  })

  it('debería usar clipboard como fallback si share no existe', async () => {
    // Eliminamos share del navigator para este test
    delete (navigator as any).share
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    await handleSharePost(mockPost)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Contenido del post original')
    expect(alertSpy).toHaveBeenCalledWith('Contenido copiado al portapapeles')
  })

  it('debería formatear correctamente el texto al compartir un comentario', async () => {
    navigator.share = vi.fn().mockResolvedValue(undefined)

    await handleShareComment(mockComment, mockPost)

    expect(navigator.share).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Respuesta de Maria',
      text: expect.stringContaining('"Este es mi comentario"')
    }))
    expect(navigator.share).toHaveBeenCalledWith(expect.objectContaining({
      text: expect.stringContaining('En respuesta a:')
    }))
  })
})