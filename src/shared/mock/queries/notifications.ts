import { delay, getMockStore, mutateMockStore } from '../store'

export const notificationQueries = {
  async getAll() {
    await delay()
    const store = getMockStore()
    const data = store.notifications
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 50)
      .map((n) => {
        const actor = store.profiles.find((p) => p.id === n.actor_id)
        const post = store.forumPosts.find((p) => p.id === n.post_id)
        return {
          ...n,
          actor: actor ? { name: actor.name, avatar_url: actor.avatar_url } : null,
          post: post ? { title: post.title } : null,
        }
      })

    return { data, error: null }
  },

  async getUnreadCount() {
    await delay()
    const count = getMockStore().notifications.filter((n) => !n.is_read).length
    return { count, error: null }
  },

  async markAsRead(notificationIds: string[]) {
    await delay()
    mutateMockStore((s) => {
      s.notifications.forEach((n) => {
        if (notificationIds.includes(n.id)) n.is_read = true
      })
    })
    return { error: null }
  },

  async markAllAsRead() {
    await delay()
    mutateMockStore((s) => {
      s.notifications.forEach((n) => { n.is_read = true })
    })
    return { error: null }
  },
}
