"use client"

import { useState } from "react"
import EditCourseContentModal from "@/features/admin/ui/courses/EditCourseLessonsModal"
import { useCreateCourse } from '@/entities/course/model/useCourseMutations' // ✨ CAMBIO
import { useCourses } from '@/entities/course/model/useCourses' // ✨ CAMBIO

import { CourseFormField } from "@/features/admin/ui/courses/CourseFormField"
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { toast } from "sonner"

interface CreateCourseModalProps {
  open: boolean
  onClose: () => void
}

export function CreateCourseModal({ open, onClose }: CreateCourseModalProps) {
  const createMutation = useCreateCourse() 
  const { allCourses: courses } = useCourses() 
  
  const [step, setStep] = useState<'basic' | 'content'>('basic')
  const [tempCourseId, setTempCourseId] = useState<string | null>(null)

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
      toast.error("El título y la descripción son obligatorios")
      return
    }

    if (form.title.length > 60) {
      toast.warning("El título no puede tener más de 60 caracteres")
      return
    }

    if (form.description.length > 500) {
      toast.warning("La descripción es demasiado larga (máx. 500)")
      return
    }

    try {
      const newCourse = {
        title: form.title,
        description: form.description,
        image: form.image || '',
        duration: form.duration || '',
        instructor: form.instructor || '',
        level: form.level,
        keyPoints: [],
        lessons: [],
        video: '',
      }
      
      // ✨ CAMBIO: usa mutateAsync y guarda el resultado
      const createdCourse = await createMutation.mutateAsync(newCourse)
      
      if (createdCourse?.id) {
        setTempCourseId(createdCourse.id) // ✨ Usa el ID del curso creado directamente
        setStep('content')
        // ✨ El toast de éxito ya se muestra en useCreateCourse
      } else {
        toast.error("No se pudo obtener el ID del curso creado")
      }
    } catch (error) {
      // ✨ El toast de error ya se muestra en useCreateCourse
      console.error("Error creando curso:", error)
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

  const tempCourse = tempCourseId ? courses?.find(c => c.id === tempCourseId) : null


  return (
    <>
      {/*  Modal de información básica */}
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
                disabled={createMutation.isPending}
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
    maxLength={60} 
  />

             <CourseFormField
    type="textarea"
    label="Descripción *"
    name="description"
    value={form.description}
    onChange={handleChange}
    placeholder="Describe el contenido del curso..."
    maxLength={500} 
  />

             <CourseFormField
    label="Instructor"
    name="instructor"
    value={form.instructor}
    onChange={handleChange}
    placeholder="Nombre del instructor"
    maxLength={40} 
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
      maxLength={20} 
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
                disabled={createMutation.isPending}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                onClick={handleNext}
                disabled={createMutation.isPending}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {createMutation.isPending ? "Creando..." : "Siguiente"}
                {!createMutation.isPending && <ArrowRightIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/*Reutilizar EditCourseContentModal */}
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