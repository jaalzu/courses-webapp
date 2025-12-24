import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LessonProgress, CourseId, LessonId } from '../types'

interface ProgressState {
  progress: LessonProgress[]
}

interface ProgressActions {
  toggleLessonProgress: (
    userId: string,
    courseId: CourseId,
    lessonId: LessonId
  ) => void

  markLessonCompleted: (
    userId: string,
    courseId: CourseId,
    lessonId: LessonId
  ) => void

  resetUserProgress: (userId: string) => void
}

export const useProgressStore = create<ProgressState & ProgressActions>()(
  persist(
    (set, get) => ({
      progress: [],

      toggleLessonProgress: (userId, courseId, lessonId) => {
        set(state => {
          const normalizedCourseId =
            typeof courseId === 'string' ? parseInt(courseId, 10) : courseId

          const index = state.progress.findIndex(
            p =>
              p.userId === userId &&
              p.courseId === normalizedCourseId &&
              p.lessonId === lessonId
          )

          if (index !== -1) {
            const updated = [...state.progress]
            updated[index] = {
              ...updated[index],
              completed: !updated[index].completed,
            }
            return { progress: updated }
          }

          return {
            progress: [
              ...state.progress,
              {
                userId,
                courseId: normalizedCourseId,
                lessonId,
                completed: true,
              },
            ],
          }
        })
      },

      markLessonCompleted: (userId, courseId, lessonId) => {
        set(state => {
          const normalizedCourseId =
            typeof courseId === 'string' ? parseInt(courseId, 10) : courseId

          const exists = state.progress.some(
            p =>
              p.userId === userId &&
              p.courseId === normalizedCourseId &&
              p.lessonId === lessonId &&
              p.completed
          )

          if (exists) return state

          return {
            progress: [
              ...state.progress,
              {
                userId,
                courseId: normalizedCourseId,
                lessonId,
                completed: true,
              },
            ],
          }
        })
      },

      resetUserProgress: userId => {
        set(state => ({
          progress: state.progress.filter(p => p.userId !== userId),
        }))
      },
    }),
    {
      name: 'progress-store',
    }
  )
)
