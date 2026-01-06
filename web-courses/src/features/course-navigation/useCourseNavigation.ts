// @/features/course-navigation/model/useCourseNavigation.ts
import { useState, useEffect } from 'react'
import { useCourseStore } from '@/entities/course/model/useCourseStore'
import type { Lesson } from '@/entities/lesson/types'
import { 
  getNextLesson, 
  getPreviousLesson, 
  hasNextLesson, 
  hasPreviousLesson 
} from './navigationHelpers'

export function useCourseNavigation(courseId: string) {
  const course = useCourseStore(state => state.getCourseById(courseId))
  
  // 1. Manejo seguro del estado inicial
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>(
    course?.lessons?.[0]
  )

  // 2. Efecto para sincronizar cuando el curso termina de cargar de Supabase
  useEffect(() => {
    if (course?.lessons?.length && !currentLesson) {
      setCurrentLesson(course.lessons[0])
    }
  }, [course, currentLesson])

  const selectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson)
  }

  const goToNext = () => {
    // 3. Validamos que existan lecciones antes de navegar
    if (!course?.lessons || !currentLesson) return
    
    // Asegúrate que currentLesson.id sea string en la interfaz Lesson
    const next = getNextLesson(course, currentLesson.id)
    if (next) setCurrentLesson(next)
  }

  const goToPrevious = () => {
    if (!course?.lessons || !currentLesson) return
    
    const prev = getPreviousLesson(course, currentLesson.id)
    if (prev) setCurrentLesson(prev)
  }

  return {
    course,
    currentLesson,
    selectLesson,
    goToNext,
    goToPrevious,
    // 4. Agregamos el check de lecciones aquí también
    hasNext: (course?.lessons && currentLesson) 
      ? hasNextLesson(course, currentLesson.id) 
      : false,
    hasPrevious: (course?.lessons && currentLesson) 
      ? hasPreviousLesson(course, currentLesson.id) 
      : false,
  }
}