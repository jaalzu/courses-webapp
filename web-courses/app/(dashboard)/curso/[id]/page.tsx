// 📁 app/curso/[id]/page.tsx
'use client'

import { useParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { useCourseNavigation } from "@/hooks/useCourseNavigation"
import CourseContent from "@/components/course/courseContent"
import { LessonList } from "@/components/course/lessonList"
import CourseNotFound from "@/components/course/courseNotFound"
import InstructorCard from "@/components/course/instructorCard"

export default function CoursePage() {
  const { id } = useParams()
  const [seekTo, setSeekTo] = useState<(seconds: number) => void>(() => () => {})

  const {
    course,
    currentLesson,
    handleToggleComplete,
    handleLessonSelect,
  } = useCourseNavigation(Number(id))
 
  // SIN <section> wrapper!
  if (!course) {
    return <CourseNotFound />
  }
return (
  <div className="w-full p-4 md:p-8 space-y-6 bg-gray-50 dark:bg-neutral-900">
    {/* Breadcrumb */}
    <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <Link 
        href="/" 
        className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        Dashboard
      </Link>
      
      <ChevronRightIcon className="w-4 h-4" />
      
      <Link 
        href="/" 
        className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
      >
        Cursos
      </Link>
      
      <ChevronRightIcon className="w-4 h-4" />
      
      <span className="font-medium text-gray-700 dark:text-gray-200">
        {course.title}
      </span>
    </nav>

    {/* Grid: Video + LessonList + Instructor */}
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">
      {/* Columna izquierda: Video */}
      <CourseContent 
        course={course} 
        onPlayerReady={(seekFn) => setSeekTo(() => seekFn)} 
      />

      {/* Columna derecha: LessonList + Instructor */}
      <div className="flex flex-col gap-6">
        <LessonList
          lessons={course.lessons}
          currentLessonId={currentLesson?.id || course.lessons[0]?.id}
          onLessonSelect={handleLessonSelect}
          onToggleComplete={handleToggleComplete}
          onTimestampClick={(lesson, seconds) => seekTo(seconds)} 
        />

        {/* InstructorCard debajo del LessonList */}
        <InstructorCard
          name="Juan Pérez"
          profession="Frontend Developer"
          image="/instructor.jpg"
          description="Juan tiene más de 10 años de experiencia en desarrollo web y enseñanza de tecnologías frontend. Siempre le gusta enseñar buenas prácticas y diseño limpio."
        />
      </div>
    </div>
  </div>
)

}