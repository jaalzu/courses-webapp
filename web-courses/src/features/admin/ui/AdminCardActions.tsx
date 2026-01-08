// AdminCardActions.tsx
'use client'

import { EditButton } from "@/features/admin/ui/shared/EditButton"
import { DeleteButton } from "@/features/admin/ui/shared/DeleteButton"
import { useCourses } from "@/entities/course/model/useCourses"

interface AdminCardActionsProps {
  courseId: string
  onEdit?: () => void
}

export function AdminCardActions({ courseId, onEdit }: AdminCardActionsProps) {
  const { deleteCourse } = useCourses()

  const handleDelete = () => {
    if (confirm("¿Seguro que querés eliminar este curso?")) {
      deleteCourse(courseId)
    }
  }

  return (
    <>
      {onEdit && <EditButton onEdit={onEdit} />}
      <DeleteButton onDelete={handleDelete} />
    </>
  )
}