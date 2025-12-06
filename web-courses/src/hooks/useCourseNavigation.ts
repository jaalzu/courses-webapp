// 📁 hooks/useCourseNavigation.ts
'use client'

import { useState, useEffect } from "react"
import { useCourseStore } from "@/entities/course/model/useCoursesStore"
import type { Lesson } from "@/types" 

export function useCourseNavigation(courseId: number) {
  // ✅ Suscribirse directamente al curso específico
  const course = useCourseStore((state) => 
    state.courses.find(c => c.id === courseId)
  )
  
  const toggleLessonComplete = useCourseStore(state => state.toggleLessonComplete)
  
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>(undefined)

  // 👇 Inicializar currentLesson cuando el curso esté disponible
  useEffect(() => {
    if (course?.lessons && course.lessons.length > 0 && !currentLesson) {
      setCurrentLesson(course.lessons[0])
    }
  }, [course?.lessons, currentLesson])

  // Sincronizar currentLesson cuando cambian las lecciones
  useEffect(() => {
    if (course && currentLesson) {
      const updatedLesson = course.lessons.find(l => l.id === currentLesson.id)
      if (updatedLesson) {
        setCurrentLesson(updatedLesson)
      }
    }
  }, [course?.lessons])

  // Resetear currentLesson si cambia el curso
  useEffect(() => {
    if (course?.lessons[0]) {
      setCurrentLesson(course.lessons[0])
    }
  }, [courseId])

  const handleToggleComplete = (lessonId: number) => {
    if (!course) return
    
    // Actualizar store
    toggleLessonComplete(course.id, lessonId)
    
    // Buscar siguiente lección
    const currentIndex = course.lessons.findIndex(l => l.id === lessonId)
    const nextLesson = course.lessons[currentIndex + 1]
    
    // Si hay siguiente, avanzar
    if (nextLesson) {
      setCurrentLesson(nextLesson)
    }
    // Si no hay siguiente, el useEffect actualizará currentLesson
  }

  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson)
  }

  const handleTimestampClick = (lesson: Lesson, seconds: number) => {
    setCurrentLesson(lesson)
    console.log(`Saltar a ${seconds}s en "${lesson.title}"`)
  }

  return {
    course,
    currentLesson,
    handleToggleComplete,
    handleLessonSelect,
    handleTimestampClick
  }
}