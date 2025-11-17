"use client"

import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid"
import { IconButton } from "@/components/ui/iconButton"

interface FavoriteButtonProps {
  isFavorite: boolean
  onToggle: () => void
  className?: string
  noBorder?: boolean
}

export function FavoriteButton({
  isFavorite,
  onToggle,
  className = "",
  noBorder = false,
}: FavoriteButtonProps) {
  return (
    <IconButton
      onClick={() => onToggle()}
      noBorder={noBorder}
      className={`
        text-red-500 hover:text-red-600 
        dark:text-red-500 dark:hover:text-red-400
        ${className}
      `}
    >
      {isFavorite ? (
        <HeartSolid className="w-5 h-5" />
      ) : (
        <HeartOutline className="w-5 h-5" />
      )}
    </IconButton>
  )
}
