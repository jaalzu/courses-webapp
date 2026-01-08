// shared/api/users.ts
import { profileQueries } from '@/shared/lib/supabase/queries/profiles'
import { supabase } from '@/shared/lib/supabase/client'
import type { User } from '@/entities/user'

export const usersApi = {
  async getAll() {
    const { data, error } = await profileQueries.search('')
    if (error) throw new Error(error.message)
    return mapUsersFromDb(data || [])
  },

  async updateRole(userId: string, newRole: 'admin' | 'student') {
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id', userId)
    
    if (error) throw new Error(error.message)
  }
}

function mapUsersFromDb(data: any[]): User[] {
  return data.map((u: any) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role: u.role,
    avatarUrl: u.avatar_url,
    bio: u.bio,
    createdAt: u.created_at,
    updatedAt: u.updated_at
  }))
}