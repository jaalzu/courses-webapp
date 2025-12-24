'use client'

import { useState, useEffect } from "react"
import { ForumSection } from '@/features/forum/ui/ForumSection'
import { useCourseNavigation } from "@/features/course-navigation/model/useCourseNavigation"
import CourseContent from "@/widgets/courseContent/courseContent"
import { LessonList } from "@/widgets/lesson-list/lessonList"
import InstructorCard from "@/widgets/courseContent/instructorCard"
import { CourseSwitcher } from "@/widgets/courseContent/courseSwitcher"
import type { Lesson } from "@/entities/lesson/types"
import { useCurrentUser } from "@/shared/mocks/useCurrentUser"

interface CoursePageContentProps {
  courseId: number
}

export default function CoursePageContent({ courseId }: CoursePageContentProps) {
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | undefined>()

  const currentUser = useCurrentUser()
  const userId = currentUser?.id || "user-default"

  const { course, currentLesson, selectLesson } = useCourseNavigation(courseId)

  useEffect(() => {
    if (currentLesson?.videoUrl) {
      setCurrentVideoUrl(currentLesson.videoUrl)
    }
  }, [currentLesson])

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.videoUrl) {
      setCurrentVideoUrl(lesson.videoUrl)
    } else {
      setCurrentVideoUrl(undefined)
    }
    selectLesson(lesson) // ✅ AHORA SÍ está definido
  }

  if (!course) return null

  return (
    <main className="w-full p-4 md:p-8 space-y-5">
      <div className="flex justify-between items-center pb-1">
        <CourseSwitcher currentCourseId={courseId} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10">
        <CourseContent
          course={course}
          currentVideoUrl={currentVideoUrl} 
        />

        <div className="flex flex-col gap-6">
          <LessonList
            userId={userId}
            courseId={courseId}
            lessons={course.lessons}
            currentLessonId={currentLesson?.id || course.lessons[0]?.id}
            onLessonSelect={handleLessonClick}
          />

          <InstructorCard
            name="Juan Pepe"
            profession="Frontend Developer"
            image="/avatar.webp"
            description="Juan es un apasionado del desarrollo web con más de 10 años de experiencia. Ha trabajado en proyectos de todo tipo, desde startups hasta grandes empresas. Le encanta enseñar: disfruta compartir su conocimiento de manera clara y práctica."
          />
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
        <ForumSection
          courseId={String(courseId)}
          currentUserId={userId}
          currentUserName={currentUser?.name || "Usuario"}
        />
      </div>
    </main>
  )
}