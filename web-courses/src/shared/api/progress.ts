import { progressQueries } from '@/shared/lib/supabase/queries/progress'
import { supabase } from '@/shared/lib/supabase/client'
import type { LessonProgress } from '@/entities/progress/types'

export const progressApi = {
  // Obtener progreso de un usuario
  async getUserProgress(userId: string) {
    const { data, error } = await progressQueries.getUserProgress(userId)
    if (error) throw new Error(error.message)
    return mapProgressFromDb(data || [])
  },

  // Obtener todo el progreso
  async getAllProgress() {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
    
    if (error) throw new Error(error.message)
    return mapProgressFromDb(data || [])
  },

  // Toggle lección
  async toggleLesson(
    userId: string, 
    courseId: string, 
    lessonId: string, 
    currentCompleted: boolean
  ) {
    const newStatus = currentCompleted ? 'not_started' : 'completed'
    const { error } = await progressQueries.updateLessonProgress(
      userId,
      courseId,
      lessonId,
      newStatus
    )
    if (error) throw new Error(error.message)
  },

  // Marcar lección como completada
  async markLessonComplete(
    userId: string,
    courseId: string,
    lessonId: string
  ) {
    const { error } = await progressQueries.markLessonComplete(
      userId,
      courseId,
      lessonId
    )
    if (error) throw new Error(error.message)
  }
}

// Helper privado para mapear DB → Frontend
function mapProgressFromDb(data: any[]): LessonProgress[] {
  return data.map((p: any) => ({
    userId: p.user_id,
    courseId: p.course_id,
    lessonId: p.lesson_id,
    completed: p.status === 'completed',
    completedAt: p.completed_at ? new Date(p.completed_at) : undefined,
  }))
}