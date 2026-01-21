import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useEditCourseForm } from './useEditCourseForm'
import type { Course } from '@/entities/course/types'

describe('useEditCourseForm', () => {
  const mockCourse: Course = {
    id: '1',
    title: 'React Course',
    description: 'Learn React',
    duration: '10h',
    video: 'video-url-123',
    image: 'image.png',
    instructor: 'John Doe',
    level: 'beginner',
    lessons: [], 
  }

  it('debería inicializar el formData con los datos del curso', () => {
    const { result } = renderHook(() => useEditCourseForm(mockCourse, true))

    expect(result.current.formData.title).toBe(mockCourse.title)
    expect(result.current.formData.instructor).toBe(mockCourse.instructor)
  })

  it('debería actualizar el formData cuando el curso cambia y el form está abierto', () => {
    const { result, rerender } = renderHook(
      ({ course, isOpen }) => useEditCourseForm(course, isOpen),
      {
        initialProps: { course: mockCourse, isOpen: false }
      }
    )

    const updatedCourse = { ...mockCourse, title: 'Next.js Course' }

    // Simulamos que el modal se abre con un nuevo curso
    rerender({ course: updatedCourse, isOpen: true })

    expect(result.current.formData.title).toBe('Next.js Course')
  })

  it('debería actualizar los valores del estado al escribir (handleChange)', () => {
    const { result } = renderHook(() => useEditCourseForm(mockCourse, true))

    act(() => {
      // Simulamos un evento de cambio en un input
      const event = {
        target: { name: 'title', value: 'Curso Editado' }
      } as React.ChangeEvent<HTMLInputElement>
      
      result.current.handleChange(event)
    })

    expect(result.current.formData.title).toBe('Curso Editado')
  })

  it('debería permitir cambiar el nivel (select)', () => {
    const { result } = renderHook(() => useEditCourseForm(mockCourse, true))

    act(() => {
      const event = {
        target: { name: 'level', value: 'advanced' }
      } as React.ChangeEvent<HTMLSelectElement>
      
      result.current.handleChange(event)
    })

    expect(result.current.formData.level).toBe('advanced')
  })
})