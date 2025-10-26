// 📁 app/curso/[id]/page.tsx
'use client'

import { useParams } from "next/navigation"
import { useCourseNavigation } from "@/hooks/useCourseNavigation"
import CourseContent from "@/components/course/courseContent"
import { LessonList } from "@/components/course/lessonList"

export default function CoursePage() {
  const { id } = useParams()
  
  const {
    course,
    currentLesson,
    handleToggleComplete,
    handleLessonSelect,
    handleTimestampClick
  } = useCourseNavigation(Number(id))

  if (!course) {
    return (
      <div className="p-6 text-gray-600 dark:text-gray-400">
        Curso no encontrado.
      </div>
    )
  }

  return (
    <div className="w-full p-4 md:p-8 space-y-6 bg-gray-50 dark:bg-neutral-900">
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Dashboard / Cursos / <span className="font-medium text-gray-700 dark:text-gray-200">{course.title}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">
        <CourseContent course={course} />
        
        <LessonList
          lessons={course.lessons}
          currentLessonId={currentLesson?.id || course.lessons[0]?.id}
          onLessonSelect={handleLessonSelect}
          onTimestampClick={handleTimestampClick}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  )
}