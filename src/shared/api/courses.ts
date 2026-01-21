import { courseQueries } from '@/shared/lib/supabase/queries/courses'
import { lessonQueries } from '@/shared/lib/supabase/queries/lessons'
import type { Course ,CreateCourseInput } from '@/entities/course/types'

export const coursesApi = {
  async getAll() {
    const { data, error } = await courseQueries.getAll()
    if (error) throw new Error(error.message)
    return data || []
  },

async getById(courseId: string): Promise<Course> {
  const { data, error } = await courseQueries.getById(courseId)
  
  if (error) throw new Error(error.message) // Si hay error, lanzamos para que React Query lo capture
  if (!data) throw new Error('Curso no encontrado')
  
  return data // Aquí devolvemos el Course puro, NO { data, error }
},
  
  async create(course: CreateCourseInput) {
    const { data, error } = await courseQueries.create(course)
    if (error) throw new Error(error.message)
    if (!data) throw new Error('No se pudo crear el curso')
    return data
  },
  


 // @/shared/api/courses.ts
async update(courseId: string, updates: Partial<Course>) {
  const res = await fetch(`/api/courses/${courseId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates), // Mandamos 'keyPoints' tranquilo
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al actualizar');
  }

  const result = await res.json();
  
  // Si hay lecciones, las sincronizamos aparte como ya hacías
  if (updates.lessons) {
    await lessonQueries.syncLessons(courseId, updates.lessons);
  }

  return result.data;
},
  
  async delete(courseId: string) {
  const res = await fetch(`/api/courses/${courseId}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const error = await res.json()
    throw error
  }

  return true
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
  if (updates.is_initial !== undefined) dbUpdates.is_initial = updates.is_initial // ← NUEVO
  
  if (updates.image !== undefined) {
    dbUpdates.thumbnail_url = updates.image.includes('supabase.co/storage')
      ? updates.image.split('/').pop()
      : updates.image
  }
  
  return dbUpdates
}


// api service layer