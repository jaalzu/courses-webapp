'use client'

import { useState, useEffect } from "react"
import { useCourseStore } from "@/entities/course/model/useCourseStore"
import { useCourseProgress } from "@/entities/course-progress/model/index"
import type { Lesson } from "@/entities/lesson/model/types" 

export function useCourseNavigation(courseId: number) {
  // ✅ Obtener curso del store de entidad
  const course = useCourseStore((state) => state.getCourseById(courseId))
  
  // ✅ Obtener funciones de progreso del feature store
  const toggleLessonComplete = useCourseProgress(state => state.toggleLessonComplete)
  const isLessonCompleted = useCourseProgress(state => state.isLessonCompleted)
  
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>(undefined)

  useEffect(() => {
    if (course?.lessons && course.lessons.length > 0 && !currentLesson) {
      setCurrentLesson(course.lessons[0])
    }
  }, [course?.lessons, currentLesson])

  useEffect(() => {
    if (course && currentLesson) {
      const updatedLesson = course.lessons.find(l => l.id === currentLesson.id)
      if (updatedLesson) {
        setCurrentLesson(updatedLesson)
      }
    }
  }, [course?.lessons, currentLesson])

  useEffect(() => {
    if (course?.lessons[0]) {
      setCurrentLesson(course.lessons[0])
    }
  }, [courseId])

  const handleToggleComplete = (lessonId: number) => {
    if (!course) return
    
    toggleLessonComplete(course.id, lessonId)
    
    const currentIndex = course.lessons.findIndex(l => l.id === lessonId)
    const nextLesson = course.lessons[currentIndex + 1]
    
    if (nextLesson) {
      setCurrentLesson(nextLesson)
    }
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
    isLessonCompleted: (lessonId: number) => isLessonCompleted(courseId, lessonId),
    handleToggleComplete,
    handleLessonSelect,
    handleTimestampClick
  }
}
