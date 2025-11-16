"use client"

import { PencilIcon } from "@heroicons/react/24/outline"

interface EditButtonProps {
  onEdit: () => void
  className?: string
  noBorder?: boolean
}

export function EditButton({
  onEdit,
  className = "",
  noBorder = false,
}: EditButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onEdit()
      }}
      aria-label="Editar"
      className={`relative z-10 
        backdrop-blur-xl 
        ${noBorder ? "bg-transparent border-none" : "bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/40"} 
        rounded-full p-1.5
        text-blue-600 hover:text-blue-700 
        dark:text-blue-400 dark:hover:text-blue-300
        hover:backdrop-blur-2xl 
        ${!noBorder && "hover:bg-white/40 dark:hover:bg-black/50 hover:border-white/80 dark:hover:border-white/30"} 
        transition-all duration-300 ease-out 
        ${className}`}
    >
      <PencilIcon className="w-5 h-5" />
    </button>
  )
}