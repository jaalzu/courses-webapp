"use client"

import { TrashIcon } from "@heroicons/react/24/outline"
import { IconButton } from "@/shared/ui/index"

interface DeleteButtonProps {
  onDelete: () => void
  className?: string
  noBorder?: boolean
  tooltip?: string
    disabled?: boolean 

}

export function DeleteButton({ 
  onDelete, 
  className = "", 
  noBorder = false,
  tooltip = "Eliminar",
  disabled
}: DeleteButtonProps) {
  return (
    <IconButton
      onClick={() => onDelete()}
      noBorder={noBorder}
      tooltip={tooltip} 
      disabled={disabled}
      className={`text-red-600 hover:text-red-700
                  dark:text-red-500 dark:hover:text-red-400
                  ${className}`}
    >
      <TrashIcon className="w-5 h-5" />
    </IconButton>
  )
}