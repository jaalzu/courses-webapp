// @/features/course-navigation/model/useCourseNavigation.ts
import { useState, useEffect } from 'react'
import { useCourses } from '@/entities/course/model/useCourses'
import type { Lesson } from '@/entities/lesson/types'
import { 
  getNextLesson, 
  getPreviousLesson, 
  hasNextLesson, 
  hasPreviousLesson 
} from './navigationHelpers'

export function useCourseNavigation(courseId: string) {
  const { courses } = useCourses() 
  const course = courses.find(c => c.id === courseId) 
  
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>(
    course?.lessons?.[0]
  )

  useEffect(() => {
    if (course?.lessons?.length && !currentLesson) {
      setCurrentLesson(course.lessons[0])
    }
  }, [course, currentLesson])

  const selectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson)
  }

  const goToNext = () => {
    if (!course?.lessons || !currentLesson) return
    
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
    hasNext: (course?.lessons && currentLesson) 
      ? hasNextLesson(course, currentLesson.id) 
      : false,
    hasPrevious: (course?.lessons && currentLesson) 
      ? hasPreviousLesson(course, currentLesson.id) 
      : false,
  }
}