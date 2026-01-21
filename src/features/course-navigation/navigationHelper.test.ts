import { describe, it, expect } from 'vitest'
import { 
  getLessonIndex, 
  getNextLesson, 
  getPreviousLesson, 
  hasNextLesson, 
  hasPreviousLesson 
} from './navigationHelpers' 
import type { Course } from '@/entities/course/types'

describe('courseUtils', () => {
  const mockCourse = {
    id: 'course-1',
    title: 'Curso de React',
    lessons: [
      { id: 'L1', title: 'Introducción' },
      { id: 'L2', title: 'Hooks básicos' },
      { id: 'L3', title: 'Testing' }
    ]
  } as Course

  describe('getLessonIndex', () => {
    it('debería retornar el índice correcto', () => {
      expect(getLessonIndex(mockCourse, 'L2')).toBe(1)
    })

    it('debería retornar -1 si la lección no existe', () => {
      expect(getLessonIndex(mockCourse, 'L99')).toBe(-1)
    })
  })

  describe('getNextLesson', () => {
    it('debería retornar la siguiente lección', () => {
      const next = getNextLesson(mockCourse, 'L1')
      expect(next?.id).toBe('L2')
    })

    it('debería retornar null si es la última lección', () => {
      expect(getNextLesson(mockCourse, 'L3')).toBeNull()
    })
  })

  describe('getPreviousLesson', () => {
    it('debería retornar la lección anterior', () => {
      const prev = getPreviousLesson(mockCourse, 'L2')
      expect(prev?.id).toBe('L1')
    })

    it('debería retornar null si es la primera lección', () => {
      expect(getPreviousLesson(mockCourse, 'L1')).toBeNull()
    })
  })

  describe('hasNextLesson / hasPreviousLesson', () => {
    it('debería identificar si hay o no lecciones en ambas direcciones', () => {
      expect(hasNextLesson(mockCourse, 'L1')).toBe(true)
      expect(hasPreviousLesson(mockCourse, 'L1')).toBe(false)

      expect(hasNextLesson(mockCourse, 'L3')).toBe(false)
      expect(hasPreviousLesson(mockCourse, 'L3')).toBe(true)
    })
  })
})