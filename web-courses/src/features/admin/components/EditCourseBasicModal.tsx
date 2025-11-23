'use client'
import { useCourseStore } from "@/lib/store/useCoursesStore"
import { Button } from "@/components/ui/button"
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { useEditCourseForm } from "../hooks/useEditCourseForm"
import { CourseFormField } from "./CourseFormField"
import type { Course } from "@/types/course"

interface Props {
  course: Course
  isOpen: boolean
  onClose: () => void
  onNext: () => void
}

export default function EditCourseBasicModal({ course, isOpen, onClose, onNext }: Props) {
  const updateCourse = useCourseStore(state => state.updateCourse)
  const { formData, handleChange, isSaving, setIsSaving } = useEditCourseForm(course, isOpen)

  const handleSaveAndNext = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      updateCourse(course.id, formData)
      await new Promise(r => setTimeout(r, 300))
      onNext()
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveAndClose = async () => {
    setIsSaving(true)
    try {
      updateCourse(course.id, formData)
      await new Promise(r => setTimeout(r, 300))
      onClose()
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 mb-4 pb-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Editar Curso</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Paso 1: Información básica</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <XMarkIcon className="w-6 h-6"/>
          </button>
        </div>

        <form onSubmit={handleSaveAndNext}>
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
            label="Duración total"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Ej: 10 horas"
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

          <div className="flex justify-between gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button 
              type="button" 
              onClick={onClose} 
              disabled={isSaving}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancelar
            </Button>
            
            <div className="flex gap-2">
              <Button 
                type="button" 
                onClick={handleSaveAndClose} 
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSaving ? "Guardando..." : "Guardar"}
              </Button>
              
              <Button 
                type="submit" 
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                {isSaving ? "Guardando..." : "Siguiente"}
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}