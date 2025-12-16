"use client"

import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

interface IconButtonProps {
  onClick: (e: React.MouseEvent) => void
  children: React.ReactNode
  className?: string
  noBorder?: boolean
  tooltip?: string // 👈 Esta línea debe estar
}

export function IconButton({ 
  onClick, 
  children, 
  className = "", 
  noBorder = false,
  tooltip // 👈 Destructurar
}: IconButtonProps) {
  const button = (
    <button
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick(e)
      }}
      className={`
        relative z-10 
        backdrop-blur-xl 
        ${noBorder
          ? "bg-transparent border-none"
          : `
            bg-white/30 dark:bg-black/30 
            border border-gray-300 
            dark:border-white/40
          `}
        rounded-full p-1.5
        hover:backdrop-blur-2xl
        ${!noBorder &&
          `
            hover:bg-white/40 dark:hover:bg-black/50 
            hover:border-gray-400
            dark:hover:border-white/60
          `}
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {children}
    </button>
  )

  if (!tooltip) return button

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}