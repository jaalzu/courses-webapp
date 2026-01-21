'use client'

import { useState } from 'react'
import { EditButton } from "@/features/admin/ui/shared/EditButton"
import { DeleteButton } from "@/features/admin/ui/shared/DeleteButton"
import { useDeleteCourse } from "@/entities/course/model/useCourseMutations"
import { ConfirmModal } from "@/features/admin/ui/ConfirmModal" 
// 1. Importamos el hook que creamos
import { useAdminDemo } from "@/shared/hooks/useAdminDemo"

interface AdminCardActionsProps {
  courseId: string
  onEdit?: () => void
}

export function AdminCardActions({ courseId, onEdit }: AdminCardActionsProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  
  // 2. Inicializamos el hook de demo
  const { runIfAllowed, isDemoAdmin } = useAdminDemo()
  const deleteMutation = useDeleteCourse() 

  const handleConfirmDelete = () => {
    // 3. También lo protegemos acá por si acaso
    runIfAllowed(() => {
      deleteMutation.mutate(courseId, {
        onSuccess: () => {
          setIsConfirmOpen(false)
        },
        onError: () => {
          setIsConfirmOpen(false)
        }
      })
    })
  }

  return (
    <>
      {onEdit && (
        <EditButton 
          // Bloqueamos la edición también
          onEdit={() => runIfAllowed(onEdit)} 
        />
      )}
      
      <DeleteButton 
        // 4. Interceptamos la apertura del modal
        onDelete={() => runIfAllowed(() => setIsConfirmOpen(true))} 
        disabled={deleteMutation.isPending} 
        className={isDemoAdmin ? "opacity-50" : ""} // Opcional: darle un estilo visual
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar curso?"
        description="Esta acción eliminará el curso permanentemente..."
        isLoading={deleteMutation.isPending}
      />
    </>
  )
}