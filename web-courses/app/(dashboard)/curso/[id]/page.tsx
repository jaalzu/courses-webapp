'use client'

import { useParams } from "next/navigation"
import { ForumSection } from '@/components/ui/ForumSection';
import { useState } from "react"
import { useCourseNavigation } from "@/hooks/useCourseNavigation"
import CourseContent from "@/components/course/courseContent"
import { LessonList } from "@/components/course/lessonList"
import InstructorCard from "@/components/course/instructorCard"
import CourseNotFound from "@/components/course/courseNotFound"
import { CourseSwitcher } from "@/components/course/courseSwitcher"

export default function CoursePage() {
  const { id } = useParams()
  const courseId = Number(id)

  const [seekTo, setSeekTo] = useState<((seconds: number) => void) | null>(null)

  const { course, currentLesson, handleToggleComplete, handleLessonSelect } =
    useCourseNavigation(courseId)

  const lessons = course?.lessons || []
  const currentIndex = lessons.findIndex(l => l.id === currentLesson?.id)
  const nextLesson = currentIndex >= 0 ? lessons[currentIndex + 1] : null
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null

  if (isNaN(courseId)) return <CourseNotFound />
  if (!course) return <CourseNotFound />

  return (
    <main className="w-full p-4 md:p-8 space-y-6">
      {/* 🔹 Navegación entre cursos (arriba) */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
        <CourseSwitcher currentCourseId={courseId} />
      </div>

      {/* 🔹 Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">
        <CourseContent
          course={course}
          onPlayerReady={(seekFn) => setSeekTo(() => seekFn)}
        />

        <div className="flex flex-col gap-6">
          <LessonList
            lessons={course.lessons}
            currentLessonId={currentLesson?.id || course.lessons[0]?.id}
            onLessonSelect={handleLessonSelect}
            onToggleComplete={handleToggleComplete}
            onTimestampClick={(_, seconds) => seekTo?.(seconds)}
          />

          <InstructorCard
            name="Juan Pepe"
            profession="Frontend Developer"
            image="/avatar.png"
            description="Juan es un apasionado del desarrollo web con más de 10 años de experiencia. Ha trabajado en proyectos de todo tipo, desde startups hasta grandes empresas. Le encanta enseñar: disfruta compartir su conocimiento de manera clara y práctica."
          />
        </div>
      </div>

      {/* 🔹 Sección de Foro (debajo de todo) */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
        <ForumSection
          courseId={String(courseId)}
          // lessonId={currentLesson?.id ? String(currentLesson.id) : undefined}
          currentUserId="user_123" // 👈 Reemplaza con tu sistema de auth
          currentUserName="Usuario Demo" // 👈 Reemplaza con el nombre del usuario actual
        />
      </div>
    </main>
  )
}