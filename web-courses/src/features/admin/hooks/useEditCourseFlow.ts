import { useState } from "react"
import { useCourseStore } from "@/entities/course/model/useCourseStore"
import type { Course } from "@/entities/course/types"

type EditStep = 'basic' | 'lessons' | 'closed'

export function useEditCourseFlow() {
  const getCourse = useCourseStore(state => state.getCourseById)

  const [step, setStep] = useState<EditStep>('closed')
  
  // 1. Cambiamos el estado inicial a string
  const [courseId, setCourseId] = useState<string | null>(null)

  // 2. La función open ahora recibe un string (el UUID)
  const open = (id: string) => {
    setCourseId(id)
    setStep('basic')
  }

  const goToLessons = () => {
    setStep('lessons')
  }

  const goToBasic = () => {
    setStep('basic')
  }

  const close = () => {
    setCourseId(null)
    setStep('closed')
  }

  // 3. getCourse(courseId) ahora funcionará perfecto porque ambos son strings
  const course: Course | undefined = courseId !== null ? getCourse(courseId) : undefined

  return {
    step,
    course,
    courseId,
    open,
    goToLessons,
    goToBasic,
    close,
    isBasicOpen: step === 'basic',
    isLessonsOpen: step === 'lessons',
  }
}