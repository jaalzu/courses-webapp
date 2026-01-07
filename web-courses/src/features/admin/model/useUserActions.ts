import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export function useUserActions() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const updateUserRole = async (userId: string, newRole: 'admin' | 'student') => {
    setIsLoading(true)
    setError(null)

    try {
      const { error: sbError } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (sbError) throw sbError

      return { success: true }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error al actualizar rol'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setIsLoading(false)
    }
  }

  return { updateUserRole, isLoading, error }
}