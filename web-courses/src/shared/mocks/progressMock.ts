import type { LessonProgress } from "@/entities/progress/model/types"
import { LOCAL_USER } from "@/shared/mocks/localUser"

export const MOCK_PROGRESS: LessonProgress[] = [
  {
    userId: LOCAL_USER.id,
    courseId: 1,
    lessonId: 1,
    completed: true,
    completedAt: new Date(),
  },
  {
    userId: LOCAL_USER.id,
    courseId: 1,
    lessonId: 2,
    completed: true,
    completedAt: new Date(),
  },
  {
    userId: LOCAL_USER.id,
    courseId: 1,
    lessonId: 3,
    completed: false,
  },
]
