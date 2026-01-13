import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { formatDate } from './forumHelpers'

describe('formatDate', () => {
  // 1. Fijamos una fecha de referencia: 1 de Enero de 2026, 12:00:00
  const mockNow = new Date('2026-01-01T12:00:00Z')

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(mockNow)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('debería retornar "Justo ahora" si pasaron menos de 1 minuto', () => {
    const thirtySecondsAgo = new Date('2026-01-01T11:59:30Z')
    expect(formatDate(thirtySecondsAgo)).toBe('Justo ahora')
  })

  it('debería retornar minutos si pasaron menos de una hora', () => {
    const tenMinutesAgo = new Date('2026-01-01T11:50:00Z')
    expect(formatDate(tenMinutesAgo)).toBe('Hace 10m')
  })

  it('debería retornar horas si pasaron menos de 24 horas', () => {
    const fiveHoursAgo = new Date('2026-01-01T07:00:00Z')
    expect(formatDate(fiveHoursAgo)).toBe('Hace 5h')
  })

  it('debería retornar días si pasaron menos de 7 días', () => {
    const threeDaysAgo = new Date('2025-12-29T12:00:00Z')
    expect(formatDate(threeDaysAgo)).toBe('Hace 3d')
  })

  it('debería retornar formato fecha corta si pasaron más de 7 días', () => {
    const twoWeeksAgo = new Date('2025-12-15T12:00:00Z')
    // El formato depende de es-ES: DD/MM/AAAA
    expect(formatDate(twoWeeksAgo)).toBe('15/12/2025')
  })
})