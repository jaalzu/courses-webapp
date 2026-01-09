// @/entities/progress/model/useProgressMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/shared/lib/supabase/client'
import type { LessonProgress } from '../types'

export const useProgressMutations = () => {
  const queryClient = useQueryClient()

  const toggleLesson = useMutation({
    mutationFn: async ({ userId, courseId, lessonId, currentCompleted }: { 
      userId: string, courseId: string, lessonId: string, currentCompleted: boolean 
    }) => {
      if (currentCompleted) {
        const { error } = await supabase
          .from('user_progress')
          .delete()
          .match({ user_id: userId, lesson_id: lessonId }) 
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('user_progress')
          .insert({ 
            user_id: userId, 
            course_id: courseId, 
            lesson_id: lessonId,
            status: 'completed',
            completed_at: new Date().toISOString()
          })
        
        if (error) throw error
      }
    },

    onMutate: async (variables) => {
      const { userId, lessonId, currentCompleted, courseId } = variables
      const queryKey = ['progress', 'user', userId]

      await queryClient.cancelQueries({ queryKey })

      const previousProgress = queryClient.getQueryData<LessonProgress[]>(queryKey)

      queryClient.setQueryData<LessonProgress[]>(queryKey, (old = []) => {
        if (currentCompleted) {
          return old.filter(p => p.lessonId !== lessonId)
        }
        
        const newItem: LessonProgress = { 
          userId: userId,     
    lessonId: lessonId, // 
    courseId: courseId, 
    completed: true 
        }
        return [...old, newItem]
      })

      return { previousProgress }
    },

    onError: (_err, variables, context) => {
      // Si la base de datos falló, volvemos todo a como estaba antes
      if (context?.previousProgress) {
        queryClient.setQueryData(
          ['progress', 'user', variables.userId], 
          context.previousProgress
        )
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ['progress', 'user', variables.userId] 
      })
    },
  })

  return { 
    toggleLesson, 
    isUpdating: toggleLesson.isPending 
  }
}