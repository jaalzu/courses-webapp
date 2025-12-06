import type { Course } from '@/entities/course/model/types'

// ✅ Toggle de lecciones es parte de la feature de progreso
export function toggleLesson(courses: Course[], courseId: number, lessonId: number): Course[] {
  return courses.map(course =>
    course.id === courseId
      ? {
          ...course,
          lessons: course.lessons.map(lesson =>
            lesson.id === lessonId
              ? { ...lesson, completed: !lesson.completed }
              : lesson
          ),
        }
      : course
  )
}

// ✅ Calcular progreso es parte de la feature de progreso
export function calculateCourseProgress(lessons: { completed: boolean }[]) {
  const totalLessons = lessons.length
  const completedCount = totalLessons > 0
    ? lessons.filter(lesson => lesson.completed).length
    : 0

  const progress = totalLessons > 0
    ? Math.round((completedCount / totalLessons) * 100)
    : 0

  return { progress, completed: { done: completedCount, total: totalLessons } }
}