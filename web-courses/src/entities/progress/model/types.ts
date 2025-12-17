// Identificadores (semánticos, no solo number)
export type CourseId = number
export type LessonId = number

export interface LessonProgress {
  userId: string  
  courseId: CourseId
  lessonId: LessonId
  completed: boolean
  completedAt?: Date
}

// Estado completo del progreso
export interface CourseProgressState {
  progress: LessonProgress[]
}
