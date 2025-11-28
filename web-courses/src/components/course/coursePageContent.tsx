'use client'

import { useState, useEffect } from "react"
import { ForumSection } from '@/features/forum/components/ForumSection'
import { useCourseNavigation } from "@/hooks/useCourseNavigation"
import CourseContent from "@/components/course/courseContent"
import { LessonList } from "@/components/course/lessonList"
import InstructorCard from "@/components/course/instructorCard"
import { CourseSwitcher } from "@/components/course/courseSwitcher"
import type { Lesson } from "@/types"

interface CoursePageContentProps {
  courseId: number
}

export default function CoursePageContent({ courseId }: CoursePageContentProps) {
  const [seekTo, setSeekTo] = useState<((seconds: number) => void) | null>(null)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | undefined>()

  const { course, currentLesson, handleToggleComplete, handleLessonSelect } =
    useCourseNavigation(courseId)

  const lessons = course?.lessons || []
  const currentIndex = lessons.findIndex(l => l.id === currentLesson?.id)

  // 👇 Sincronizar el video con la lección actual
  useEffect(() => {
    if (currentLesson?.videoUrl) {
      setCurrentVideoUrl(currentLesson.videoUrl)
    }
  }, [currentLesson])

  // 👇 Nueva función que maneja la selección de lección
  const handleLessonClick = (lesson: Lesson) => {
    // Si la lección tiene video propio, úsalo
    if (lesson.videoUrl) {
      setCurrentVideoUrl(lesson.videoUrl)
    } else {
      // Si no, vuelve al video del curso
      setCurrentVideoUrl(undefined)
    }
    
    // Llama al handler original para actualizar currentLesson
    handleLessonSelect(lesson)
  }

  if (!course) return null

  return (
    <main className="w-full p-4 md:p-8 space-y-5">
      {/* 🔹 Navegación entre cursos (arriba) */}
      <div className="flex justify-between items-center pb-1">
        <CourseSwitcher currentCourseId={courseId} />
      </div>

      {/* 🔹 Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">
        <CourseContent
          course={course}
          currentVideoUrl={currentVideoUrl} // 👈 Pasamos el video dinámico
          onPlayerReady={(seekFn) => setSeekTo(() => seekFn)}
        />

        <div className="flex flex-col gap-6">
          <LessonList
            lessons={course.lessons}
            currentLessonId={currentLesson?.id || course.lessons[0]?.id}
            onLessonSelect={handleLessonClick} // 👈 Usamos la nueva función
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
          currentUserId="user_123" 
          currentUserName="Usuario Demo"  
        />
      </div>
    </main>
  )
}