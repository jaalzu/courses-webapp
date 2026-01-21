import { describe, it, expect, beforeEach } from 'vitest'
import { useUserStore } from './useUserStore'
import type { User } from './types'

const mockUsers: User[] = [
  { id: 'user-1', name: 'Juan Pérez', email: 'juan@test.com' },
  { id: 'user-2', name: 'María García', email: 'maria@test.com' },
  { id: 'user-3', name: 'Carlos López', email: 'carlos@test.com' },
] as User[]

describe('useUserStore', () => {
  beforeEach(() => {
    useUserStore.setState({
      users: [],
      isLoading: false,
      error: null,
    })
  })

  describe('Estado inicial', () => {
    it('debe tener los valores iniciales correctos', () => {
      const state = useUserStore.getState()
      
      expect(state.users).toEqual([])
      expect(state.isLoading).toBe(false)
      expect(state.error).toBeNull()
    })
  })

  describe('setUsers', () => {
    it('debe establecer la lista de usuarios', () => {
      const { setUsers } = useUserStore.getState()
      
      setUsers(mockUsers)
      
      expect(useUserStore.getState().users).toEqual(mockUsers)
    })

    it('debe reemplazar usuarios existentes', () => {
      const { setUsers } = useUserStore.getState()
      
      setUsers(mockUsers)
      const newUsers: User[] = [{ id: 'user-4', name: 'Ana', email: 'ana@test.com' }] as User[]
      setUsers(newUsers)
      
      expect(useUserStore.getState().users).toEqual(newUsers)
      expect(useUserStore.getState().users).toHaveLength(1)
    })

    it('debe permitir establecer array vacío', () => {
      const { setUsers } = useUserStore.getState()
      
      setUsers(mockUsers)
      setUsers([])
      
      expect(useUserStore.getState().users).toEqual([])
    })
  })

  describe('setLoading', () => {
    it('debe cambiar el estado de carga a true', () => {
      const { setLoading } = useUserStore.getState()
      
      setLoading(true)
      
      expect(useUserStore.getState().isLoading).toBe(true)
    })

    it('debe cambiar el estado de carga a false', () => {
      const { setLoading } = useUserStore.getState()
      
      setLoading(true)
      setLoading(false)
      
      expect(useUserStore.getState().isLoading).toBe(false)
    })
  })

  describe('setError', () => {
    it('debe establecer un mensaje de error', () => {
      const { setError } = useUserStore.getState()
      const errorMessage = 'Error al cargar usuarios'
      
      setError(errorMessage)
      
      expect(useUserStore.getState().error).toBe(errorMessage)
    })

    it('debe limpiar el error con null', () => {
      const { setError } = useUserStore.getState()
      
      setError('Algún error')
      setError(null)
      
      expect(useUserStore.getState().error).toBeNull()
    })

    it('debe cambiar entre diferentes mensajes de error', () => {
      const { setError } = useUserStore.getState()
      
      setError('Error 1')
      expect(useUserStore.getState().error).toBe('Error 1')
      
      setError('Error 2')
      expect(useUserStore.getState().error).toBe('Error 2')
    })
  })

  describe('updateUserInState', () => {
    beforeEach(() => {
      useUserStore.setState({ users: [...mockUsers] })
    })

    it('debe actualizar un usuario específico', () => {
      const { updateUserInState } = useUserStore.getState()
      
      updateUserInState('user-1', { name: 'Juan Carlos Pérez' })
      
      const updatedUser = useUserStore.getState().users.find(u => u.id === 'user-1')
      expect(updatedUser?.name).toBe('Juan Carlos Pérez')
      expect(updatedUser?.email).toBe('juan@test.com') // No cambia
    })

    it('debe actualizar múltiples campos a la vez', () => {
      const { updateUserInState } = useUserStore.getState()
      
      updateUserInState('user-2', { 
        name: 'María José García',
        email: 'mariajose@test.com'
      })
      
      const updatedUser = useUserStore.getState().users.find(u => u.id === 'user-2')
      expect(updatedUser?.name).toBe('María José García')
      expect(updatedUser?.email).toBe('mariajose@test.com')
    })

    it('no debe afectar a otros usuarios', () => {
      const { updateUserInState } = useUserStore.getState()
      
      updateUserInState('user-1', { name: 'Nombre Cambiado' })
      
      const otherUsers = useUserStore.getState().users.filter(u => u.id !== 'user-1')
      expect(otherUsers).toEqual([mockUsers[1], mockUsers[2]])
    })

    it('no debe hacer nada si el usuario no existe', () => {
      const { updateUserInState } = useUserStore.getState()
      const usersBefore = useUserStore.getState().users
      
      updateUserInState('user-999', { name: 'No existe' })
      
      const usersAfter = useUserStore.getState().users
      expect(usersAfter).toEqual(usersBefore)
    })

    it('debe mantener el orden de los usuarios', () => {
      const { updateUserInState } = useUserStore.getState()
      
      updateUserInState('user-2', { name: 'María Actualizada' })
      
      const userIds = useUserStore.getState().users.map(u => u.id)
      expect(userIds).toEqual(['user-1', 'user-2', 'user-3'])
    })

    it('debe preservar propiedades no actualizadas', () => {
      const { updateUserInState } = useUserStore.getState()
      
      updateUserInState('user-3', { name: 'Carlos Nuevo' })
      
      const user = useUserStore.getState().users.find(u => u.id === 'user-3')
      expect(user?.id).toBe('user-3')
      expect(user?.email).toBe('carlos@test.com')
    })

    it('debe permitir actualizaciones parciales', () => {
      const { updateUserInState } = useUserStore.getState()
      
      // Solo actualizar nombre
      updateUserInState('user-1', { name: 'Solo nombre' })
      let user = useUserStore.getState().users.find(u => u.id === 'user-1')
      expect(user?.name).toBe('Solo nombre')
      expect(user?.email).toBe('juan@test.com')
      
      // Luego solo actualizar email
      updateUserInState('user-1', { email: 'nuevo@test.com' })
      user = useUserStore.getState().users.find(u => u.id === 'user-1')
      expect(user?.name).toBe('Solo nombre') // Se mantiene el cambio anterior
      expect(user?.email).toBe('nuevo@test.com')
    })
  })

  describe('Integración - flujo completo', () => {
    it('debe manejar un flujo típico de carga de usuarios', () => {
      const { setLoading, setUsers, setError } = useUserStore.getState()
      
      // 1. Iniciar carga
      setLoading(true)
      expect(useUserStore.getState().isLoading).toBe(true)
      
      // 2. Cargar usuarios exitosamente
      setUsers(mockUsers)
      setLoading(false)
      
      expect(useUserStore.getState().users).toEqual(mockUsers)
      expect(useUserStore.getState().isLoading).toBe(false)
      expect(useUserStore.getState().error).toBeNull()
    })

    it('debe manejar un flujo de error en la carga', () => {
      const { setLoading, setError } = useUserStore.getState()
      
      // 1. Iniciar carga
      setLoading(true)
      
      // 2. Error en la carga
      setError('Error de red')
      setLoading(false)
      
      expect(useUserStore.getState().isLoading).toBe(false)
      expect(useUserStore.getState().error).toBe('Error de red')
      expect(useUserStore.getState().users).toEqual([])
    })

    it('debe manejar actualización de usuario después de carga', () => {
      const { setUsers, updateUserInState } = useUserStore.getState()
      
      // 1. Cargar usuarios
      setUsers(mockUsers)
      
      // 2. Usuario edita su perfil
      updateUserInState('user-1', { name: 'Juan Editado' })
      
      // 3. Verificar cambio
      const user = useUserStore.getState().users.find(u => u.id === 'user-1')
      expect(user?.name).toBe('Juan Editado')
    })

    it('debe limpiar error y recargar usuarios', () => {
      const { setError, setUsers, setLoading } = useUserStore.getState()
      
      // 1. Hubo un error previo
      setError('Error anterior')
      
      // 2. Intentar de nuevo
      setError(null)
      setLoading(true)
      setUsers(mockUsers)
      setLoading(false)
      
      // Verificar estado final
      const state = useUserStore.getState()
      expect(state.error).toBeNull()
      expect(state.users).toEqual(mockUsers)
      expect(state.isLoading).toBe(false)
    })
  })
})