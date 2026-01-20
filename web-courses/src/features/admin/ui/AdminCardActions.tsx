// AdminCardActions.tsx
'use client'

import { useState } from 'react' // Importante para controlar el modal
import { EditButton } from "@/features/admin/ui/shared/EditButton"
import { DeleteButton } from "@/features/admin/ui/shared/DeleteButton"
import { useDeleteCourse } from "@/entities/course/model/useCourseMutations"
import { ConfirmModal } from "@/features/admin/ui/ConfirmModal" 

interface AdminCardActionsProps {
  courseId: string
  onEdit?: () => void
}

export function AdminCardActions({ courseId, onEdit }: AdminCardActionsProps) {
  // 1. Estado local para abrir/cerrar el modal
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  
  const deleteMutation = useDeleteCourse() 

  // 2. Función que ejecuta la mutación real
  const handleConfirmDelete = () => {
    deleteMutation.mutate(courseId, {
      onSuccess: () => {
        setIsConfirmOpen(false) // Cerramos el modal solo si sale bien
      },
      onError: () => {
        // Opcional: podrías mantener el modal abierto o cerrarlo y mostrar un toast
        setIsConfirmOpen(false)
      }
    })
  }

  return (
    <>
      {onEdit && <EditButton onEdit={onEdit} />}
      
      {/* El botón de borrar ahora solo abre el modal, no borra directamente */}
      <DeleteButton 
        onDelete={() => setIsConfirmOpen(true)} 
        disabled={deleteMutation.isPending} 
      />

      {/* Componente de Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="¿Eliminar curso?"
        description="Esta acción eliminará el curso permanentemente, incluyendo sus lecciones y archivos adjuntos. No podrás deshacer este cambio."
        isLoading={deleteMutation.isPending}
      />
    </>
  )
}