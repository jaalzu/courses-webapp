'use client'
import { useMemo } from "react"
import { useUserProgress } from "@/entities/progress/model/useProgressQueries"
import { useProgressMutations } from "@/entities/progress/model/useProgressMutations"
import { Accordion, Badge, ScrollArea } from "@/shared/ui"
import { LessonItem } from "./LessonItem"
import type { Lesson } from "@/entities/lesson/types"

interface LessonListProps {
  lessons: Lesson[]; currentLessonId: string | number; courseId: string; userId: string; onLessonSelect: (lesson: Lesson) => void;
}

export function LessonList({ lessons, currentLessonId, courseId, userId, onLessonSelect }: LessonListProps) {
  const { data: progress = [] } = useUserProgress(userId)
  const { toggleLesson, isUpdating } = useProgressMutations()

  const completedCount = lessons.filter(l => progress.some(p => p.lessonId === l.id)).length
const percentage = useMemo(() => 
  lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0,
[completedCount, lessons.length])

  const handleToggleProgress = (e: React.MouseEvent, lessonId: string) => {
    e.preventDefault(); e.stopPropagation()
    const isActuallyCompleted = progress.some(p => p.lessonId === lessonId)
    toggleLesson.mutate({ userId, courseId, lessonId, currentCompleted: isActuallyCompleted })
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm flex flex-col h-full border border-gray-100 dark:border-gray-800 overflow-hidden">
      
      {/* HEADER  */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contenido del curso</h3>
          <Badge variant="secondary" className="text-xs">{completedCount}/{lessons.length} completadas</Badge>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
        </div>
        <p className="text-xs text-gray-500 mt-1">{percentage}% completado</p>
      </div>

      <ScrollArea className="flex-1">
        <Accordion type="single" collapsible className="px-2 py-2">
          {lessons.map(lesson => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              isActive={lesson.id === currentLessonId}
              isCompleted={progress.some(p => p.lessonId === lesson.id)}
              isUpdating={isUpdating}
              onSelect={onLessonSelect}
              onToggleProgress={handleToggleProgress}
            />
          ))}
        </Accordion>
      </ScrollArea>
    </div>
  )
}