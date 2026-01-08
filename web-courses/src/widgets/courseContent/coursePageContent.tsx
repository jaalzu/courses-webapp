'use client'

// 1. React & Next
import { useEffect } from "react"

// 2. Features (Lógica de negocio/interacción)
import { ForumSection } from '@/features/forum/ui/ForumSection'
import { useCourseNavigation } from "@/features/course-navigation/useCourseNavigation"
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { useProgress } from "@/entities/progress/model/useProgress" 

// 3. Widgets (Piezas grandes de UI)
import CourseContent from "@/widgets/courseContent/courseContent"
import { LessonList } from "@/widgets/lesson-list/lessonList"
import InstructorCard from "@/widgets/courseContent/instructorCard"
import { CourseSwitcher } from "@/widgets/courseContent/courseSwitcher"

// 4. Types
import type { Lesson } from "@/entities/lesson/types"

interface CoursePageContentProps {
  courseId: string
}

export default function CoursePageContent({ courseId }: CoursePageContentProps) {
  // 1. Auth & Global Hooks
  const currentUser = useAuthStore(state => state.currentUser)
  const userId = currentUser?.id || "user-default"
  const { fetchUserProgress } = useProgress() // ← Hook de progreso

  // 2. Navigation Hook
  const { course, currentLesson, selectLesson } = useCourseNavigation(courseId)

  // 3. Cargar progreso una sola vez al entrar a la página
  useEffect(() => {
    if (userId && userId !== "user-default") {
      fetchUserProgress(userId)
    }
  }, [userId, fetchUserProgress])

  // 4. Derivación de datos
  const currentVideoUrl = currentLesson?.videoUrl || course?.lessons[0]?.videoUrl

  const handleLessonClick = (lesson: Lesson) => {
    selectLesson(lesson)
  }

  if (!course) return null

  return (
    <main className="w-full p-4 md:p-8 space-y-5">
      {/* HEADER */}
      <div className="flex justify-between items-center pb-1">
        <CourseSwitcher currentCourseId={courseId} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* LADO IZQUIERDO: VIDEO Y DETALLES */}
        <CourseContent
          course={course}
          currentVideoUrl={currentVideoUrl}
        />

        {/* LADO DERECHO: LISTA Y DOCENTE */}
        <div className="flex flex-col gap-6">
          <LessonList
            userId={userId}
            courseId={courseId}
            lessons={course.lessons}
            currentLessonId={currentLesson?.id || course.lessons[0]?.id}
            onLessonSelect={handleLessonClick}
          />

          {course.instructor && (
            <InstructorCard
              name={course.instructor}
              profession="Instructor"
              image="/avatar.webp"
              description={`${course.instructor} te guiará a través de este curso con explicaciones claras y ejemplos prácticos.`}
            />
          )}
        </div>
      </div>

      {/* SECCIÓN INFERIOR: FORO */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
        <ForumSection
          courseId={courseId}
          currentUserId={userId}
          currentUserName={currentUser?.name || "Usuario"}
        />
      </div>
    </main>
  )
}