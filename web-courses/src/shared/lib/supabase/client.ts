// import { createClient, SupabaseClient } from '@supabase/supabase-js'
// import type { Database } from './types'

// let supabaseInstance: SupabaseClient<Database> | null = null

// // HARDCODEADO TEMPORAL (solo para que funcione en Vercel)
// const FALLBACK_URL = 'https://gpafbzopphyreczrvfdj.supabase.co'
// const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwYWZiem9wcGh5cmVjenJ2ZmRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NTI5NTAsImV4cCI6MjA4MjEyODk1MH0.IW-2XBQsNsFZaZOQxI44sE3CAfDIm_zEqhOrqg6Xc5Q'

// export const supabase = (() => {
//   if (typeof window === 'undefined') {
//     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL
//     const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_KEY
    
//     return createClient<Database>(supabaseUrl, supabaseAnonKey, {
//       auth: {
//         persistSession: false,
//         autoRefreshToken: false,
//         detectSessionInUrl: false,
//       },
//     })
//   }

//   if (!supabaseInstance) {
//     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL
//     const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_KEY
    
//     supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
//       auth: {
//         persistSession: true,
//         autoRefreshToken: true,
//         detectSessionInUrl: true,
//       },
//     })
//   }

//   return supabaseInstance
// })()

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

// Solo creamos el cliente si estamos en el navegador
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Esto te va a avisar en la consola si te olvidaste de las variables en Vercel
    console.error("❌ Error: Faltan las variables de entorno de Supabase.");
  }

  return createBrowserClient<Database>(
    supabaseUrl!,
    supabaseAnonKey!
  )
}

// Singleton para el cliente
export const supabase = createClient()