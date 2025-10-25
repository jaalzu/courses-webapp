'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface Completed {
  done: number
  total: number
}

interface CardProps {
  image: string
  title: string
  description: string
  progress: number
  completed?: Completed
  href: string 
  className?: string
}

export default function Card({
  image,
  title,
  description,
  progress = 0,
  completed,
  href,
  className = '',
}: CardProps) {
  return (
    <Link
      href={href}
      className={`
        bg-white 
        dark:bg-neutral-900
        text-black 
        dark:text-gray-100
        rounded-md 
        overflow-hidden 
        flex flex-col 
        transition-transform 
        shadow-sm 
        hover:shadow-md 
        duration-300 
        ${className}
      `}
    >
      {/* Imagen */}
      <img src={image} alt={title} className="w-full h-40 object-cover" />

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1 min-h-[260px] md:min-h-[260px] justify-between">
        <div>
          <h3 className="text-lg font-semibold leading-tight mb-4 mt-2">{title}</h3>
          <p className="text-gray-500 dark:text-gray-300 text-sm mb-9">{description}</p>
        </div>
        <div>
          <Button className="w-full mb-4 pointer-events-none">Entrar</Button>
          {completed && (
            <div className="flex justify-between mt-6">
              <span className="text-sm text-gray-600 dark:text-gray-200 font-medium">Completadas</span>
              <span className="text-sm text-gray-600 dark:text-gray-200 font-medium">
                {completed.done}/{completed.total}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Barra de progreso */}
      <Progress value={progress} className="h-1.5 w-full" />
    </Link>
  )
}
