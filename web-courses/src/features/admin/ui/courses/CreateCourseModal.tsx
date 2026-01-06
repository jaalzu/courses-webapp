"use client"

import { useState } from "react"
import EditCourseContentModal from "@/features/admin/ui/courses/EditCourseLessonsModal"
import { useCourseStore } from "@/entities/course/model/useCourseStore"
import { CourseFormField } from "@/features/admin/ui/courses/CourseFormField"
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline"

interface CreateCourseModalProps {
  open: boolean
  onClose: () => void
}

export function CreateCourseModal({ open, onClose }: CreateCourseModalProps) {
  const addCourse = useCourseStore(state => state.addCourse)
  const getCourse = useCourseStore(state => state.getCourseById)
  
  const [step, setStep] = useState<'basic' | 'content'>('basic')
  const [tempCourseId, setTempCourseId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    duration: "",
    instructor: "",
    level: "beginner" as const,
  })

  if (!open) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleNext = async () => {
  if (!form.title.trim() || !form.description.trim()) {
    alert("Por favor completa al menos el título y la descripción")
    return
  }

  setIsCreating(true)

  try {
    // Crear el curso con los nombres que espera la interfaz Course
    const newCourse = {
      title: form.title,
      description: form.description,
      image: form.image || '', // Nombre frontend
      duration: form.duration || '',
      instructor: form.instructor || '',
      level: form.level, // Nombre frontend
      keyPoints: [], // Nombre frontend
      lessons: [], // Requerido por Course
      video: '', // Requerido por Course
    }
    
    await addCourse(newCourse)
    
    // Obtener el curso recién creado
    const courses = useCourseStore.getState().courses
    const lastCourse = courses[0] // addCourse lo agrega al inicio
    
    if (lastCourse?.id) {
      setTempCourseId(lastCourse.id)
      setStep('content')
    } else {
      alert("Error: No se pudo crear el curso")
    }
  } catch (error) {
    console.error("Error creando curso:", error)
    alert("Error al crear el curso")
  } finally {
    setIsCreating(false)
  }
}

  const handleContentClose = () => {
    setForm({
      title: "",
      description: "",
      image: "",
      duration: "",
      instructor: "",
      level: "beginner",
    })
    setStep('basic')
    setTempCourseId(null)
    onClose()
  }

  const handleCancel = () => {
    if (step === 'content' && tempCourseId) {
      setStep('basic')
      setTempCourseId(null)
      return
    }
    handleContentClose()
  }

  const tempCourse = tempCourseId ? getCourse(tempCourseId) : null

  return (
    <>
      {/* PASO 1: Modal de información básica */}
      {step === 'basic' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 mb-4 pb-2">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Crear nuevo curso</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Paso 1: Información básica</p>
              </div>
              <button 
                onClick={handleCancel} 
                disabled={isCreating}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
              >
                <XMarkIcon className="w-6 h-6"/>
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <CourseFormField
                label="Título *"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ej: Curso de React Avanzado"
              />

              <CourseFormField
                type="textarea"
                label="Descripción *"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe el contenido del curso..."
              />

              <CourseFormField
                label="Instructor"
                name="instructor"
                value={form.instructor}
                onChange={handleChange}
                placeholder="Nombre del instructor"
              />

              <CourseFormField
                label="Imagen (URL)"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/public/curso1.webp"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CourseFormField
                  label="Duración total"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="Ej: 10 horas"
                />

                <CourseFormField
                  type="select"
                  label="Nivel"
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  options={[
                    { value: "beginner", label: "Principiante" },
                    { value: "intermediate", label: "Intermedio" },
                    { value: "advanced", label: "Avanzado" },
                  ]}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleCancel}
                disabled={isCreating}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                onClick={handleNext}
                disabled={isCreating}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {isCreating ? "Creando..." : "Siguiente"}
                {!isCreating && <ArrowRightIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PASO 2: Reutilizar EditCourseContentModal */}
      {step === 'content' && tempCourse && (
       <EditCourseContentModal
    course={tempCourse}
    isOpen={true}
    onClose={handleContentClose}
    onBack={() => setStep('basic')}
    isNewCourse={true} // 
  />
      )}
    </>
  )
}