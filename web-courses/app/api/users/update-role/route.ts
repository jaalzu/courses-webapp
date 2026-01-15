import { NextRequest, NextResponse } from 'next/server'
import { updateUserRole, type UserRole } from '@/entities/user/api/updateUserRole'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, newRole } = body

    // Validación básica
    if (!userId || !newRole) {
      return NextResponse.json(
        { success: false, error: 'Faltan parámetros requeridos' },
        { status: 400 }
      )
    }

    if (!['student', 'admin'].includes(newRole)) {
      return NextResponse.json(
        { success: false, error: 'Rol inválido' },
        { status: 400 }
      )
    }

    // Ejecutar la actualización
    const result = await updateUserRole({ userId, newRole: newRole as UserRole })

    if (!result.success) {
      return NextResponse.json(result, { status: 403 })
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('Error en API route update-role:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}