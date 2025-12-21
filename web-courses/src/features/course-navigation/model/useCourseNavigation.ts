// @/features/course-navigation/model/useCourseNavigation.ts
import { useState } from 'react'
import { useCourseStore } from '@/entities/course/model/useCourseStore'
import type { Lesson } from '@/entities/lesson/model/types'
import { 
  getNextLesson, 
  getPreviousLesson, 
  hasNextLesson, 
  hasPreviousLesson 
} from './navigationHelpers'

/**
 * Hook para manejar la navegación entre lecciones de un curso
 */
export function useCourseNavigation(courseId: number) {
  const course = useCourseStore(state => state.getCourseById(courseId))
  
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>(
    course?.lessons[0]
  )

  const selectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson)
  }

  const goToNext = () => {
    if (!course || !currentLesson) return
    
    const next = getNextLesson(course, currentLesson.id)
    if (next) setCurrentLesson(next)
  }

  const goToPrevious = () => {
    if (!course || !currentLesson) return
    
    const prev = getPreviousLesson(course, currentLesson.id)
    if (prev) setCurrentLesson(prev)
  }

  return {
    course,
    currentLesson,
    selectLesson,
    goToNext,
    goToPrevious,
    hasNext: course && currentLesson ? hasNextLesson(course, currentLesson.id) : false,
    hasPrevious: course && currentLesson ? hasPreviousLesson(course, currentLesson.id) : false,
  }
}