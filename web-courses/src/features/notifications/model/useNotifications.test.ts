import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useNotifications } from '../useNotifications'
import { notificationQueries } from '@/shared/lib/supabase/queries/notifications'
import type { ReactNode } from 'react'

vi.mock('@/shared/lib/supabase/queries/notifications', () => ({
  notificationQueries: {
    getAll: vi.fn(),
    getUnreadCount: vi.fn(),
  },
}))

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useNotifications', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should load notifications successfully', async () => {
    const mockNotifications = [
      {
        id: '1',
        user_id: 'user-1',
        type: 'post_comment',
        post_id: 'post-1',
        actor_id: 'user-2',
        is_read: false,
        created_at: '2024-01-15T12:00:00Z',
        actor: { name: 'Juan', avatar_url: null },
        post: { title: 'Test Post' },
      },
    ]

    vi.mocked(notificationQueries.getAll).mockResolvedValueOnce({
      data: mockNotifications,
      error: null,
    })

    vi.mocked(notificationQueries.getUnreadCount).mockResolvedValueOnce({
      count: 1,
      error: null,
    })

    const { result } = renderHook(() => useNotifications(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.notifications).toHaveLength(1)
    expect(result.current.unreadCount).toBe(1)
  })

  it('should return empty array when no notifications', async () => {
    vi.mocked(notificationQueries.getAll).mockResolvedValueOnce({
      data: [],
      error: null,
    })

    vi.mocked(notificationQueries.getUnreadCount).mockResolvedValueOnce({
      count: 0,
      error: null,
    })

    const { result } = renderHook(() => useNotifications(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.notifications).toEqual([])
    expect(result.current.unreadCount).toBe(0)
  })

  it('should handle errors gracefully', async () => {
    vi.mocked(notificationQueries.getAll).mockRejectedValueOnce(
      new Error('Database error')
    )

    const { result } = renderHook(() => useNotifications(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.notifications).toEqual([])
  })
})