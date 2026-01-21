import { supabase } from '../client'

export const notificationQueries = {
  async getAll() {
    const { data, error } = await supabase
      .from('notifications')
      .select(`
        *,
        actor:profiles!actor_id(name, avatar_url),
        post:forum_posts!post_id(title)
      `)
      .order('created_at', { ascending: false })
      .limit(50)

    return { data, error }
  },

  async getUnreadCount() {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false)

    return { count: count || 0, error }
  },

  async markAsRead(notificationIds: string[]) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .in('id', notificationIds)

    return { error }
  },

  async markAllAsRead() {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('is_read', false)

    return { error }
  },
}