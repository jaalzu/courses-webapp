'use client'

import { useEffect, useRef } from 'react'
import { supabase } from '@/shared/lib/supabase/client'
import { useAuthStore } from '@/features/auth/model/useAuthStore'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    // Solo escuchar cambios, NO llamar checkAuth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔐 Auth event:', event, session?.user?.email)
      
      if (event === 'SIGNED_IN' && session?.user) {
        // Re-fetch perfil completo
        const { checkAuth } = useAuthStore.getState()
        await checkAuth()
      } else if (event === 'SIGNED_OUT') {
        useAuthStore.setState({ 
          currentUser: null, 
          isAuthenticated: false, 
          isLoading: false 
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return <>{children}</>
}