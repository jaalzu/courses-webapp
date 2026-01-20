'use client'

import { useState } from 'react'
import { useUpdateCourse } from '@/entities/course/model/useCourseMutations'
import { Button } from "@/shared/ui/index"
import { XMarkIcon, PlusIcon, TrashIcon ,PencilIcon} from "@heroicons/react/24/outline"
import { CourseFormField } from "./CourseFormField"
import { ImageUploadField } from "./ImageUploadField"
import { uploadCourseImage, validateImage } from "@/shared/lib/supabase/imageUpload"
import { useEditCourseForm } from "../../hooks/useEditCourseForm"
import { toast } from 'sonner'
import type { Course } from "@/entities/course/types"
import type { Lesson } from "@/entities/lesson/types"

interface Props {
  course: Course
  isOpen: boolean
  onClose: () => void
}

type Tab = 'basic' | 'content'

export default function EditCourseModal({ course, isOpen, onClose }: Props) {
  const updateMutation = useUpdateCourse()
  const { formData, handleChange } = useEditCourseForm(course, isOpen)
  
  const [activeTab, setActiveTab] = useState<Tab>('basic')
  
  // Estados de imagen
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(formData.image)
  const [imageError, setImageError] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  // Estados de contenido
  const [keyPoints, setKeyPoints] = useState<string[]>(course.keyPoints || [])
  const [keyPointInput, setKeyPointInput] = useState('')
  const [lessons, setLessons] = useState<Lesson[]>(course.lessons || [])
  const [lessonForm, setLessonForm] = useState({ title: '', duration: '', videoUrl: '' })
  const [editingLesson, setEditingLesson] = useState<string | null>(null)

  if (!isOpen) return null

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setImageFile(null)
      setImagePreview(formData.image)
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

 const handleSave = async () => {
    setIsUploading(true)
    
    try {
      let imageUrl = formData.image 

      if (imageFile) {
        const uploadResult = await uploadCourseImage(imageFile, course.id)
        if (!uploadResult.success) {
          toast.error(uploadResult.error || "Error al subir la imagen")
          return
        }
        imageUrl = uploadResult.url || formData.image
      }

      await updateMutation.mutateAsync({
        courseId: course.id,
        updates: {
          ...formData,
          image: imageUrl, 
          keyPoints,
          lessons,
        }
      })

      onClose()
    } catch (error) {
      console.error("Error al guardar:", error)
    } finally {
      setIsUploading(false)
    }
  }



  // Funciones de key points
  const handleAddKeyPoint = () => {
    if (!keyPointInput.trim()) return
    setKeyPoints([...keyPoints, keyPointInput.trim()])
    setKeyPointInput('')
  }

  const handleDeleteKeyPoint = (index: number) => {
    setKeyPoints(keyPoints.filter((_, i) => i !== index))
  }

  // Funciones de lecciones
  const handleAddLesson = () => {
    if (!lessonForm.title.trim() || !lessonForm.duration.trim()) return

    const newLesson: Lesson = {
      id: crypto.randomUUID(),
      title: lessonForm.title,
      duration: lessonForm.duration,
      videoUrl: lessonForm.videoUrl,
    }

    setLessons([...lessons, newLesson])
    setLessonForm({ title: '', duration: '', videoUrl: '' })
  }

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson.id)
    setLessonForm({
      title: lesson.title,
      duration: lesson.duration,
      videoUrl: lesson.videoUrl || '',
    })
  }

  const handleUpdateLesson = () => {
    if (!lessonForm.title.trim() || !lessonForm.duration.trim()) return

    setLessons(lessons.map(l =>
      l.id === editingLesson
        ? { ...l, title: lessonForm.title, duration: lessonForm.duration, videoUrl: lessonForm.videoUrl }
        : l
    ))
    setEditingLesson(null)
    setLessonForm({ title: '', duration: '', videoUrl: '' })
  }

  const handleDeleteLesson = (id: string) => {
    setLessons(lessons.filter(l => l.id !== id))
  }

  const isSaving = updateMutation.isPending || isUploading

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-6 pb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Editar Curso
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <XMarkIcon className="w-6 h-6"/>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'basic'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Información Básica
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'content'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Lecciones y Contenido
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'basic' && (
            <div className="space-y-4">
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
                required={false}
              />

              <div className="grid grid-cols-2 gap-4">
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
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Key Points */}
              <div>
                <h3 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Puntos Clave</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    value={keyPointInput}
                    onChange={(e) => setKeyPointInput(e.target.value)}
                    placeholder="Añadir punto clave..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddKeyPoint()}
                  />
                  <Button onClick={handleAddKeyPoint} className="h-10 px-4 flex items-center gap-2">
                    <PlusIcon className="w-4 h-4" />
                    Añadir
                  </Button>
                </div>
                
                {keyPoints.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic text-center py-4">
                    No hay puntos clave todavía
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-medium mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 pt-0.5">
                          {point}
                        </span>
                        <button 
                          onClick={() => handleDeleteKeyPoint(idx)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                        >
                          <TrashIcon className="w-4 h-4 text-red-500" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Lessons */}
              <div>
                <h3 className="font-medium mb-3">Lecciones</h3>
                <div className="space-y-3 mb-4">
                  <input
                    value={lessonForm.title}
                    onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                    placeholder="Título de la lección"
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                  />
                  <input
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                    placeholder="Duración (ej: 10 min)"
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                  />
                  <input
                    value={lessonForm.videoUrl}
                    onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                    placeholder="URL del video (opcional)"
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                  />
                  <Button
                    onClick={editingLesson ? handleUpdateLesson : handleAddLesson}
                    size="sm"
                  >
                    {editingLesson ? 'Actualizar' : 'Añadir'} Lección
                  </Button>
                </div>

                <ul className="space-y-2">
                  {lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-center gap-2 p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{lesson.title}</p>
                        <p className="text-xs text-gray-500">{lesson.duration}</p>
                      </div>
                      <button onClick={() => handleEditLesson(lesson)}>
                        <PencilIcon className="w-4 h-4 text-blue-500" />
                      </button>
                      <button onClick={() => handleDeleteLesson(lesson.id)}>
                        <TrashIcon className="w-4 h-4 text-red-500" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={onClose} variant="outline" disabled={isSaving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </div>
    </div>
  )
}