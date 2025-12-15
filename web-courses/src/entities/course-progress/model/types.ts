// Identificadores (semánticos, no solo number)
export type CourseId = number
export type LessonId = number

// Progreso de una lección
export interface LessonProgress {
  courseId: CourseId
  lessonId: LessonId
  completed: boolean
}

// Estado completo del progreso
export interface CourseProgressState {
  progress: LessonProgress[]
}
