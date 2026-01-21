// types/course.ts
import type { Lesson } from "@/entities/lesson/types"

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced'
export interface Course {
  id: string
  title: string
  description: string
  image: string
  duration: string
  instructor: string
  level: CourseLevel
  video: string
  keyPoints: string[]
  lessons: Lesson[]
  is_initial: boolean
  is_published: boolean
  created_at: string
  updated_at: string
  extraInfo?: string
  quote?: string
}

// Type específico para crear cursos (sin campos autogenerados)
export type CreateCourseInput = Omit<Course, 'id' | 'is_published' | 'created_at' | 'updated_at'>