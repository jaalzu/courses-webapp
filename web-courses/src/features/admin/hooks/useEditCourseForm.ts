import { useState, useEffect } from "react"
import { Course, CourseLevel } from "@/types/course"

export function useEditCourseForm(course: Course, isOpen: boolean) {
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    image: course.image,
    video: course.video,
    instructor: course.instructor || "",
    level: course.level || "beginner" as CourseLevel,
  })

  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: course.title,
        description: course.description,
        image: course.image,
        video: course.video,
        instructor: course.instructor || "",
        level: course.level || "beginner",
      })
    }
  }, [isOpen, course])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return { formData, setFormData, isSaving, setIsSaving, handleChange }
}
