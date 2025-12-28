import type { User } from '@/entities/user/model/types';

// Tipo que viene de Supabase
interface SupabaseProfile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: string;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

// Mapper: Supabase → User (tu app)
export function mapProfileToUser(profile: SupabaseProfile): User {
  return {
    id: profile.id,
    name: profile.name || '',
    email: profile.email,
    role: profile.role as 'student' | 'admin',
    avatar: profile.avatar_url || undefined,
    createdAt: new Date(profile.created_at),
    assignedCourses: [], // Por ahora vacío
  };
}

// Mapper inverso: User → Supabase (para updates)
export function mapUserToProfileUpdate(user: Partial<User>) {
  return {
    name: user.name,
    avatar_url: user.avatar,
    role: user.role,
    // Nota: NO incluimos id, email, createdAt porque no se actualizan
  };
}