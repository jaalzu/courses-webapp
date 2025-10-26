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

  const course = getCourse(Number(id))
  const [lessons, setLessons] = useState(course?.lessons || [])
  const [currentLesson, setCurrentLesson] = useState(course?.lessons[0])

        useEffect(() => {
        setLessons(course?.lessons || [])
      }, [course])

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
  // 1️⃣ actualizar el store
  toggleLessonComplete(course.id, lessonId)

  // 2️⃣ actualizar state local para re-render
  setLessons(prev => 
    prev.map(l => l.id === lessonId ? { ...l, completed: true } : l)
  )

  // 3️⃣ avanzar a la siguiente lección
  const currentIndex = lessons.findIndex(l => l.id === lessonId)
  const nextLesson = lessons[currentIndex + 1]
  if (nextLesson) setCurrentLesson(nextLesson)
}


  const handleLessonSelect = (lesson: any) => setCurrentLesson(lesson)
  const handleTimestampClick = (lesson: any, seconds: number) => console.log('Saltar a:', seconds)

  return (
      <div className="w-full p-4 md:p-8 space-y-6 bg-gray-50 dark:bg-neutral-900 ">

      <p className="text-sm text-gray-500 dark:text-gray-300">
        Dashboard / Cursos / <span className="font-medium text-gray-700  dark:text-gray-200">{course.title}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]  gap-10 ">
        <CourseContent course={course} />

       <LessonList
  lessons={lessons}                // ahora viene del state local
  currentLessonId={currentLesson?.id || 1}
  onLessonSelect={handleLessonSelect}
  onTimestampClick={handleTimestampClick}
  onToggleComplete={handleToggleComplete}
/>

      </div>
    </div>
  )
}
