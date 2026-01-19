import { redirect } from 'next/navigation'
import { createClient } from '@/shared/lib/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // No logueado → login
  if (!user) {
    redirect('/login')
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  // Error o no admin → dashboard
  if (error || profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  // Todo OK → renderiza la página admin
  return <>{children}</>
}
