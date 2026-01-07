// types/course.ts
import type { Lesson } from "@/entities/lesson/types"

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Course {
  id: string
  title: string
  description: string
  duration: string
  video: string
  instructor?: string
  level?: CourseLevel 
  lessons: Lesson[]
  image: string
  keyPoints?: string[]
  extraInfo?: string
  quote?: string
}

export type CourseInput = Omit<Course, "id">