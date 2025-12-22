'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/index"

interface InstructorCardProps {
  name: string
  profession: string
  image?: string
  description: string
}

export default function InstructorCard({
  name,
  profession,
  image,
  description,
}: InstructorCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Avatar className="w-16 h-16">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div>
          <h3 className="text-md font-semibold text-green-600">
            {name}
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 underline">
            {profession}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  )
}
