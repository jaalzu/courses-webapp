"use client"

import { useState } from "react"
import { useCourseStore } from "@/lib/store/useCoursesStore"
import type { Course } from "@/types/course"

export function useEditCourse() {
  const getCourse = useCourseStore(state => state.getCourse)

  const [isOpen, setIsOpen] = useState(false)
  const [courseId, setCourseId] = useState<number | null>(null)

  const open = (id: number) => {
    setCourseId(id)
    setIsOpen(true)
  }

  const close = () => {
    setCourseId(null)
    setIsOpen(false)
  }

const course: Course | undefined = courseId !== null ? getCourse(courseId) : undefined


  return {
    isOpen,
    course,
    courseId,
    open,
    close,
  }
}
