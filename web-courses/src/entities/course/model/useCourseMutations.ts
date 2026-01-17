import { useMutation, useQueryClient } from '@tanstack/react-query'
import { coursesApi } from '@/shared/api/courses'
import type { Course } from '../types'
import { toast } from 'sonner'
import { getAuthErrorMessage } from '@/shared/lib/supabase/errorHandler'
import type { CreateCourseInput } from '../types' 


const MAX_TITLE_LENGTH = 60

const handleFriendlyError = (error: any, defaultMessage: string) => {
  console.error('Error técnico detallado:', error) // Log para nosotros los devs

  // Error de Foreign Key (Postgres Code 23503)
  if (error?.code === '23503' || error?.message?.includes('violates foreign key constraint')) {
    return 'No se puede eliminar: existen alumnos, favoritos o mensajes del foro vinculados a este curso.'
  }

  // Error de Red / Fetch
  if (error?.message?.includes('fetch') || error?.message?.includes('Network')) {
    return 'Error de conexión. Revisa tu internet e intenta de nuevo.'
  }

  if (typeof error === 'string') return error
  
  return error.message || defaultMessage
}

export function useCreateCourse() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (newCourse: CreateCourseInput) => {
      if (newCourse.title.length > MAX_TITLE_LENGTH) {
        throw new Error(`El título es demasiado largo (máximo ${MAX_TITLE_LENGTH} caracteres)`)
      }
      return await coursesApi.create(newCourse)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      toast.success('Curso creado exitosamente')
    },
    onError: (error: any) => {
      toast.error(handleFriendlyError(error, 'Error al crear el curso'))
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
    onError: (error: any) => {
      toast.error(handleFriendlyError(error, 'Error al actualizar el curso'))
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
    onError: (error: any) => {
      // Usás TU función con el nombre que elegiste
      const mensaje = getAuthErrorMessage(error) 
      toast.error(mensaje)
    },
  })
}