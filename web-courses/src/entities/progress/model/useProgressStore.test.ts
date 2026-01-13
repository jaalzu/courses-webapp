import { describe, it, expect, beforeEach } from 'vitest'
import { useProgressStore } from './useProgressStore'

describe('useProgressStore', () => {
  beforeEach(() => {
    useProgressStore.setState({
      lastSelectedLessonId: null,
      isFilterOpen: false,
    })
  })

  describe('Estado inicial', () => {
    it('debe tener los valores iniciales correctos', () => {
      const state = useProgressStore.getState()
      
      expect(state.lastSelectedLessonId).toBeNull()
      expect(state.isFilterOpen).toBe(false)
    })
  })

  describe('setLastSelectedLesson', () => {
    it('debe guardar el ID de la última lección seleccionada', () => {
      const { setLastSelectedLesson } = useProgressStore.getState()
      
      setLastSelectedLesson('lesson-123')
      
      expect(useProgressStore.getState().lastSelectedLessonId).toBe('lesson-123')
    })

    it('debe permitir cambiar entre diferentes lecciones', () => {
      const { setLastSelectedLesson } = useProgressStore.getState()
      
      setLastSelectedLesson('lesson-123')
      expect(useProgressStore.getState().lastSelectedLessonId).toBe('lesson-123')
      
      setLastSelectedLesson('lesson-456')
      expect(useProgressStore.getState().lastSelectedLessonId).toBe('lesson-456')
    })

    it('debe permitir limpiar la selección con null', () => {
      const { setLastSelectedLesson } = useProgressStore.getState()
      
      setLastSelectedLesson('lesson-789')
      setLastSelectedLesson(null)
      
      expect(useProgressStore.getState().lastSelectedLessonId).toBeNull()
    })
  })

  describe('toggleFilter', () => {
    it('debe abrir el filtro cuando está cerrado', () => {
      const { toggleFilter } = useProgressStore.getState()
      
      expect(useProgressStore.getState().isFilterOpen).toBe(false)
      
      toggleFilter()
      
      expect(useProgressStore.getState().isFilterOpen).toBe(true)
    })

    it('debe cerrar el filtro cuando está abierto', () => {
      const { toggleFilter } = useProgressStore.getState()
      
      // Abrir primero
      toggleFilter()
      expect(useProgressStore.getState().isFilterOpen).toBe(true)
      
      // Cerrar
      toggleFilter()
      expect(useProgressStore.getState().isFilterOpen).toBe(false)
    })

    it('debe alternar múltiples veces correctamente', () => {
      const { toggleFilter } = useProgressStore.getState()
      
      // Estado inicial: false
      expect(useProgressStore.getState().isFilterOpen).toBe(false)
      
      toggleFilter() // true
      expect(useProgressStore.getState().isFilterOpen).toBe(true)
      
      toggleFilter() // false
      expect(useProgressStore.getState().isFilterOpen).toBe(false)
      
      toggleFilter() // true
      expect(useProgressStore.getState().isFilterOpen).toBe(true)
      
      toggleFilter() // false
      expect(useProgressStore.getState().isFilterOpen).toBe(false)
    })
  })

  describe('Integración - estados independientes', () => {
    it('debe mantener estados independientes entre lastSelectedLesson y isFilterOpen', () => {
      const { setLastSelectedLesson, toggleFilter } = useProgressStore.getState()
      
      // Cambiar uno no debe afectar al otro
      setLastSelectedLesson('lesson-abc')
      expect(useProgressStore.getState().lastSelectedLessonId).toBe('lesson-abc')
      expect(useProgressStore.getState().isFilterOpen).toBe(false)
      
      toggleFilter()
      expect(useProgressStore.getState().lastSelectedLessonId).toBe('lesson-abc')
      expect(useProgressStore.getState().isFilterOpen).toBe(true)
    })

    it('debe manejar un flujo completo de usuario', () => {
      const { setLastSelectedLesson, toggleFilter } = useProgressStore.getState()
      
      // 1. Usuario selecciona una lección
      setLastSelectedLesson('lesson-001')
      
      // 2. Abre el filtro
      toggleFilter()
      
      // 3. Cambia de lección con filtro abierto
      setLastSelectedLesson('lesson-002')
      
      // 4. Cierra el filtro
      toggleFilter()
      
      // Verificar estado final
      const finalState = useProgressStore.getState()
      expect(finalState.lastSelectedLessonId).toBe('lesson-002')
      expect(finalState.isFilterOpen).toBe(false)
    })
  })
})