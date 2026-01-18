import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMarkAsRead } from './useMarkAsRead'
import { notificationQueries } from '@/shared/lib/supabase/queries/notifications'
import type { ReactNode } from 'react'

vi.mock('@/shared/lib/supabase/queries/notifications', () => ({
  notificationQueries: {
    markAsRead: vi.fn(),
  },
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  
  return function TestWrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
}

describe('useMarkAsRead', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call markAsRead with correct notification IDs', async () => {
    const mockMarkAsRead = vi.mocked(notificationQueries.markAsRead)
    mockMarkAsRead.mockResolvedValueOnce({ error: null })

    const { result } = renderHook(() => useMarkAsRead(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(['notif-1', 'notif-2'])

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockMarkAsRead).toHaveBeenCalledWith(['notif-1', 'notif-2'])
    expect(mockMarkAsRead).toHaveBeenCalledTimes(1)
  })

  it('should handle errors when marking as read fails', async () => {
    const mockMarkAsRead = vi.mocked(notificationQueries.markAsRead)
    mockMarkAsRead.mockResolvedValueOnce({ 
      error: { 
        message: 'Database error',
        details: 'Connection failed',
        hint: 'Check connection',
        code: '500'
      } as any
    })

    const { result } = renderHook(() => useMarkAsRead(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(['notif-1'])

    await waitFor(() => expect(result.current.isError).toBe(true))
  })

  it('should invalidate queries after successful mark as read', async () => {
    const mockMarkAsRead = vi.mocked(notificationQueries.markAsRead)
    mockMarkAsRead.mockResolvedValueOnce({ error: null })

    const queryClient = new QueryClient()
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries')

    function TestWrapper({ children }: { children: ReactNode }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
    }

    const { result } = renderHook(() => useMarkAsRead(), { 
      wrapper: TestWrapper 
    })

    result.current.mutate(['notif-1'])

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['notifications'] })
    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['notifications-unread-count'] })
  })

  it('should handle empty array gracefully', async () => {
    const mockMarkAsRead = vi.mocked(notificationQueries.markAsRead)
    mockMarkAsRead.mockResolvedValueOnce({ error: null })

    const { result } = renderHook(() => useMarkAsRead(), {
      wrapper: createWrapper(),
    })

    result.current.mutate([])

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockMarkAsRead).toHaveBeenCalledWith([])
  })
})