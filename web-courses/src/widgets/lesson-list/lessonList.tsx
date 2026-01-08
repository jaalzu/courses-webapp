'use client'

import { useEffect } from "react"
import styles from "./lessonList.module.css"
import type { Lesson } from "@/entities/lesson/types"

import {
  PlayIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  ScrollArea,
} from "@/shared/ui"

import { cn } from "@/shared/lib/utils"
import { useProgress} from "@/entities/progress/model/useProgress"
import { isLessonCompleted } from "@/entities/progress"

interface LessonListProps {
  lessons: Lesson[]
  currentLessonId: string | number;
  courseId: string
  userId: string
  onLessonSelect: (lesson: Lesson) => void
}

export function LessonList({
  lessons,
  currentLessonId,
  courseId,
  userId,
  onLessonSelect,
}: LessonListProps) {

  const {progress,markLessonCompleted,fetchUserProgress} = useProgress()

  // Cargar progreso del usuario
  useEffect(() => {
    if (userId) {
      fetchUserProgress(userId)
    }
  }, [userId, fetchUserProgress])

  // Métricas
  const completedCount = lessons.filter(lesson =>
    isLessonCompleted(progress, userId, courseId, lesson.id)
  ).length

  const totalLessons = lessons.length
  const percentage =
    totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0

  // Handler async para marcar completada
  const handleMarkComplete = async (lessonId: string) => {
    await markLessonCompleted(userId, courseId, lessonId)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Contenido del curso
          </h3>
          <Badge variant="secondary" className="text-xs">
            {completedCount}/{totalLessons} completadas
          </Badge>
        </div>

        <div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {percentage}% completado
          </p>
        </div>
      </div>

      {/* LISTA */}
      <ScrollArea className="h-full">
        <Accordion type="single" collapsible className="px-2 py-2">
          {lessons.map(lesson => {
            const isActive = lesson.id === currentLessonId
            const completed = isLessonCompleted(
              progress,
              userId,
              courseId,
              lesson.id
            )

            return (
              <AccordionItem
                key={lesson.id}
                value={`lesson-${lesson.id}`}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <AccordionTrigger
                  className={cn(
                    "hover:no-underline py-4 px-2 rounded-lg transition-colors",
                    "hover:bg-gray-50 dark:hover:bg-gray-800",
                    isActive &&
                      "text-indigo-600 dark:text-indigo-400 font-semibold"
                  )}
                >
                  <div className="flex items-center gap-3 flex-1 text-left">
                    {completed ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : isActive ? (
                      <ClockIcon
                        className={cn(
                          "w-5 h-5 text-yellow-400",
                          styles.softPulse
                        )}
                      />
                    ) : (
                      <ClockIcon className="w-5 h-5 text-gray-400" />
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {lesson.title}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {lesson.duration}
                        </Badge>

                        {isActive && (
                          <Badge className="text-xs bg-blue-700 text-white">
                            Reproduciendo
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="pl-8 pr-4 pb-4 space-y-4 mt-2">
                    <button
                      onClick={() => onLessonSelect(lesson)}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm",
                        isActive
                          ? "bg-blue-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                      )}
                    >
                      <PlayIcon className="w-4 h-4" />
                      Reproducir lección
                    </button>

                    {!completed ? (
                     <button
onClick={() => handleMarkComplete(lesson.id)}

  className="w-full bg-green-500 hover:bg-green-400 text-white font-medium py-2 rounded-lg"
>
  Marcar como finalizada
</button>

                    ) : (
                      <div className="w-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 font-medium py-2 rounded-lg text-center">
                        Lección completada ✅
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </ScrollArea>
    </div>
  )
}