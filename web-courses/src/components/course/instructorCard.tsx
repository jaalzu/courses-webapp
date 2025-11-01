'use client'
import type { InstructorCardProps  } from "@/types"

export default function InstructorCard({ name, profession, image, description }: InstructorCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-3">
      <div className="flex items-center gap-3">
        <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />
        <div>
          <h3 className="text-md font-semibold text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{profession}</p>
        </div>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  )
}