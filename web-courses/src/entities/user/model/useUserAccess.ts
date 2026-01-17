import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/shared/lib/supabase/client'

type CourseAccess = {
  id: string
  user_id: string
  course_id: string
  granted_by: string | null
  granted_at: string
  courses: { id: string; title: string } | null
  profiles: { name: string; email: string } | null
}

export function useUserAccess(userId: string) {
  return useQuery<CourseAccess[]>({
    queryKey: ['user-access', userId],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('course_access')
        .select(`
          *,
          courses(id, title),
          profiles(name, email)
        `)
        .eq('user_id', userId)
      
      if (error) throw error
      return data
    },
    enabled: !!userId
  })
}