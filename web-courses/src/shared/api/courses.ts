// shared/api/courses.ts
import { courseQueries } from '@/shared/lib/supabase/queries/courses'
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
    // Mapeo DB aquí
    const dbUpdates = mapCourseToDb(updates)
    const { data, error } = await courseQueries.update(courseId, dbUpdates)
    if (error) throw new Error(error.message)
    return data
  },
  
  async delete(courseId: string) {
    const { error } = await courseQueries.delete(courseId)
    if (error) throw new Error(error.message)
  }
}

// Helper privado para mapeo
function mapCourseToDb(updates: Partial<Course>) {
  const dbUpdates: any = {}
  if (updates.title) dbUpdates.title = updates.title
  if (updates.keyPoints) dbUpdates.key_points = updates.keyPoints
  if (updates.level) dbUpdates.difficulty = updates.level
  // ...
  return dbUpdates
}