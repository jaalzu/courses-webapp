'use client'

import { Avatar, AvatarFallback } from "@/shared/ui/index"
import { getAvatarColor, getInitials } from "@/shared/lib/utils/avatar"

interface InstructorCardProps {
  name: string
  profession: string
  description: string
}

export default function InstructorCard({
  name,
  profession,
  description,
}: InstructorCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Avatar className="w-16 h-16">
          <AvatarFallback className={`${getAvatarColor(name)} text-white`}>
            {getInitials(name)}
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

