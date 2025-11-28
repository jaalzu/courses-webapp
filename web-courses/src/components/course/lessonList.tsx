'use client'

import styles from "./lessonList.module.css"
import type { Lesson } from "@/types"
import { PlayIcon, ClockIcon, CheckCircleIcon} from '@heroicons/react/24/outline'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface LessonListProps {
  lessons: Lesson[]
  currentLessonId: number
  onLessonSelect: (lesson: Lesson) => void
  onToggleComplete: (lessonId: number) => void
}

export function LessonList({ 
  lessons, 
  currentLessonId, 
  onLessonSelect, 
  onToggleComplete
}: LessonListProps) {
  const completedCount = lessons.filter(l => l.completed).length
  const totalLessons = lessons.length
  const progress = Math.round((completedCount / totalLessons) * 100)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden overflow-x-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-gray-400">
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
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-blue-200 mt-1">
            {progress}% completado
          </p>
        </div>
      </div>

      <ScrollArea className="w-full h-full pb-8">
        <div className="px-2 py-2 w-full">
          <Accordion type="single" collapsible className="w-full">
            {lessons.map((lesson) => {
              const isActive = currentLessonId === lesson.id

              return (
                <AccordionItem 
                  key={lesson.id} 
                  value={`lesson-${lesson.id}`}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <AccordionTrigger 
                    className={cn(
                      "hover:no-underline py-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-2 transition-colors",
                      isActive && "text-indigo-600 dark:text-indigo-400 font-semibold"
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1 text-left">
        {lesson.completed ? (
  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
) : isActive ? (
  <ClockIcon
    className={`w-5 h-5 text-yellow-400 dark:text-yellow-300 flex-shrink-0 ${styles.softPulse}`}
  />
) : (
  <ClockIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
)}


                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            {lesson.duration}
                          </Badge>
                          {isActive && (
                            <Badge className="text-xs bg-blue-700 hover:bg-blue-700 dark:text-blue-100">
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
                          "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors",
                          isActive 
                            ? "bg-blue-700 hover:bg-blue-700 text-white" 
                            : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                        )}
                      >
                        <PlayIcon className="w-4 h-4" />
                        Reproducir lección completa
                      </button>


                      {!lesson.completed && (
                        <button
                          onClick={() => onToggleComplete(lesson.id)}
                          className="mt-3 w-full bg-green-500 hover:bg-green-400 text-white font-medium py-2 rounded-lg transition-colors"
                        >
                          Marcar como finalizado
                        </button>
                      )}

                      {lesson.completed && (
                        <div className="mt-3 w-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 font-medium py-2 rounded-lg text-center">
                          Lección completada ✅
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  )
}
