import { create } from 'zustand'

interface NotificationStore {
  unreadCount: number
  setUnreadCount: (count: number) => void
  decrementUnread: (amount: number) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  decrementUnread: (amount) =>
    set((state) => ({ unreadCount: Math.max(0, state.unreadCount - amount) })),
}))