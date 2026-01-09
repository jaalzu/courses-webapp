'use client'
import { useUpdateCourse } from '@/entities/course/model/useCourseMutations' // ✨ CAMBIO
import { Button } from "@/shared/ui/index"
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { useEditCourseForm } from "../../hooks/useEditCourseForm"
import { CourseFormField } from "../courses/CourseFormField"
import type { Course } from "@/entities/course/types"

interface Props {
  course: Course
  isOpen: boolean
  onClose: () => void
  onNext: () => void
}

export default function EditCourseBasicModal({ course, isOpen, onClose, onNext }: Props) {
  const updateMutation = useUpdateCourse() // ✨ CAMBIO
  const { formData, handleChange } = useEditCourseForm(course, isOpen) // ✨ Elimina isSaving, setIsSaving

  const handleSaveAndNext = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateMutation.mutateAsync({ // ✨ CAMBIO
        courseId: course.id, 
        updates: formData 
      })
      onNext()
    } catch (error) {
      // El error ya se maneja en useUpdateCourse
    }
  }

  const handleSaveAndClose = async () => {
    try {
      await updateMutation.mutateAsync({ // ✨ CAMBIO
        courseId: course.id, 
        updates: formData 
      })
      onClose()
    } catch (error) {
      // El error ya se maneja en useUpdateCourse
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
    maxLength={60} 
  />

         <CourseFormField
    label="Descripción"
    name="description"
    value={formData.description}
    onChange={handleChange}
    type="textarea"
    placeholder="Describe el contenido del curso..."
    maxLength={500} 
  />

         <CourseFormField
    label="Instructor"
    name="instructor"
    value={formData.instructor}
    onChange={handleChange}
    placeholder="Nombre del instructor"
    maxLength={40} 
  />

          <CourseFormField
            label="Imagen (URL)"
            name="image"
            value={formData.image}
            onChange={handleChange}
                placeholder="/public/curso1.webp"
          />

          <CourseFormField
    label="Duración total"
    name="duration"
    value={formData.duration}
    onChange={handleChange}
    placeholder="Ej: 10 horas"
    maxLength={20} 
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
              disabled={updateMutation.isPending}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Cancelar
            </Button>
            
            <div className="flex gap-2">
              <Button 
                type="button" 
                onClick={handleSaveAndClose} 
                disabled={updateMutation.isPending}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {updateMutation.isPending ? "Guardando..." : "Guardar"}
              </Button>
              
              <Button 
                type="submit" 
                disabled={updateMutation.isPending}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                {updateMutation.isPending ? "Guardando..." : "Siguiente"}
                <ArrowRightIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}