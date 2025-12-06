import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LessonProgress {
  courseId: number
  lessonId: number
  completed: boolean
}

interface CourseProgressStore {
  progress: LessonProgress[]
  
  // Marcar lección como completada/incompleta
  toggleLessonComplete: (courseId: number, lessonId: number) => void
  
  // Obtener progreso de un curso
  getCourseProgress: (courseId: number) => {
    completed: number
    total: number
    percentage: number
  }
  
  // Verificar si una lección está completada
  isLessonCompleted: (courseId: number, lessonId: number) => boolean
  
  // Reset
  resetProgress: (courseId?: number) => void
}

export const useCourseProgress = create<CourseProgressStore>()(
  persist(
    (set, get) => ({
      progress: [],

      toggleLessonComplete: (courseId, lessonId) =>
        set((state) => {
          const existing = state.progress.find(
            p => p.courseId === courseId && p.lessonId === lessonId
          )

          if (existing) {
            // Si existe, toggle
            return {
              progress: state.progress.map(p =>
                p.courseId === courseId && p.lessonId === lessonId
                  ? { ...p, completed: !p.completed }
                  : p
              ),
            }
          } else {
            // Si no existe, agregar como completado
            return {
              progress: [
                ...state.progress,
                { courseId, lessonId, completed: true },
              ],
            }
          }
        }),

      getCourseProgress: (courseId) => {
        const courseProgress = get().progress.filter(p => p.courseId === courseId)
        const completed = courseProgress.filter(p => p.completed).length
        const total = courseProgress.length
        const percentage = total > 0 ? (completed / total) * 100 : 0

        return { completed, total, percentage }
      },

      isLessonCompleted: (courseId, lessonId) => {
        const lesson = get().progress.find(
          p => p.courseId === courseId && p.lessonId === lessonId
        )
        return lesson?.completed ?? false
      },

      resetProgress: (courseId) =>
        set((state) => ({
          progress: courseId
            ? state.progress.filter(p => p.courseId !== courseId)
            : [],
        })),
    }),
    {
      name: 'course-progress-storage',
    }
  )
)