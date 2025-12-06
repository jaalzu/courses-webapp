'use client'
import { useState } from "react"
import { useCourseStore } from "@/entities/course/model/useCoursesStore"
import { Button } from "@/shared/ui/index"
import { XMarkIcon, ArrowLeftIcon, PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline"
import type { Course } from "@/entities/course/model/types"
import type {  Lesson } from "@/types/lesson"


interface Props {
  course: Course
  isOpen: boolean
  onClose: () => void
  onBack: () => void
}

type TabType = 'content' | 'lessons'

export default function EditCourseContentModal({ course, isOpen, onClose, onBack }: Props) {
  const updateCourse = useCourseStore(state => state.updateCourse)
  const [activeTab, setActiveTab] = useState<TabType>('content')
  const [isSaving, setIsSaving] = useState(false)

  // Estado para contenido del curso
  const [courseContent, setCourseContent] = useState({
    keyPoints: course.keyPoints || [],
    extraInfo: course.extraInfo || '',
  })

  // Estado para lecciones
  const [lessons, setLessons] = useState<Lesson[]>(course.lessons || [])
  const [editingLesson, setEditingLesson] = useState<number | null>(null)

  // Form para punto clave
  const [keyPointInput, setKeyPointInput] = useState('')

  // Form para lección
  const [lessonForm, setLessonForm] = useState({
    title: '',
    duration: '',
    videoUrl: '',
  })

  // ===== FUNCIONES PARA KEY POINTS =====
  const handleAddKeyPoint = () => {
    if (!keyPointInput.trim()) return
    setCourseContent({
      ...courseContent,
      keyPoints: [...courseContent.keyPoints, keyPointInput.trim()]
    })
    setKeyPointInput('')
  }

  const handleDeleteKeyPoint = (index: number) => {
    setCourseContent({
      ...courseContent,
      keyPoints: courseContent.keyPoints.filter((_, i) => i !== index)
    })
  }

  // ===== FUNCIONES PARA LECCIONES =====
  const handleAddLesson = () => {
    if (!lessonForm.title.trim() || !lessonForm.duration.trim()) return

    const newLesson: Lesson = {
      id: Date.now(),
      title: lessonForm.title,
      duration: lessonForm.duration,
      videoUrl: lessonForm.videoUrl,
      completed: false,
      // timestamps: []
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

  const handleDeleteLesson = (id: number) => {
    setLessons(lessons.filter(l => l.id !== id))
  }

  // ===== GUARDAR TODO =====
  const handleSave = async () => {
    setIsSaving(true)
    try {
      updateCourse(course.id, {
        ...courseContent,
        lessons
      })
      await new Promise(r => setTimeout(r, 300))
      onClose()
    } finally {
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 mb-4 pb-2">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Editar Contenido</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Paso 2: Contenido y lecciones del curso</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <XMarkIcon className="w-6 h-6"/>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'content'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Descripción y Puntos Clave
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'lessons'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Lecciones ({lessons.length})
          </button>
        </div>

        {/* TAB: CONTENIDO DEL CURSO */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Extra Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Información Extra
              </label>
              <textarea
                value={courseContent.extraInfo}
                onChange={(e) => setCourseContent({ ...courseContent, extraInfo: e.target.value })}
                placeholder="Información adicional sobre el curso..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            {/* Key Points */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Puntos Clave
              </label>
              
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={keyPointInput}
                  onChange={(e) => setKeyPointInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddKeyPoint()}
                  placeholder="Agregar punto clave..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
                <Button
                  onClick={handleAddKeyPoint}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  Agregar
                </Button>
              </div>

              {courseContent.keyPoints.length > 0 && (
                <ul className="space-y-2">
                  {courseContent.keyPoints.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300">• {point}</span>
                      <button
                        onClick={() => handleDeleteKeyPoint(index)}
                        className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* TAB: LECCIONES */}
        {activeTab === 'lessons' && (
          <div className="space-y-4">
            {/* Formulario para agregar/editar lección */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                {editingLesson ? 'Editar lección' : 'Nueva lección'}
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                <input
                  type="text"
                  placeholder="Título de la lección"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Duración (ej: 15:30)"
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                  
                  <input
                    type="text"
                    placeholder="URL del video"
                    value={lessonForm.videoUrl}
                    onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                {editingLesson ? (
                  <>
                    <Button
                      onClick={handleUpdateLesson}
                      className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                    >
                      <PencilIcon className="w-4 h-4" />
                      Actualizar
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingLesson(null)
                        setLessonForm({ title: '', duration: '', videoUrl: '' })
                      }}
                      className="bg-gray-200 dark:bg-gray-600"
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleAddLesson}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Agregar lección
                  </Button>
                )}
              </div>
            </div>

            {/* Lista de lecciones */}
            <div>
              {lessons.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No hay lecciones aún. Agrega la primera lección arriba.
                </p>
              ) : (
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {lesson.duration}
                            </p>
                            {lesson.videoUrl && (
                              <span className="text-xs text-green-600 dark:text-green-400">
                                • Video configurado
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditLesson(lesson)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteLesson(lesson.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Botones de navegación */}
        <div className="flex justify-between gap-2 pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
          <Button 
            onClick={onBack} 
            disabled={isSaving}
            className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Anterior
          </Button>
          
          <div className="flex gap-2">
            <Button 
              onClick={onClose} 
              disabled={isSaving}
              className="bg-gray-200 dark:bg-gray-700"
            >
              Cancelar
            </Button>
            
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSaving ? "Guardando..." : "Guardar todo"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}