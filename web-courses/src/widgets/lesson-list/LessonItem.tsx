// widgets/lesson-list/ui/lesson-item.tsx
import { PlayIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { AccordionContent, AccordionItem, AccordionTrigger, Badge } from "@/shared/ui"
import { cn } from "@/shared/lib/utils"
import styles from "./lessonList.module.css"
import type { Lesson } from "@/entities/lesson/types"

interface LessonItemProps {
  lesson: Lesson
  isActive: boolean
  isCompleted: boolean
  isUpdating: boolean
  onSelect: (lesson: Lesson) => void
  onToggleProgress: (e: React.MouseEvent, lessonId: string) => void
}

export function LessonItem({ 
  lesson, isActive, isCompleted, isUpdating, onSelect, onToggleProgress 
}: LessonItemProps) {
  return (
    <AccordionItem value={`lesson-${lesson.id}`} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
      <AccordionTrigger className={cn(
        "hover:no-underline py-4 px-2 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
        isActive && "text-indigo-600 dark:text-indigo-400 font-semibold"
      )}>
        <div className="flex items-center gap-3 flex-1 text-left">
          {isCompleted ? (
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
          ) : (
            <ClockIcon className={cn("w-5 h-5", isActive ? ["text-yellow-400", styles.softPulse] : "text-gray-400")} />
          )}

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{lesson.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-[10px] h-4">
                <ClockIcon className="w-3 h-3 mr-1" /> {lesson.duration}
              </Badge>
              {isActive && (
                <Badge className="text-[10px] h-4 bg-blue-700 text-white border-0">Viendo ahora</Badge>
              )}
            </div>
          </div>
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <div className="pl-8 pr-4 pb-4 space-y-3 mt-2">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onSelect(lesson); }}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all",
              isActive ? "bg-blue-700 text-white" : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            )}
          >
            <PlayIcon className="w-4 h-4" /> Reproducir lección
          </button>

          <button
            type="button"
            onClick={(e) => onToggleProgress(e, lesson.id)}
            disabled={isUpdating}
            className={cn(
              "w-full font-medium py-2 rounded-lg transition-all text-sm border outline-none",
              isCompleted 
                ? "border-green-600 text-green-600 bg-transparent hover:text-green-400 hover:bg-green-50/30" 
                : "bg-green-600 border-transparent text-white hover:bg-green-700 shadow-sm"
            )}
          >
            {isCompleted ? "✓ Completada (Desmarcar)" : "Marcar como finalizada"}
          </button>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}