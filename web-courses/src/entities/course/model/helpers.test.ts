import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { generateCourseId, getLevelConfig } from './helpers'
import type { CourseLevel } from '../types'

describe('generateCourseId', () => {
  it('debe generar un ID único cada vez', () => {
    const id1 = generateCourseId()
    const id2 = generateCourseId()
    
    expect(id1).not.toBe(id2)
  })

  it('debe generar un string no vacío', () => {
    const id = generateCourseId()
    
    expect(id).toBeTruthy()
    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
  })

  it('debe usar crypto.randomUUID en el browser', () => {
    // Verificar que en el entorno de test (jsdom) use crypto
    const id = generateCourseId()
    
    // UUID tiene formato: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    expect(id).toMatch(uuidPattern)
  })

  it('debe usar fallback cuando window no está disponible', () => {
    // Guardar window original
    const originalWindow = global.window
    
    // Simular SSR (sin window)
    global.window = undefined
    
    const id = generateCourseId()
    
    expect(id).toBeTruthy()
    expect(typeof id).toBe('string')
    
    // Restaurar window
    global.window = originalWindow
  })

  it('debe generar IDs diferentes en múltiples llamadas', () => {
    const ids = new Set()
    
    for (let i = 0; i < 10; i++) {
      ids.add(generateCourseId())
    }
    
    // Todos deben ser únicos
    expect(ids.size).toBe(10)
  })
})

describe('getLevelConfig', () => {
  it('debe retornar configuración correcta para nivel beginner', () => {
    const config = getLevelConfig('beginner')
    
    expect(config).toEqual({
      variant: 'success',
      label: 'Básico',
    })
  })

  it('debe retornar configuración correcta para nivel intermediate', () => {
    const config = getLevelConfig('intermediate')
    
    expect(config).toEqual({
      variant: 'warning',
      label: 'Intermedio',
    })
  })

  it('debe retornar configuración correcta para nivel advanced', () => {
    const config = getLevelConfig('advanced')
    
    expect(config).toEqual({
      variant: 'danger',
      label: 'Avanzado',
    })
  })

  it('debe retornar objetos inmutables (no compartir referencias)', () => {
    const config1 = getLevelConfig('beginner')
    const config2 = getLevelConfig('beginner')
    
    // Aunque tengan los mismos valores, son objetos diferentes
    expect(config1).toEqual(config2)
    expect(config1).not.toBe(config2)
  })

  it('debe tener las propiedades correctas en todos los niveles', () => {
    const levels: CourseLevel[] = ['beginner', 'intermediate', 'advanced']
    
    levels.forEach(level => {
      const config = getLevelConfig(level)
      
      expect(config).toHaveProperty('variant')
      expect(config).toHaveProperty('label')
      expect(typeof config.variant).toBe('string')
      expect(typeof config.label).toBe('string')
    })
  })

  it('debe tener variants válidos para componentes UI', () => {
    const validVariants = ['success', 'warning', 'danger']
    
    const beginnerVariant = getLevelConfig('beginner').variant
    const intermediateVariant = getLevelConfig('intermediate').variant
    const advancedVariant = getLevelConfig('advanced').variant
    
    expect(validVariants).toContain(beginnerVariant)
    expect(validVariants).toContain(intermediateVariant)
    expect(validVariants).toContain(advancedVariant)
  })

  it('debe tener labels en español', () => {
    const labels = [
      getLevelConfig('beginner').label,
      getLevelConfig('intermediate').label,
      getLevelConfig('advanced').label,
    ]
    
    expect(labels).toEqual(['Básico', 'Intermedio', 'Avanzado'])
  })
})