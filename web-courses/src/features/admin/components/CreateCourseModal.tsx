"use client"

import { useState } from "react"
import { useCourseStore } from "@/lib/store/useCoursesStore"
import { CourseFormField } from "@/features/admin/components/CourseFormField"

export function CreateCourseModal({ open, onClose }) {
  const addCourse = useCourseStore(state => state.addCourse)

  // estado local básico
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    level: "beginner",
    instructor: "",
    lessons: [],
  })

  if (!open) return null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    addCourse(form)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[95%] max-w-lg space-y-4">
        <h2 className="text-xl font-bold">Crear nuevo curso</h2>

        <CourseFormField
          label="Título"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Ej: Curso de React"
        />

        <CourseFormField
          type="textarea"
          label="Descripción"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Una descripción breve..."
        />

        <CourseFormField
          label="Imagen (URL)"
          name="image"
          value={form.image}
          onChange={handleChange}
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

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-2 rounded-lg bg-blue-600 text-white"
          >
            Crear curso
          </button>
        </div>
      </div>
    </div>
  )
}
