"use client"

import { PencilIcon } from "@heroicons/react/24/outline"
import { IconButton } from "@/shared/ui/index"

interface EditButtonProps {
  onEdit: () => void
  className?: string
  noBorder?: boolean
  tooltip?: string // 
}

export function EditButton({ 
  onEdit, 
  className = "", 
  noBorder = false,
  tooltip = "Editar" 
}: EditButtonProps) {
  return (
    <IconButton
      onClick={() => onEdit()}
      noBorder={noBorder}
      tooltip={tooltip} // 👈 Pasar al IconButton
      className={`text-blue-600 hover:text-blue-700
                  dark:text-blue-400 dark:hover:text-blue-300
                  ${className}`}
    >
      <PencilIcon className="w-5 h-5" />
    </IconButton>
  )
}