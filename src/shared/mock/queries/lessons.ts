import { delay, generateId, mutateMockStore } from '../store'

export const lessonQueries = {
  syncLessons: async (courseId: string, lessons: Array<{ title: string; duration?: string; videoUrl?: string; video_url?: string }>) => {
    await delay()

    const formattedLessons = lessons.map((l, index) => ({
      id: generateId('lesson'),
      title: l.title,
      duration: String(l.duration || '0'),
      videoUrl: l.videoUrl || l.video_url || '',
      order_index: index,
    }))

    mutateMockStore((s) => {
      const idx = s.courses.findIndex((c) => c.id === courseId)
      if (idx !== -1) {
        s.courses[idx].lessons = formattedLessons
        s.courses[idx].updated_at = new Date().toISOString()
      }
    })

    return { data: formattedLessons, error: null }
  },

  deleteByCourseId: async (courseId: string) => {
    await delay()
    mutateMockStore((s) => {
      const idx = s.courses.findIndex((c) => c.id === courseId)
      if (idx !== -1) s.courses[idx].lessons = []
    })
    return { error: null }
  },
}
