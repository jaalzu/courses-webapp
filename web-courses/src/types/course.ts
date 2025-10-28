// types/course.ts

export interface Timestamp {
  time: string      // Formato "MM:SS" ej: "02:15"
  seconds: number   // Segundos totales para el salto
  label: string     // Descripción del momento
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

// 🎁 BONUS: Types auxiliares útiles
export interface CourseProgress {
  done: number
  total: number
}

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced'