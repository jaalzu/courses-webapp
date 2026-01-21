'use client'

import { useState } from "react"
import EditCourseContentModal from "@/features/admin/ui/courses/EditCourseLessonsModal"
import { useCreateCourse, useUpdateCourse } from '@/entities/course/model/useCourseMutations' 
import { useCourses } from '@/entities/course/model/useCourses'
import { CourseFormField } from "@/features/admin/ui/courses/CourseFormField"
import { ImageUploadField } from "@/features/admin/ui/courses/ImageUploadField"
import { uploadCourseImage, validateImage } from "@/shared/lib/supabase/imageUpload"
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { toast } from "sonner"
import { useAdminDemo } from "@/shared/hooks/useAdminDemo"
import type { Course } from "@/entities/course/types"
import type { Lesson } from "@/entities/lesson/types"

interface CreateCourseModalProps {
  open: boolean
  onClose: () => void
}

export function CreateCourseModal({ open, onClose }: CreateCourseModalProps) {
  const createMutation = useCreateCourse() 
  const updateMutation = useUpdateCourse() 
  const { allCourses: courses } = useCourses() 
  const { isDemoAdmin } = useAdminDemo()
  
  const [step, setStep] = useState<'basic' | 'content'>('basic')
  const [tempCourseId, setTempCourseId] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    instructor: "",
    level: "beginner" as const,
    isInitial: false, 
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [imageError, setImageError] = useState<string>("")

  if (!open) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (file: File | null) => {
    if (!file) {
      setImageFile(null)
      setImagePreview("")
      setImageError("")
      return
    }
    const validation = validateImage(file)
    if (!validation.valid) {
      setImageError(validation.error || "Imagen inválida")
      setImageFile(null)
      setImagePreview("")
      return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setImageError("")
  }

  const handleNext = async () => {
    if (!form.title.trim() || !form.description.trim() || !imageFile) {
      toast.error("Faltan campos obligatorios e imagen")
      return
    }

    setIsUploading(true)

    try {
      console.log("¿Es Demo Admin?:", isDemoAdmin);
      if (isDemoAdmin) {
        console.log("🛑 DETENIENDO: No debería tocar la DB");
        const fakeId = "demo-" + Date.now()
        toast.info("Modo Demo: Simulando creación...", { icon: "🚀" })
        setTempCourseId(fakeId)
        setStep('content')
        return 
      }

      const newCourse = {
        title: form.title,
        description: form.description,
        image: '', 
        duration: form.duration || '',
        instructor: form.instructor || '',
        level: form.level,
        is_initial: form.isInitial,
        keyPoints: [],
        lessons: [],
        video: '',
      }
      
      const createdCourse = await createMutation.mutateAsync(newCourse)
      if (!createdCourse?.id) throw new Error("No ID returned")

      const uploadResult = await uploadCourseImage(imageFile, createdCourse.id)
      if (!uploadResult.success) throw new Error(uploadResult.error)

      await updateMutation.mutateAsync({
        courseId: createdCourse.id,
        updates: { image: uploadResult.fileName }
      })
      
      toast.success("Curso creado exitosamente")
      setTempCourseId(createdCourse.id)
      setStep('content')

    } catch (error) {
      console.error(error)
      toast.error("Error al crear el curso")
    } finally {
      setIsUploading(false)
    }
  }

  const handleContentClose = () => {
    setForm({ title: "", description: "", duration: "", instructor: "", level: "beginner", isInitial: false })
    setImageFile(null)
    setImagePreview("")
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

  // Calculamos el curso actual (Real o Fake) sin disparar sets
  const tempCourse = tempCourseId 
    ? (courses?.find(c => c.id === tempCourseId) || { 
        id: tempCourseId, 
        title: form.title, 
        description: form.description, 
        image: imagePreview, 
        level: form.level,
        instructor: form.instructor,
        duration: form.duration,
        lessons: [] as Lesson[], 
        keyPoints: [] as string[],
        video: '',
        is_initial: form.isInitial,
      } as Course) 
    : null
  
  return (
    <>
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
                disabled={isUploading}
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

              {/* Campo de upload de imagen */}
              <ImageUploadField
                value={imageFile}
                onChange={handleImageChange}
                preview={imagePreview}
                error={imageError}
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


                <div className="col-span-full">
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="checkbox"
      checked={form.isInitial}
      onChange={(e) => setForm({ ...form, isInitial: e.target.checked })}
      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
      Curso inicial (acceso automático)
    </span>
  </label>
  <p className="text-xs text-gray-500 ml-6 mt-1">
    Si está marcado, todos los usuarios registrados verán este curso automáticamente
  </p>
</div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleCancel}
                disabled={isUploading}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                onClick={handleNext}
                disabled={isUploading || !imageFile}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 disabled:opacity-50"
              >
                {isUploading ? "Subiendo imagen..." : "Siguiente"}
                {!isUploading && <ArrowRightIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'content' && tempCourse && (
        <EditCourseContentModal
          course={tempCourse}
          isOpen={true}
          onClose={handleContentClose}
          onBack={() => setStep('basic')}
          isNewCourse={true}
        />
      )}
    </>
  )
}