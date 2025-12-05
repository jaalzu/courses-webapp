"use client"

import { TrashIcon } from "@heroicons/react/24/outline"
import { IconButton } from "@/shared/ui/index"

export function DeleteButton({ onDelete, className = "", noBorder = false }) {
  return (
    <IconButton
      onClick={() => onDelete()}
      noBorder={noBorder}
      className={`text-red-600 hover:text-red-700
                  dark:text-red-500 dark:hover:text-red-400
                  ${className}`}
    >
      <TrashIcon className="w-5 h-5" />
    </IconButton>
  )
}
