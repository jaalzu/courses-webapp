"use client"

import { useState } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { IconButton } from "@/shared/ui/index"
import { CreateCourseModal } from "@/features/admin/ui/courses/CreateCourseModal"

export function NewCourseButton({ className = "" }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        noBorder={false}
        className={`
          flex items-center gap-3 px-4 py-2 
          text-blue-700 hover:text-blue-700 
          dark:text-blue-400 dark:hover:text-blue-300
          ${className}
        `}
      >
        <PlusIcon className="w-5 h-5" />
        <span className="font-medium">Crear curso</span>
      </IconButton>

      <CreateCourseModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
