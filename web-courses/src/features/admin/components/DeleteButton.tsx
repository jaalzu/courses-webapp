'use client'

import { TrashIcon } from "@heroicons/react/24/outline"

interface DeleteButtonProps {
  onDelete: () => void
  className?: string
  noBorder?: boolean
}

export function DeleteButton({
  onDelete,
  className = "",
  noBorder = false,
}: DeleteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onDelete()
      }}
      aria-label="Eliminar"
      className={`relative z-10 
        backdrop-blur-xl 
        ${noBorder ? "bg-transparent border-none" : "bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/40"} 
        rounded-full p-1.5
        text-red-600 hover:text-blue-700 
        dark:text-red-500 dark:hover:text-red-500
        hover:backdrop-blur-2xl 
        ${!noBorder && "hover:bg-white/40 dark:hover:bg-black/50 hover:border-white/80 dark:hover:border-white/30"} 
        transition-all duration-300 ease-out 
        ${className}`}
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  )
}
