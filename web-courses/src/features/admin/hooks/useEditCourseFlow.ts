import { useState } from "react"
import { useCourseStore } from "@/entities/course/model/useCoursesStore"
import type { Course } from "@/types/course"

type EditStep = 'basic' | 'lessons' | 'closed'

export function useEditCourseFlow() {
  const getCourse = useCourseStore(state => state.getCourse)

  const [step, setStep] = useState<EditStep>('closed')
  const [courseId, setCourseId] = useState<number | null>(null)

  const open = (id: number) => {
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