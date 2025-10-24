'use client'

import { useParams } from "next/navigation"
import { useCourseStore } from "@/lib/store/courses"
import CourseContent from "@/components/course/courseContent"
import { LessonList } from "@/components/course/lessonList"
import { useState, useEffect } from "react"

export default function CoursePage() {
  const { id } = useParams()

  const getCourse = useCourseStore(state => state.getCourse)
  const toggleLessonComplete = useCourseStore(state => state.toggleLessonComplete)

  const course = getCourse(Number(id)) // siempre trae la versión actual del store
  const [currentLesson, setCurrentLesson] = useState(course?.lessons[0])

  // 🔹 Mantener currentLesson actualizado cuando cambia el store
  useEffect(() => {
    if (currentLesson) {
      const updatedLesson = course?.lessons.find(l => l.id === currentLesson.id)
      if (updatedLesson) setCurrentLesson(updatedLesson)
    }
  }, [course])

  if (!course) return <div className="p-6 text-gray-600">Curso no encontrado.</div>

  // 🔹 Lógica para marcar como completada y pasar a la siguiente lección
  const handleToggleComplete = (lessonId: number) => {
    toggleLessonComplete(course.id, lessonId)

    // Buscar índice de la lección actual
    const currentIndex = course.lessons.findIndex(l => l.id === lessonId)

    // Avanzar a la siguiente lección si existe
    const nextLesson = course.lessons[currentIndex + 1]
    if (nextLesson) setCurrentLesson(nextLesson)
  }

  const handleLessonSelect = (lesson: any) => setCurrentLesson(lesson)
  const handleTimestampClick = (lesson: any, seconds: number) => console.log('Saltar a:', seconds)

  return (
    <div className="p-4 md:p-8 space-y-6 bg-gray-50">
      <p className="text-sm text-gray-500">
        Dashboard / Cursos / <span className="font-medium text-gray-700">{course.title}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <CourseContent course={course} />

        <LessonList
          lessons={course.lessons}
          currentLessonId={currentLesson?.id || 1}
          onLessonSelect={handleLessonSelect}
          onTimestampClick={handleTimestampClick}
          onToggleComplete={handleToggleComplete} // ✔ pasamos la nueva lógica
        />
      </div>
    </div>
  )
}
