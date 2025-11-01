'use client'

import type { InstructorCardProps } from "@/types"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar" // o desde shadcn

export default function InstructorCard({ name, profession, image, description }: InstructorCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 space-y-3">
      <div className="flex items-center gap-3">
        {/* Componente Avatar */}
        <Avatar className="w-17 h-17">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>

        <div>
          <h3 className="text-md font-semibold text-green-600">{name}</h3>
          <p className="text-sm text-gray-300 underline" >{profession}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}
