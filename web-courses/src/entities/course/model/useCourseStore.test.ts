import { describe, it, expect, beforeEach } from 'vitest'
import { useCourseStore } from './useCourseStore'
import type { CourseLevel } from '../types'

describe('useCourseStore', () => {
  // Resetear el store antes de cada test
  beforeEach(() => {
    useCourseStore.setState({
      selectedCourseId: null,
      filterLevel: null,
      searchQuery: '',
      viewMode: 'grid',
    })
  })

  describe('Estado inicial', () => {
    it('debe tener los valores iniciales correctos', () => {
      const state = useCourseStore.getState()
      
      expect(state.selectedCourseId).toBeNull()
      expect(state.filterLevel).toBeNull()
      expect(state.searchQuery).toBe('')
      expect(state.viewMode).toBe('grid')
    })
  })

  describe('setSelectedCourse', () => {
    it('debe actualizar el curso seleccionado', () => {
      const { setSelectedCourse } = useCourseStore.getState()
      
      setSelectedCourse('course-123')
      
      expect(useCourseStore.getState().selectedCourseId).toBe('course-123')
    })

    it('debe permitir deseleccionar un curso (null)', () => {
      const { setSelectedCourse } = useCourseStore.getState()
      
      setSelectedCourse('course-123')
      setSelectedCourse(null)
      
      expect(useCourseStore.getState().selectedCourseId).toBeNull()
    })
  })

  describe('setFilterLevel', () => {
    it('debe actualizar el nivel de filtro', () => {
      const { setFilterLevel } = useCourseStore.getState()
      
      setFilterLevel('beginner' as CourseLevel)
      
      expect(useCourseStore.getState().filterLevel).toBe('beginner')
    })

    it('debe permitir limpiar el filtro de nivel', () => {
      const { setFilterLevel } = useCourseStore.getState()
      
      setFilterLevel('advanced' as CourseLevel)
      setFilterLevel(null)
      
      expect(useCourseStore.getState().filterLevel).toBeNull()
    })
  })

  describe('setSearchQuery', () => {
    it('debe actualizar la query de búsqueda', () => {
      const { setSearchQuery } = useCourseStore.getState()
      
      setSearchQuery('pasta italiana')
      
      expect(useCourseStore.getState().searchQuery).toBe('pasta italiana')
    })

    it('debe permitir limpiar la búsqueda', () => {
      const { setSearchQuery } = useCourseStore.getState()
      
      setSearchQuery('pizza')
      setSearchQuery('')
      
      expect(useCourseStore.getState().searchQuery).toBe('')
    })
  })

  describe('setViewMode', () => {
    it('debe cambiar a modo lista', () => {
      const { setViewMode } = useCourseStore.getState()
      
      setViewMode('list')
      
      expect(useCourseStore.getState().viewMode).toBe('list')
    })

    it('debe cambiar a modo grid', () => {
      const { setViewMode } = useCourseStore.getState()
      
      setViewMode('list')
      setViewMode('grid')
      
      expect(useCourseStore.getState().viewMode).toBe('grid')
    })
  })

  describe('clearFilters', () => {
    it('debe limpiar filterLevel y searchQuery pero mantener otros estados', () => {
      const { setFilterLevel, setSearchQuery, setViewMode, setSelectedCourse, clearFilters } = useCourseStore.getState()
      
      // Establecer varios estados
      setFilterLevel('intermediate' as CourseLevel)
      setSearchQuery('repostería')
      setViewMode('list')
      setSelectedCourse('course-456')
      
      // Limpiar filtros
      clearFilters()
      
      const state = useCourseStore.getState()
      expect(state.filterLevel).toBeNull()
      expect(state.searchQuery).toBe('')
      // Estos NO deben cambiar
      expect(state.viewMode).toBe('list')
      expect(state.selectedCourseId).toBe('course-456')
    })

    it('debe funcionar incluso si los filtros ya están vacíos', () => {
      const { clearFilters } = useCourseStore.getState()
      
      clearFilters()
      
      const state = useCourseStore.getState()
      expect(state.filterLevel).toBeNull()
      expect(state.searchQuery).toBe('')
    })
  })

  describe('Integración - flujo completo de usuario', () => {
    it('debe manejar un flujo típico de filtrado y selección', () => {
      const { setSearchQuery, setFilterLevel, setSelectedCourse, setViewMode } = useCourseStore.getState()
      
      // 1. Usuario busca cursos
      setSearchQuery('cocina italiana')
      expect(useCourseStore.getState().searchQuery).toBe('cocina italiana')
      
      // 2. Filtra por nivel
      setFilterLevel('beginner' as CourseLevel)
      expect(useCourseStore.getState().filterLevel).toBe('beginner')
      
      // 3. Cambia a vista lista
      setViewMode('list')
      expect(useCourseStore.getState().viewMode).toBe('list')
      
      // 4. Selecciona un curso
      setSelectedCourse('course-789')
      expect(useCourseStore.getState().selectedCourseId).toBe('course-789')
      
      // Estado final completo
      const finalState = useCourseStore.getState()
      expect(finalState).toEqual({
        searchQuery: 'cocina italiana',
        filterLevel: 'beginner',
        viewMode: 'list',
        selectedCourseId: 'course-789',
        setSearchQuery: expect.any(Function),
        setFilterLevel: expect.any(Function),
        setViewMode: expect.any(Function),
        setSelectedCourse: expect.any(Function),
        clearFilters: expect.any(Function),
      })
    })
  })
})