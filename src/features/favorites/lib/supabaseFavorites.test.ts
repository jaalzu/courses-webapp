import { describe, it, expect, vi, beforeEach } from 'vitest'
import { supabaseFavorites, __resetFavoritesInternalState } from './supabaseFavorites'
import { supabase } from '@/shared/lib/supabase/client'

// 1. Mock completo de Supabase
vi.mock('@/shared/lib/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockResolvedValue({ error: null }),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      // Simulamos que el .then() devuelve data de la DB
      then: vi.fn((cb) => Promise.resolve(cb({ data: [{ course_id: 'C1' }], error: null })))
    }))
  }
}))

describe('supabaseFavorites', () => {
  const userId = 'user-123'

  beforeEach(() => {
    vi.clearAllMocks()
    // 2. Limpiamos el estado global del módulo antes de cada test
    __resetFavoritesInternalState()
  })

  it('debería cargar la data inicial al suscribirse por primera vez', async () => {
    const service = supabaseFavorites(userId)
    
    // Al suscribirnos, debería entrar al bloque !isInitialLoaded
    service.subscribe(() => {})

    // Ahora sí debería llamarse porque isInitialLoaded era false
    expect(supabase.from).toHaveBeenCalledWith('favorites')
  })

  it('debería agregar un favorito al cache de forma optimista', async () => {
    const service = supabaseFavorites(userId)
    
    await service.add('C2')
    
    const favs = service.get()
    expect(favs).toContain('C2')
    expect(supabase.from).toHaveBeenCalledWith('favorites')
  })

  it('debería notificar a los suscriptores cuando se agrega un favorito', () => {
    const service = supabaseFavorites(userId)
    const callback = vi.fn()
    
    service.subscribe(callback)
    service.add('C3')

    expect(callback).toHaveBeenCalled()
  })

  it('no debería volver a llamar a la base de datos si ya está cargado', () => {
    const service = supabaseFavorites(userId)
    
    // Primera suscripción: Carga data
    service.subscribe(() => {})
    const callsAfterFirst = vi.mocked(supabase.from).mock.calls.length

    // Segunda suscripción: Debería usar el cache
    service.subscribe(() => {})
    const callsAfterSecond = vi.mocked(supabase.from).mock.calls.length

    expect(callsAfterSecond).toBe(callsAfterFirst)
  })

  it('debería eliminar un favorito del cache', async () => {
    const service = supabaseFavorites(userId)
    
    // Agregamos y luego removemos
    await service.add('C4')
    expect(service.get()).toContain('C4')
    
    await service.remove('C4')
    expect(service.get()).not.toContain('C4')
  })
})