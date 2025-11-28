"use client"


import { useState } from "react"
import EditCourseContentModal from "@/features/admin/components/EditCourseLessonsModal"
import { useCourseStore } from "@/lib/store/useCoursesStore"
import { CourseFormField } from "@/features/admin/components/CourseFormField"
import { XMarkIcon, ArrowRightIcon } from "@heroicons/react/24/outline"

interface CreateCourseModalProps {
  open: boolean
  onClose: () => void
}

export function CreateCourseModal({ open, onClose }: CreateCourseModalProps) {
  const addCourse = useCourseStore(state => state.addCourse)
  const getCourse = useCourseStore(state => state.getCourse)
  const [step, setStep] = useState<'basic' | 'content'>('basic')
  const [tempCourseId, setTempCourseId] = useState<number | null>(null)

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

  const handleNext = () => {
    // Validación básica
    if (!form.title.trim() || !form.description.trim()) {
      alert("Por favor completa al menos el título y la descripción")
      return
    }

    // Crear el curso temporal con info básica
    const newCourse = {
      ...form,
      lessons: [],
      keyPoints: [],
      extraInfo: "",
    }
    
    addCourse(newCourse)
    
    // Obtener el ID del último curso agregado
    const courses = useCourseStore.getState().courses
    const lastCourse = courses[courses.length - 1]
    setTempCourseId(lastCourse.id)
    
    // Pasar al paso 2
    setStep('content')
  }

  const handleContentClose = () => {
    // Reset todo
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
    // Si estamos en el paso 2 y ya se creó el curso, volver al paso 1
    if (step === 'content' && tempCourseId) {
      setStep('basic')
      setTempCourseId(null)
      return
    }
    
    // Si estamos en paso 1, simplemente cerrar
    handleContentClose()
  }

  // Obtener el curso temporal para el paso 2
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
              <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
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
                placeholder="/images/course.jpg"
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
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium"
              >
                Cancelar
              </button>

              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2"
              >
                Siguiente
                <ArrowRightIcon className="w-4 h-4" />
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
        />
      )}
    </>
  )
}

// "use client"

// import { useState } from "react"
// import { useCourseStore } from "@/lib/store/useCoursesStore"
// import { CourseFormField } from "@/features/admin/components/CourseFormField"
// import { XMarkIcon } from "@heroicons/react/24/outline"

// interface CreateCourseModalProps {
//   open: boolean
//   onClose: () => void
// }

// export function CreateCourseModal({ open, onClose }: CreateCourseModalProps) {
//   const addCourse = useCourseStore(state => state.addCourse)

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     image: "",
//     video: "",
//     duration: "",
//     instructor: "",
//     level: "beginner" as const,
//     keyPoints: [] as string[],
//     extraInfo: "",
//     lessons: [],
//   })

//   const [keyPointInput, setKeyPointInput] = useState("")

//   if (!open) return null

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleAddKeyPoint = () => {
//     if (!keyPointInput.trim()) return
//     setForm({ ...form, keyPoints: [...form.keyPoints, keyPointInput.trim()] })
//     setKeyPointInput("")
//   }

//   const handleDeleteKeyPoint = (index: number) => {
//     setForm({ ...form, keyPoints: form.keyPoints.filter((_, i) => i !== index) })
//   }

//   const handleSubmit = () => {
//     // Validación básica
//     if (!form.title.trim() || !form.description.trim()) {
//       alert("Por favor completa al menos el título y la descripción")
//       return
//     }

//     addCourse(form)
    
//     // Reset form
//     setForm({
//       title: "",
//       description: "",
//       image: "",
//       video: "",
//       duration: "",
//       instructor: "",
//       level: "beginner",
//       keyPoints: [],
//       extraInfo: "",
//       lessons: [],
//     })
    
//     onClose()
//   }

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 mb-4 pb-2">
//           <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Crear nuevo curso</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
//             <XMarkIcon className="w-6 h-6"/>
//           </button>
//         </div>

//         {/* Form */}
//         <div className="space-y-4">
//           <CourseFormField
//             label="Título *"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="Ej: Curso de React Avanzado"
//           />

//           <CourseFormField
//             type="textarea"
//             label="Descripción *"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Describe el contenido del curso..."
//           />

//           <CourseFormField
//             label="Instructor"
//             name="instructor"
//             value={form.instructor}
//             onChange={handleChange}
//             placeholder="Nombre del instructor"
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <CourseFormField
//               label="Imagen (URL)"
//               name="image"
//               value={form.image}
//               onChange={handleChange}
//               placeholder="/images/course.jpg"
//             />

//             <CourseFormField
//               label="Video principal (URL)"
//               name="video"
//               value={form.video}
//               onChange={handleChange}
//               placeholder="https://www.youtube.com/watch?v=..."
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <CourseFormField
//               label="Duración total"
//               name="duration"
//               value={form.duration}
//               onChange={handleChange}
//               placeholder="Ej: 10 horas"
//             />

//             <CourseFormField
//               type="select"
//               label="Nivel"
//               name="level"
//               value={form.level}
//               onChange={handleChange}
//               options={[
//                 { value: "beginner", label: "Principiante" },
//                 { value: "intermediate", label: "Intermedio" },
//                 { value: "advanced", label: "Avanzado" },
//               ]}
//             />
//           </div>

//           {/* Extra Info */}
//           <CourseFormField
//             type="textarea"
//             label="Información Extra"
//             name="extraInfo"
//             value={form.extraInfo}
//             onChange={handleChange}
//             placeholder="Información adicional sobre el curso..."
//           />

//           {/* Key Points */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//               Puntos Clave
//             </label>
            
//             <div className="flex gap-2 mb-3">
//               <input
//                 type="text"
//                 value={keyPointInput}
//                 onChange={(e) => setKeyPointInput(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyPoint())}
//                 placeholder="Agregar punto clave..."
//                 className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
//               />
//               <button
//                 onClick={handleAddKeyPoint}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Agregar
//               </button>
//             </div>

//             {form.keyPoints.length > 0 && (
//               <ul className="space-y-2">
//                 {form.keyPoints.map((point, index) => (
//                   <li
//                     key={index}
//                     className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
//                   >
//                     <span className="text-sm text-gray-700 dark:text-gray-300">• {point}</span>
//                     <button
//                       onClick={() => handleDeleteKeyPoint(index)}
//                       className="text-red-600 hover:text-red-700 text-sm font-medium"
//                     >
//                       Eliminar
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>