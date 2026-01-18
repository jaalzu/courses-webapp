import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { formatTimeAgo } from './formatTime'

describe('formatTimeAgo', () => {
  beforeEach(() => {
    // Mock de Date.now() para tener control sobre el tiempo
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should return "hace un momento" for times less than 60 seconds ago', () => {
    const date = new Date('2024-01-15T11:59:30Z') // 30 segundos atrás
    expect(formatTimeAgo(date)).toBe('hace un momento')
  })

  it('should return minutes for times less than 1 hour ago', () => {
    const date = new Date('2024-01-15T11:55:00Z') // 5 minutos atrás
    expect(formatTimeAgo(date)).toBe('hace 5 minutos')
  })

  it('should return singular "minuto" for 1 minute', () => {
    const date = new Date('2024-01-15T11:59:00Z') // 1 minuto atrás
    expect(formatTimeAgo(date)).toBe('hace 1 minuto')
  })

  it('should return hours for times less than 1 day ago', () => {
    const date = new Date('2024-01-15T09:00:00Z') // 3 horas atrás
    expect(formatTimeAgo(date)).toBe('hace 3 horas')
  })

  it('should return singular "hora" for 1 hour', () => {
    const date = new Date('2024-01-15T11:00:00Z') // 1 hora atrás
    expect(formatTimeAgo(date)).toBe('hace 1 hora')
  })

  it('should return days for times less than 1 week ago', () => {
    const date = new Date('2024-01-12T12:00:00Z') // 3 días atrás
    expect(formatTimeAgo(date)).toBe('hace 3 días')
  })

  it('should return weeks for times less than 1 month ago', () => {
    const date = new Date('2024-01-01T12:00:00Z') // 2 semanas atrás
    expect(formatTimeAgo(date)).toBe('hace 2 semanas')
  })

  it('should return formatted date for times over 1 month ago', () => {
    const date = new Date('2023-12-01T12:00:00Z') // Más de 1 mes atrás
    const result = formatTimeAgo(date)
    expect(result).toMatch(/\d+ \w+/) // Formato: "1 dic"
  })

  it('should handle string dates', () => {
    const dateString = '2024-01-15T11:55:00Z'
    expect(formatTimeAgo(dateString)).toBe('hace 5 minutos')
  })
})