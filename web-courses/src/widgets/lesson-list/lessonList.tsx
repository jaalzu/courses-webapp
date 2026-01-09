'use client'

// 1. React & Styles
import styles from "./lessonList.module.css"

// 2. Entities & Queries
import { useUserProgress } from "@/entities/progress/model/useProgressQueries"
import { useProgressMutations } from "@/entities/progress/model/useProgressMutations"
import { isLessonCompleted } from "@/entities/progress"

// 3. UI Components
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

// 4. Types
import type { Lesson } from "@/entities/lesson/types"

interface LessonListProps {
  lessons: Lesson[]
  currentLessonId: string | number
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
  // 1. Queries y Mutaciones
  const { data: progress = [] } = useUserProgress(userId)
  const { toggleLesson, isUpdating } = useProgressMutations()

  // 2. Cálculos derivados
  const completedCount = lessons.filter(lesson =>
    progress.some(p => p.lessonId === lesson.id)
  ).length

  const totalLessons = lessons.length
  const percentage = totalLessons > 0 
    ? Math.round((completedCount / totalLessons) * 100) 
    : 0

  // 3. Handler corregido para frenar el refresh
  const handleToggleProgress = (e: React.MouseEvent, lessonId: string) => {
    e.preventDefault()
    e.stopPropagation() 

    const isActuallyCompleted = progress.some(p => p.lessonId === lessonId)
    
    toggleLesson.mutate({ 
      userId, 
      courseId, 
      lessonId, 
      currentCompleted: isActuallyCompleted 
    })
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-800">
      
      {/* HEADER: Progreso General */}
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
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {percentage}% completado
          </p>
        </div>
      </div>

      {/* LISTA: Accordion con lecciones */}
      <ScrollArea className="flex-1">
        <Accordion type="single" collapsible className="px-2 py-2">
          {lessons.map(lesson => {
            const isActive = lesson.id === currentLessonId
            const isCompleted = progress.some(p => p.lessonId === lesson.id)

            return (
              <AccordionItem
                key={lesson.id}
                value={`lesson-${lesson.id}`}
                className="border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <AccordionTrigger
                  className={cn(
                    "hover:no-underline py-4 px-2 rounded-lg transition-colors",
                    "hover:bg-gray-50 dark:hover:bg-gray-800",
                    isActive && "text-indigo-600 dark:text-indigo-400 font-semibold"
                  )}
                >
                  <div className="flex items-center gap-3 flex-1 text-left">
                    {isCompleted ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <ClockIcon 
                        className={cn(
                          "w-5 h-5", 
                          isActive ? ["text-yellow-400", styles.softPulse] : "text-gray-400"
                        )} 
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {lesson.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-[10px] h-4">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          {lesson.duration}
                        </Badge>
                        {isActive && (
                          <Badge className="text-[10px] h-4 bg-blue-700 text-white border-0">
                            Viendo ahora
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="pl-8 pr-4 pb-4 space-y-3 mt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLessonSelect(lesson);
                      }}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all",
                        isActive
                          ? "bg-blue-700 text-white"
                          : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                      )}
                    >
                      <PlayIcon className="w-4 h-4" />
                      Reproducir lección
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleToggleProgress(e, lesson.id)}
                      disabled={isUpdating}
                      className={cn(
  "w-full font-medium py-2 rounded-lg transition-all text-sm border outline-none",
  isCompleted 
    ? "border-green-600 text-green-600 bg-transparent hover:text-green-400 hover:bg-green-50/30 dark:hover:bg-green-900/10" 
    : "bg-green-600 border-transparent text-white hover:bg-green-700 shadow-sm"
)}
                    >
                      {isCompleted ? "✓ Completada (Desmarcar)" : "Marcar como finalizada"}
                    </button>
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