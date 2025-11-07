"use client"

import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline"
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid"

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
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onToggle()
      }}
      aria-label="Toggle Favorite"
      className={`relative z-10 
        backdrop-blur-xl 
        ${noBorder ? "bg-transparent border-none" : "bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/40"} 
        rounded-full p-1.5
        text-red-500 hover:text-red-600 
        dark:text-red-400 dark:hover:text-red-500
        hover:backdrop-blur-2xl 
        ${!noBorder && "hover:bg-white/40 dark:hover:bg-black/50 hover:border-white/80 dark:hover:border-white/30"} 
        transition-all duration-300 ease-out 
        ${className}`}
    >
      {isFavorite ? (
        <HeartSolid className="w-5 h-5" />
      ) : (
        <HeartOutline className="w-5 h-5" />
      )}
    </button>
  )
}
