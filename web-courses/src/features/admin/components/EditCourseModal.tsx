'use client'
import { useCourseStore } from "@/lib/store/useCoursesStore"
import { Button } from "@/components/ui/button"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useEditCourseForm } from "../hooks/useEditCourseForm"
import { CourseFormField } from "./CourseFormField"
import type { Course } from "@/types/course"

interface Props {
  course: Course
  isOpen: boolean
  onClose: () => void
}

export default function EditCourseModal({ course, isOpen, onClose }: Props) {
  const updateCourse = useCourseStore(state => state.updateCourse)
  const { formData, handleChange, isSaving, setIsSaving } = useEditCourseForm(course, isOpen)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      updateCourse(course.id, formData)
      await new Promise(r => setTimeout(r, 300)) // Simula delay
      onClose()
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 mb-4 pb-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Editar Curso</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <XMarkIcon className="w-6 h-6"/>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <CourseFormField
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ej: Curso de React Avanzado"
          />

          <CourseFormField
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleChange}
            type="textarea"
            placeholder="Describe el contenido del curso..."
          />

          <CourseFormField
            label="Instructor"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            placeholder="Nombre del instructor"
          />

          <CourseFormField
            label="Imagen (URL)"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/images/course.jpg"
          />

          <CourseFormField
            label="Video (URL)"
            name="video"
            value={formData.video}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
          />

          <CourseFormField
            label="Nivel"
            name="level"
            value={formData.level}
            onChange={handleChange}
            type="select"
            options={[
              { value: 'beginner', label: 'Principiante' },
              { value: 'intermediate', label: 'Intermedio' },
              { value: 'advanced', label: 'Avanzado' },
            ]}
          />

          <div className="flex gap-2 mt-4">
            <Button type="button" onClick={onClose} disabled={isSaving}>Cancelar</Button>
            <Button type="submit" disabled={isSaving}>{isSaving ? "Guardando..." : "Guardar"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
