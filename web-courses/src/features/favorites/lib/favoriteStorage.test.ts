import { describe, it, expect, vi, beforeEach } from 'vitest'
import { localStorageFavorites } from './favoriteStorage'

describe('localStorageFavorites', () => {
  beforeEach(() => {
    // Limpiamos el localStorage antes de cada test
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('debería guardar un favorito y recuperarlo', () => {
    localStorageFavorites.add('course-1')
    
    const favs = localStorageFavorites.get()
    expect(favs).toContain('course-1')
    expect(favs.length).toBe(1)
  })

  it('no debería agregar duplicados', () => {
    localStorageFavorites.add('course-1')
    localStorageFavorites.add('course-1')

    const favs = localStorageFavorites.get()
    expect(favs.length).toBe(1)
  })

  it('debería eliminar un favorito', () => {
    localStorageFavorites.add('course-1')
    localStorageFavorites.remove('course-1')

    const favs = localStorageFavorites.get()
    expect(favs).not.toContain('course-1')
  })

  it('debería notificar a los suscriptores cuando algo cambia', () => {
    const callback = vi.fn()
    localStorageFavorites.subscribe(callback)

    localStorageFavorites.add('course-2')

    expect(callback).toHaveBeenCalled()
  })

  it('debería limpiar la suscripción correctamente', () => {
    const callback = vi.fn()
    const unsubscribe = localStorageFavorites.subscribe(callback)

    unsubscribe()
    localStorageFavorites.add('course-3')

    expect(callback).not.toHaveBeenCalled()
  })
})