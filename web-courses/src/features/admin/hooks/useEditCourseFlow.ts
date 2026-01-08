import { useState } from "react"
import type { Course } from "@/entities/course/types"
import { useCourses } from '@/entities/course/model/useCourses'


type EditStep = 'basic' | 'lessons' | 'closed'

export function useEditCourseFlow() {
  const { courses } = useCourses() 

  const [step, setStep] = useState<EditStep>('closed')
  
  const [courseId, setCourseId] = useState<string | null>(null)

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

  const course: Course | undefined = courseId !== null 
    ? courses.find(c => c.id === courseId) 
    : undefined

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