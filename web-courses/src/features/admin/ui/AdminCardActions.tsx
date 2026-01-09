// AdminCardActions.tsx
'use client'

import { EditButton } from "@/features/admin/ui/shared/EditButton"
import { DeleteButton } from "@/features/admin/ui/shared/DeleteButton"
import { useDeleteCourse } from "@/entities/course/model/useCourseMutations" // ✨ CAMBIO

interface AdminCardActionsProps {
  courseId: string
  onEdit?: () => void
}

export function AdminCardActions({ courseId, onEdit }: AdminCardActionsProps) {
  const deleteMutation = useDeleteCourse() // ✨ CAMBIO

  const handleDelete = () => {
    if (confirm("¿Seguro que querés eliminar este curso?")) {
      deleteMutation.mutate(courseId) // ✨ CAMBIO
    }
  }

  return (
    <>
      {onEdit && <EditButton onEdit={onEdit} />}
      <DeleteButton 
        onDelete={handleDelete} 
        disabled={deleteMutation.isPending} // ✨ BONUS: loading state
      />
    </>
  )
}