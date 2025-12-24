// @/entities/progress/model/types.ts

export interface LessonProgress {
  userId: string
  courseId: number
  lessonId: number
  completed: boolean
  completedAt?: Date
}

export type CourseId = number
export type LessonId = number