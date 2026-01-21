// @/entities/progress/model/types.ts

export interface LessonProgress {
  userId: string
  courseId: string
  lessonId: string ;
  completed: boolean
  completedAt?: Date
}

export type CourseId = string
export type LessonId = string