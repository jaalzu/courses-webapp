// entities/user/api/updateUserRole.ts
import { createClient } from '@/shared/lib/supabase/server'

export type UserRole = 'student' | 'admin'

interface UpdateRoleParams {
  userId: string
  newRole: UserRole
}

interface UpdateRoleResult {
  success: boolean
  error?: string
}

export async function updateUserRole(
  params: UpdateRoleParams
): Promise<UpdateRoleResult> {
  try {
    const supabase = await createClient()

    // 1. Verificar que el usuario actual es admin
    const { data: currentUser, error: authError } = await supabase.auth.getUser()
    
    if (authError || !currentUser.user) {
      return { success: false, error: 'No autenticado' }
    }

    // 2. Obtener rol del usuario actual
    const { data: currentUserData, error: userError } = await supabase
      .from('profiles')  // ← CAMBIO AQUÍ
      .select('role')
      .eq('id', currentUser.user.id)
      .single()

    if (userError || currentUserData?.role !== 'admin') {
      return { success: false, error: 'No tienes permisos de administrador' }
    }

    // 3. Verificar que no se está cambiando su propio rol
    if (currentUser.user.id === params.userId) {
      return { success: false, error: 'No puedes cambiar tu propio rol' }
    }

    // 4. Actualizar el rol del usuario objetivo
    const { error: updateError } = await supabase
      .from('profiles')  // ← CAMBIO AQUÍ
      .update({ role: params.newRole })
      .eq('id', params.userId)

    if (updateError) {
      console.error('Error actualizando rol:', updateError)
      return { success: false, error: 'Error al actualizar el rol' }
    }

    return { success: true }

  } catch (error) {
    console.error('Error inesperado en updateUserRole:', error)
    return { success: false, error: 'Error inesperado' }
  }
}