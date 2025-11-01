// types/course.ts

export interface Timestamp {
  time: string     
  seconds: number  
  label: string   
}

export interface Lesson {
  id: number
  title: string
  duration: string
  completed: boolean
  timestamps?: Timestamp[]
}

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

export interface CourseProgress {
  done: number
  total: number
}

export interface InstructorCardProps {
  name: string
  profession: string
  image: string
  description: string
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced'