import { useMutation, useQueryClient } from '@tanstack/react-query'
import { coursesApi } from '@/shared/api/courses'
import type { Course } from '../types'
import { toast } from 'sonner'

const MAX_TITLE_LENGTH = 60

export function useCreateCourse() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (newCourse: Omit<Course, 'id'>) => {
      if (newCourse.title.length > MAX_TITLE_LENGTH) {
        throw new Error(`El título es demasiado largo (máximo ${MAX_TITLE_LENGTH} caracteres)`)
      }
      return await coursesApi.create(newCourse)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      toast.success('Curso creado exitosamente')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al crear el curso')
    },
  })
}

export function useUpdateCourse() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ courseId, updates }: { courseId: string; updates: Partial<Course> }) => 
      coursesApi.update(courseId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      toast.success('Curso actualizado')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al actualizar el curso')
    },
  })
}

export function useDeleteCourse() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: coursesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      toast.success('Curso eliminado')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al eliminar el curso')
    },
  })
}