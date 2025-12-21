// @/entities/progress/model/mockProgress.ts
import type { LessonProgress } from "@/entities/progress/model/index"
import { LOCAL_USER } from "@/shared/mocks/localUser"

export const MOCK_PROGRESS: LessonProgress[] = [
  // Progreso de Pepito (LOCAL_USER)
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
  
  // Progreso de Juan Admin
  // Para el usuario 1 - completar TODO el curso 1
{
  userId: "00000000-0000-0000-0000-000000000002",
  courseId: 1,
  lessonId: 1,
  completed: true,
  completedAt: new Date(),
},
{
  userId: "00000000-0000-0000-0000-000000000002",
  courseId: 1,
  lessonId: 2,
  completed: true,
  completedAt: new Date(),
},
{
  userId: "00000000-0000-0000-0000-000000000002",
  courseId: 1,
  lessonId: 3,
  completed: true,
  completedAt: new Date(),
},
{
  userId: "00000000-0000-0000-0000-000000000002",
  courseId: 1,
  lessonId: 4,
  completed: true,
  completedAt: new Date(),
},
{
  userId: "00000000-0000-0000-0000-000000000002",
  courseId: 1,
  lessonId: 5,
  completed: true,
  completedAt: new Date(),
},
  
  // Progreso de María
  {
    userId: "00000000-0000-0000-0000-000000000003",
    courseId: 2,
    lessonId: 1,
    completed: true,
    completedAt: new Date(),
  },
]