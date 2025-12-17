'use client'

import { useState } from "react"
import { useCourseStore } from "@/entities/course/model/useCourseStore"
import { useProgressStore } from "@/entities/progress/model/index"
import { isLessonCompleted as isLessonCompletedSelector } from '@/entities/progress/model/selectors'
import type { Lesson } from "@/entities/lesson/model/types"

export function useCourseNavigation(courseId: number) {
  // Curso
  const course = useCourseStore(state => state.getCourseById(courseId))
  
  // Funciones de progreso
  const toggleLessonComplete = useProgressStore(state => state.toggleLessonComplete)
  const courseProgress = useProgressStore(state => state.progress)

  // Estado de la lección actual
  const [currentLesson, setCurrentLesson] = useState<Lesson | undefined>(
    course?.lessons[0]
  )

  // Función para saber si una lección está completada
  const lessonIsCompleted = (lessonId: number) =>
    isLessonCompletedSelector(courseProgress, courseId, lessonId)

  // Calcular progreso total
  const completedCount = course?.lessons.filter(lesson =>
    lessonIsCompleted(lesson.id)
  ).length ?? 0
  const totalLessons = course?.lessons.length ?? 0
  const progressPercentage = totalLessons > 0
    ? Math.round((completedCount / totalLessons) * 100)
    : 0

  // Seleccionar lección
  const handleLessonSelect = (lesson: Lesson) => {
    setCurrentLesson(lesson)
  }

  return {
    course,
    currentLesson,
    handleToggleComplete: toggleLessonComplete,
    handleLessonSelect,
    lessonIsCompleted,
    completedCount,
    totalLessons,
    progressPercentage,
  }
}
