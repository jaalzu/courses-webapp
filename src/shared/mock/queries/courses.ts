import type { Course } from '@/entities/course/types'
import { delay, generateId, getMockStore, mutateMockStore } from '../store'

export const courseQueries = {
  getAll: async () => {
    await delay()
    const store = getMockStore()
    return { data: [...store.courses], error: null }
  },

  getById: async (id: string) => {
    await delay()
    const store = getMockStore()
    const course = store.courses.find((c) => c.id === id)
    if (!course) return { data: null, error: { message: 'Curso no encontrado' } }
    return { data: { ...course }, error: null }
  },

  create: async (course: Partial<Course>) => {
    await delay()
    const newCourse: Course = {
      id: generateId('course'),
      title: course.title || '',
      description: course.description || '',
      image: course.image || '',
      duration: course.duration || '0',
      instructor: course.instructor || '',
      level: course.level || 'beginner',
      video: course.video || '',
      keyPoints: course.keyPoints || [],
      lessons: course.lessons || [],
      is_initial: course.is_initial || false,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mutateMockStore((s) => s.courses.push(newCourse))
    return { data: { ...newCourse }, error: null }
  },

  update: async (id: string, updates: Partial<Course>) => {
    await delay()
    const store = getMockStore()
    const idx = store.courses.findIndex((c) => c.id === id)
    if (idx === -1) return { data: null, error: { message: 'Curso no encontrado' } }

    mutateMockStore((s) => {
      Object.assign(s.courses[idx], updates, { updated_at: new Date().toISOString() })
    })

    return { data: { ...getMockStore().courses[idx] }, error: null }
  },

  delete: async (id: string) => {
    await delay()
    mutateMockStore((s) => {
      s.courses = s.courses.filter((c) => c.id !== id)
      s.forumPosts = s.forumPosts.filter((p) => p.course_id !== id)
      s.progress = s.progress.filter((p) => p.course_id !== id)
      s.favorites = s.favorites.filter((f) => f.course_id !== id)
      s.courseAccess = s.courseAccess.filter((a) => a.course_id !== id)
    })
    return { data: true, error: null }
  },

  search: async (query: string) => {
    await delay()
    const store = getMockStore()
    const q = query.toLowerCase()
    const filtered = store.courses.filter(
      (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    )
    return { data: filtered, error: null }
  },
}
