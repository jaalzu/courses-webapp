'use client'

import { Play, Clock, CheckCircle2, Circle } from "lucide-react"
import type { Lesson } from "@/lib/data/curso"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface LessonListProps {
  lessons: Lesson[]
  currentLessonId: number
  onLessonSelect: (lesson: Lesson) => void
  onTimestampClick: (lesson: Lesson, seconds: number) => void
  onToggleComplete: (lessonId: number) => void
}

export function LessonList({ 
  lessons, 
  currentLessonId, 
  onLessonSelect, 
  onTimestampClick,
  onToggleComplete
}: LessonListProps) {

  const completedCount = lessons.filter(l => l.completed).length
  const totalLessons = lessons.length
  const progress = Math.round((completedCount / totalLessons) * 100)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden overflow-x-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-400" >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Contenido del curso
          </h3>
          <Badge variant="secondary" className="text-xs">
            {completedCount}/{totalLessons} completadas
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {progress}% completado
          </p>
        </div>
      </div>
      
      {/* Lessons List */}
      <ScrollArea className="h-[600px] w-full">
        <div className="px-6 py-2 w-full">
          <Accordion type="single" collapsible className="w-full">
            {lessons.map((lesson) => {
              const isActive = currentLessonId === lesson.id

              return (
                <AccordionItem 
                  key={lesson.id} 
                  value={`lesson-${lesson.id}`}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <AccordionTrigger 
                    className={cn(
                      "hover:no-underline py-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-2 transition-colors",
                      isActive && "text-indigo-600 dark:text-indigo-400 font-semibold"
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1 text-left">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {lesson.duration}
                          </Badge>
                          {isActive && (
                            <Badge className="text-xs bg-indigo-600 hover:bg-indigo-700">
                              Reproduciendo
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="pl-8 pr-4 pb-4 space-y-3">
                      {/* Botón reproducir lección completa */}
                      <button 
                        onClick={() => onLessonSelect(lesson)}
                        className={cn(
                          "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors",
                          isActive 
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                            : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                        )}
                      >
                        <Play className="w-4 h-4" />
                        Reproducir lección completa
                      </button>

                      {/* Timestamps */}
                      {lesson.timestamps && lesson.timestamps.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Momentos clave
                          </p>
                          <div className="space-y-1">
                            {lesson.timestamps.map((timestamp, index) => (
                              <button
                                key={index}
                                onClick={() => onTimestampClick(lesson, timestamp.seconds)}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left group"
                              >
                                <Badge variant="outline" className="font-mono text-xs flex-shrink-0">
                                  {timestamp.time}
                                </Badge>
                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                  {timestamp.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Botón marcar como completada */}
                      {!lesson.completed && (
                        <button
                          onClick={() => onToggleComplete(lesson.id)}
                          className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition-colors"
                        >
                          Marcar como completada
                        </button>
                      )}

                      {/* Mensaje si ya está completada */}
                      {lesson.completed && (
                        <div className="mt-3 w-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 font-medium py-2 rounded-lg text-center">
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
