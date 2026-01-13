import { describe, it, expect } from 'vitest'
import { mapProfileToUser, mapUserToProfileUpdate } from './profileMapper'

describe('profileMapper', () => {
  describe('mapProfileToUser', () => {
    it('debería mapear un perfil de Supabase a un objeto User correctamente', () => {
      const mockProfile = {
        id: '123',
        email: 'test@test.com',
        name: 'John Doe',
        avatar_url: 'http://avatar.com/123',
        role: 'student',
        bio: 'Hello world',
        created_at: '2024-01-01T10:00:00Z',
        updated_at: '2024-01-01T10:00:00Z'
      }

      const user = mapProfileToUser(mockProfile)

      expect(user.id).toBe('123')
      expect(user.name).toBe('John Doe')
      expect(user.role).toBe('student')
      expect(user.avatar).toBe('http://avatar.com/123')
      expect(user.createdAt).toBeInstanceOf(Date)
      expect(user.assignedCourses).toEqual([])
    })

    it('debería manejar valores nulos y asignar valores por defecto', () => {
      const mockProfile = {
        id: '123',
        email: 'test@test.com',
        name: null,
        avatar_url: null,
        role: 'student',
        created_at: '2024-01-01T10:00:00Z',
      } as any

      const user = mapProfileToUser(mockProfile)

      expect(user.name).toBe('') // Default value del mapper
      expect(user.avatar).toBeUndefined() // Se vuelve undefined según tu lógica
    })
  })

  describe('mapUserToProfileUpdate', () => {
    it('debería transformar el objeto User al formato snake_case de Supabase', () => {
      const userUpdate = {
        name: 'New Name',
        avatar: 'new-avatar.png',
        role: 'admin' as const
      }

      const result = mapUserToProfileUpdate(userUpdate)

      expect(result.name).toBe('New Name')
      expect(result.avatar_url).toBe('new-avatar.png')
      expect(result.role).toBe('admin')
      // Verificamos que no existan campos que no deben estar
      expect(result).not.toHaveProperty('avatar')
    })
  })
})