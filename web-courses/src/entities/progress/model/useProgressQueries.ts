import { useQuery } from '@tanstack/react-query'
import { progressApi } from '@/shared/api/progress'

export const progressKeys = {
  all: ['progress'] as const,
  lists: () => [...progressKeys.all, 'list'] as const,
  user: (userId: string) => [...progressKeys.all, 'user', userId] as const,
}

export function useAllProgress() {
  return useQuery({
    queryKey: progressKeys.lists(),
    queryFn: () => progressApi.getAllProgress(),
  })
}

export function useUserProgress(userId: string | undefined) {
  return useQuery({
    queryKey: progressKeys.user(userId!),
    queryFn: () => progressApi.getUserProgress(userId!),
    enabled: !!userId, 
  })
}