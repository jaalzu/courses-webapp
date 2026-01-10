'use client'

import { useState } from 'react'
import { useUpdateCourse } from '@/entities/course/model/useCourseMutations' 
import { Button } from "@/shared/ui/index"
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { useEditCourseForm } from "../../hooks/useEditCourseForm"
import { CourseFormField } from "../courses/CourseFormField"
import { ImageUploadField } from "../courses/ImageUploadField"
import { uploadCourseImage, validateImage } from "@/shared/lib/supabase/imageUpload"
import { toast } from 'sonner'
import type { Course } from "@/entities/course/types"

interface Props {
  course: Course
  isOpen: boolean
  onClose: () => void
  onNext: () => void
}

export default function EditCourseBasicModal({ course, isOpen, onClose, onNext }: Props) {
  const updateMutation = useUpdateCourse() 
  const { formData, handleChange } = useEditCourseForm(course, isOpen)
  
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(formData.image)
  const [imageError, setImageError] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setImageFile(null)
      setImagePreview(formData.image) // Volver a la imagen original
      setImageError("")
      return
    }

    const validation = validateImage(file)
    if (!validation.valid) {
      setImageError(validation.error || "Imagen inválida")
      setImageFile(null)
      setImagePreview(formData.image)
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setImageError("")
  }

  const handleSaveAndNext = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsUploading(true)
    
    try {
      let imageUrl = formData.image

      // Si hay una nueva imagen, subirla primero
      if (imageFile) {
        const uploadResult = await uploadCourseImage(imageFile, course.id)
        if (!uploadResult.success) {
          toast.error(uploadResult.error || "Error al subir la imagen")
          setIsUploading(false)
          return
        }
        imageUrl = uploadResult.url || formData.image
      }

      await updateMutation.mutateAsync({ 
        courseId: course.id, 
        updates: { ...formData, image: imageUrl }
      })
      
      onNext()
    } catch (error) {
      console.error("Error al guardar:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSaveAndClose = async () => {
    setIsUploading(true)
    
    try {
      let imageUrl = formData.image

      // Si hay una nueva imagen, subirla primero
      if (imageFile) {
        const uploadResult = await uploadCourseImage(imageFile, course.id)
        if (!uploadResult.success) {
          toast.error(uploadResult.error || "Error al subir la imagen")
          setIsUploading(false)
          return
        }
        imageUrl = uploadResult.url || formData.image
      }

      await updateMutation.mutateAsync({ 
        courseId: course.id, 
        updates: { ...formData, image: imageUrl }
      })
      
      onClose()
    } catch (error) {
      console.error("Error al guardar:", error)
    } finally {
      setIsUploading(false)
    }
  }

  if (!isOpen) return null

  const isSaving = updateMutation.isPending || isUploading

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

        <form onSubmit={handleSaveAndNext} className="space-y-4">
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

          <ImageUploadField
            value={imageFile}
            onChange={handleImageChange}
            preview={imagePreview}
            error={imageError}
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