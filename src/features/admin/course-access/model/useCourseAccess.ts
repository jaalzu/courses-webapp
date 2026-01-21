import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/shared/lib/supabase/client'

export function useGrantAccess() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ userId, courseId }: { userId: string, courseId: string }) => {
      const { error } = await (supabase.rpc as any)('grant_course_access', {
        target_user_id: userId,
        target_course_id: courseId
      })
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-access'] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    }
  })
}

export function useRevokeAccess() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ userId, courseId }: { userId: string, courseId: string }) => {
      const { error } = await (supabase.rpc as any)('revoke_course_access', {
        target_user_id: userId,
        target_course_id: courseId
      })
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-access'] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    }
  })
}