'use client'
import { useState } from "react"
import { useUpdateCourse } from "@/entities/course/model/useCourseMutations" // ✨ CAMBIO
import { Button } from "@/shared/ui/index"
import { XMarkIcon, ArrowLeftIcon, PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline"
import type { Course } from "@/entities/course/types"
import type { Lesson } from "@/entities/lesson/types"

interface Props {
  course: Course
  isOpen: boolean
  onClose: () => void
  onBack: () => void
  isNewCourse?: boolean
}

export default function EditCourseContentModal({ course, isOpen, onClose, onBack, isNewCourse = false}: Props) {
  const updateMutation = useUpdateCourse() // ✨ CAMBIO

  // Estado para key points
  const [keyPoints, setKeyPoints] = useState<string[]>(isNewCourse ? [] : (course.keyPoints || []))
  const [keyPointInput, setKeyPointInput] = useState('')

  // Estado para lecciones
  const [lessons, setLessons] = useState<Lesson[]>(course.lessons?.length ? course.lessons : [])
  const [editingLesson, setEditingLesson] = useState<string | null>(null)

  // Form para lección
  const [lessonForm, setLessonForm] = useState({
    title: '',
    duration: '',
    videoUrl: '',
  })

  // ===== FUNCIONES PARA KEY POINTS =====
  const handleAddKeyPoint = () => {
    if (!keyPointInput.trim()) return
    setKeyPoints([...keyPoints, keyPointInput.trim()])
    setKeyPointInput('')
  }

  const handleDeleteKeyPoint = (index: number) => {
    setKeyPoints(keyPoints.filter((_, i) => i !== index))
  }

  // ===== FUNCIONES PARA LECCIONES =====
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

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({ // ✨ CAMBIO
        courseId: course.id, 
        updates: { keyPoints, lessons }
      })
      onClose()
    } catch (error) {
      // El error ya se maneja en useUpdateCourse con toast
    }
  }

  if (!isOpen) return null



return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 mb-6 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Editar Contenido del Curso
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {course.title}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido en 2 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* COLUMNA IZQUIERDA: LECCIONES */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Lecciones ({lessons.length})
            </h3>

            {/* Formulario para agregar/editar lección */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {editingLesson ? 'Editar lección' : 'Nueva lección'}
                </p>
                <span className={`text-[10px] ${lessonForm.title.length >= 80 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                  {lessonForm.title.length} / 80
                </span>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Título de la lección"
                  value={lessonForm.title}
                  maxLength={80}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 outline-none"
                />

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Duración (Ej: 15:30)"
                      value={lessonForm.duration}
                      maxLength={10}
                      onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="URL del video"
                      value={lessonForm.videoUrl}
                      maxLength={255}
                      onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                {editingLesson ? (
                  <>
                    <Button
                      onClick={handleUpdateLesson}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      <PencilIcon className="w-4 h-4" />
                      Actualizar
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingLesson(null)
                        setLessonForm({ title: '', duration: '', videoUrl: '' })
                      }}
                      className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200"
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleAddLesson}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Agregar lección
                  </Button>
                )}
              </div>
            </div>

            {/* Lista de lecciones */}
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {lessons.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8 italic border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  No hay lecciones aún
                </p>
              ) : (
                lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 rounded-full">
                        {index + 1}
                      </span>
                      <div className="flex-1 truncate">
                        <p className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {lesson.duration}
                          </p>
                          {lesson.videoUrl && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">
                              VIDEO
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1 ml-4">
                      <button
                        onClick={() => handleEditLesson(lesson)}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLesson(lesson.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMNA DERECHA: KEY POINTS */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Puntos Clave ({keyPoints.length})
            </h3>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Agregar punto clave
                </p>
                <span className={`text-[10px] ${keyPointInput.length >= 150 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                  {keyPointInput.length} / 150
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={keyPointInput}
                  maxLength={150}
                  onChange={(e) => setKeyPointInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddKeyPoint()}
                  placeholder="Ej: Aprenderás los fundamentos..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 outline-none"
                />
                <Button
                  onClick={handleAddKeyPoint}
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 whitespace-nowrap"
                >
                  <PlusIcon className="w-4 h-4" />
                  Agregar
                </Button>
              </div>
            </div>

            {/* Lista de key points */}
            <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
              {keyPoints.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8 italic border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  No hay puntos clave aún
                </p>
              ) : (
                keyPoints.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-2 flex-1 overflow-hidden">
                      <span className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0">•</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 break-words">
                        {point}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteKeyPoint(index)}
                      className="p-1.5 ml-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Botones de navegación del modal */}
        <div className="flex justify-between gap-2 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={onBack}
            disabled={updateMutation.isPending}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Anterior
          </Button>

          <div className="flex gap-2">
            <Button
              onClick={onClose}
              disabled={updateMutation.isPending}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
            >
              Cancelar
            </Button>

            <Button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              {updateMutation.isPending ? "Guardando..." : "Guardar todo"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}