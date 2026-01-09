'use client'


// 2. Features
import { ForumSection } from '@/features/forum/ui/ForumSection'
import { useCourseNavigation } from "@/features/course-navigation/useCourseNavigation"
import { useAuthStore } from '@/features/auth/model/useAuthStore'
import { useUserProgress } from "@/entities/progress/model/useProgressQueries" 

// 3. Widgets
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
  const currentUser = useAuthStore(state => state.currentUser)
  const userId = currentUser?.id || ""

  const { course, currentLesson, selectLesson } = useCourseNavigation(courseId)

  useUserProgress(userId)

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
              description={`${course.instructor} te guiará a través de este curso.`}
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