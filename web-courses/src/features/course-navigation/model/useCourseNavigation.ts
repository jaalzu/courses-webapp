// @/features/course-navigation/model/useCourseNavigation.ts
import { useState } from 'react'
import { useCourseStore } from '@/entities/course/model/useCourseStore'
import { useProgressStore, isLessonCompleted } from '@/entities/progress/model' // ✅ IMPORTAR HELPER
import { useAuthStore } from '@/features/auth/hooks/useAuthStore'
import type { Lesson } from '@/entities/lesson/model/types'

export function useCourseNavigation(courseId: number) {
  const course = useCourseStore(state => state.getCourseById(courseId))
  const currentUser = useAuthStore(state => state.currentUser)
  
  // ✅ USAR LOS MÉTODOS CORRECTOS DEL STORE
  const progress = useProgressStore(state => state.progress)
  const markComplete = useProgressStore(state => state.markComplete)

  // Estado de la lección actual
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>(
    course?.lessons[0]
  )

  // ✨ Handler para seleccionar una lección
  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson)
    console.log('📖 Lección seleccionada:', lesson.title)
  }

  // ✨ Handler para toggle completar lección
  const handleToggleComplete = (courseId: number, lessonId: number) => {
    if (!currentUser) {
      console.warn('⚠️ No hay usuario autenticado')
      return
    }

    console.log('🎯 Toggle completado:', { 
      userId: currentUser.id,
      courseId, 
      lessonId 
    })

    markComplete(currentUser.id, courseId, lessonId) // ✅ USAR markComplete
  }

  // Verificar si una lección está completada
  const lessonIsCompleted = (lessonId: number) => {
    if (!currentUser || !course) return false
    return isLessonCompleted(progress, currentUser.id, course.id, lessonId) // ✅ USAR HELPER
  }

  // Completar una lección específica (alternativa más directa)
  const completeLesson = (lessonId: number) => {
    if (!currentUser || !course) return
    markComplete(currentUser.id, course.id, lessonId) // ✅ USAR markComplete
  }

  // Navegar a siguiente lección
  const goToNextLesson = () => {
    if (!course || !currentLesson) return

    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
    const nextLesson = course.lessons[currentIndex + 1]

    if (nextLesson) {
      setCurrentLesson(nextLesson)
      console.log('⏭️ Siguiente lección:', nextLesson.title)
    }
  }

  // Navegar a lección anterior
  const goToPreviousLesson = () => {
    if (!course || !currentLesson) return

    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
    const previousLesson = course.lessons[currentIndex - 1]

    if (previousLesson) {
      setCurrentLesson(previousLesson)
      console.log('⏮️ Lección anterior:', previousLesson.title)
    }
  }

  // Verificar si hay siguiente/anterior lección
  const hasNextLesson = () => {
    if (!course || !currentLesson) return false
    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
    return currentIndex < course.lessons.length - 1
  }

  const hasPreviousLesson = () => {
    if (!course || !currentLesson) return false
    const currentIndex = course.lessons.findIndex(l => l.id === currentLesson.id)
    return currentIndex > 0
  }

  return {
    // Estado
    course,
    currentLesson,
    setCurrentLesson,

    // ✅ Handlers
    handleLessonSelect,
    handleToggleComplete,

    // Utilidades de progreso
    lessonIsCompleted,
    completeLesson,

    // Navegación
    goToNextLesson,
    goToPreviousLesson,
    hasNextLesson: hasNextLesson(),
    hasPreviousLesson: hasPreviousLesson(),
  }
}