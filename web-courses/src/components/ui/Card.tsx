'use client'

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
  className?: string
}

export default function Card({
  image,
  title,
  description,
  progress = 0,
  completed,
  className = '',
}: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col ${className}`}>
      {/* Imagen */}
      <img src={image} alt={title} className="w-full h-40 object-cover" />

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>

        <Button className="w-full mb-4">Entrar</Button>

        {completed && (
  <div className="flex justify-between mt-3">
    <span className="text-sm text-gray-600 font-medium">Completadas</span>
    <span className="text-sm text-gray-600 font-medium">
      {completed.done}/{completed.total}
    </span>
  </div>
)}
      </div>
      {/* Barra de progreso al borde del card */}
      <Progress value={progress} className="h-1.5  w-full" />
    </div>
  )
}
