import { Course } from "@/types/course"
import { Button } from "@/components/ui/button"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useEditCourseForm } from "../hooks/useEditCourseForm"
import { useCourseStore } from "@/lib/store/useCoursesStore"

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
      // Simula delay
      await new Promise(r => setTimeout(r, 300))
      onClose()
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
  {/* Overlay con blur */}
  <div
    className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
    onClick={onClose}
  />

  {/* Modal container */}
  <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-transform transform scale-100">
    {/* Header */}
    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 bg-white dark:bg-gray-900 z-10">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Editar Curso</h2>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
      >
        <XMarkIcon className="w-6 h-6"/>
      </button>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instructor</label>
          <input
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nivel</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Imagen (URL)</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          {formData.image && (
            <img
              src={formData.image.startsWith("/") ? formData.image : `/${formData.image}`}
              alt="Preview"
              className="mt-2 h-32 w-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Video (URL)</label>
          <input
            name="video"
            value={formData.video}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 mt-4">
        <Button type="button" onClick={onClose} disabled={isSaving} variant="outline">Cancelar</Button>
        <Button type="submit" disabled={isSaving}>{isSaving ? "Guardando..." : "Guardar"}</Button>
      </div>
    </form>
  </div>
</div>

  )
}
