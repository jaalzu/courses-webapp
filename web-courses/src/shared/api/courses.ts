// shared/api/courses.ts
import { courseQueries } from '@/shared/lib/supabase/queries/courses'
import { lessonQueries } from '@/shared/lib/supabase/queries/lessons'
import type { Course } from '@/entities/course/types'

export const coursesApi = {
  async getAll() {
    const { data, error } = await courseQueries.getAll()
    if (error) throw new Error(error.message)
    return data || []
  },
  
  async create(course: Omit<Course, 'id'>) {
    const { data, error } = await courseQueries.create(course)
    if (error) throw new Error(error.message)
    if (!data) throw new Error('No se pudo crear el curso')
    return data
  },
  
  async update(courseId: string, updates: Partial<Course>) {
    // 1. Actualizar datos del curso (sin lecciones)
    const dbUpdates = mapCourseToDb(updates)
    
    let courseData = null
    if (Object.keys(dbUpdates).length > 0) {
      const { data, error } = await courseQueries.update(courseId, dbUpdates)
      if (error) throw new Error(error.message)
      courseData = data
    }
    
    // 2. Sincronizar lecciones si las hay
    if (updates.lessons) {
      const { data: lessonsData, error: lessonsError } = await lessonQueries.syncLessons(
        courseId,
        updates.lessons
      )
      if (lessonsError) throw new Error(lessonsError.message)
    }
    
    return courseData
  },
  
  async delete(courseId: string) {
    const { error } = await courseQueries.delete(courseId)
    if (error) throw new Error(error.message)
  }
}

// Helper privado para mapeo
function mapCourseToDb(updates: Partial<Course>) {
  const dbUpdates: any = {}
  
  if (updates.title !== undefined) dbUpdates.title = updates.title
  if (updates.description !== undefined) dbUpdates.description = updates.description
  if (updates.duration !== undefined) dbUpdates.duration = String(updates.duration)
  if (updates.instructor !== undefined) dbUpdates.instructor = updates.instructor
  if (updates.keyPoints !== undefined) dbUpdates.key_points = updates.keyPoints
  if (updates.level !== undefined) dbUpdates.difficulty = updates.level
  
  if (updates.image !== undefined) {
    dbUpdates.thumbnail_url = updates.image.includes('supabase.co/storage')
      ? updates.image.split('/').pop()
      : updates.image
  }
  
  return dbUpdates
}