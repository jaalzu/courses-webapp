"use client"

import { PencilIcon } from "@heroicons/react/24/outline"
import { IconButton } from "@/components/ui/iconButton"

export function EditButton({ onEdit, className = "", noBorder = false }) {
  return (
    <IconButton
      onClick={() => onEdit()}
      noBorder={noBorder}
      className={`text-blue-600 hover:text-blue-700
                  dark:text-blue-400 dark:hover:text-blue-300
                  ${className}`}
    >
      <PencilIcon className="w-5 h-5" />
    </IconButton>
  )
}
