// types/course.ts
import type { Lesson } from "./lesson"

export interface Course {
  id: number
  title: string
  description: string
  duration: string
  video: string
  instructor?: string
  level?: 'beginner' | 'intermediate' | 'advanced'
  lessons: Lesson[]
  image: string
  keyPoints?: string[]
  extraInfo?: string
  quote?: string
}

export type CourseInput = Omit<Course, "id">




export type CourseLevel = 'beginner' | 'intermediate' | 'advanced'