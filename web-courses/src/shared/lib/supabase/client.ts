// src/shared/lib/supabase/client.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './types'

let supabaseInstance: SupabaseClient<Database> | null = null

export const supabase = (() => {
  if (typeof window === 'undefined') {
    // En el servidor, crear una nueva instancia cada vez
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }
    
    return createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false, // No persistir en el servidor
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    })
  }

  // En el cliente, usar singleton
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }
    
    supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  }

  return supabaseInstance
})()