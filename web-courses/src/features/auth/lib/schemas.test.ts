import { describe, it, expect } from 'vitest'
import { registerSchema } from './schemas' 

describe('registerSchema', () => {
  const validData = {
    name: 'user_123',
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123'
  }

  it('debería validar correctamente datos válidos y transformar a minúsculas', () => {
    const result = registerSchema.safeParse({
      ...validData,
      name: 'USER.NAME',
      email: 'TEST@EXAMPLE.COM'
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('user.name') // Test del transform
      expect(result.data.email).toBe('test@example.com')
    }
  })

  it('debería fallar si las contraseñas no coinciden', () => {
    const result = registerSchema.safeParse({
      ...validData,
      confirmPassword: 'different_password'
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      const error = result.error.format()
      expect(error.confirmPassword?._errors).toContain('Las contraseñas no coinciden')
    }
  })

  describe('validaciones del nombre de usuario', () => {
    it('debería fallar si empieza o termina con puntos/guiones bajos', () => {
      const startDot = registerSchema.safeParse({ ...validData, name: '.user' })
      const endUnderscore = registerSchema.safeParse({ ...validData, name: 'user_' })
      
      expect(startDot.success).toBe(false)
      expect(endUnderscore.success).toBe(false)
    })

    it('debería fallar con caracteres consecutivos', () => {
      const consecutive = registerSchema.safeParse({ ...validData, name: 'user..name' })
      expect(consecutive.success).toBe(false)
    })
  })

  describe('validaciones de email', () => {
    it('debería fallar si el email empieza solo con números', () => {
      const result = registerSchema.safeParse({ ...validData, email: '12345@gmail.com' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('El email no puede empezar solo con números')
      }
    })

    it('debería fallar si el formato de email es inválido', () => {
      const result = registerSchema.safeParse({ ...validData, email: 'invalid-email' })
      expect(result.success).toBe(false)
    })
  })
})