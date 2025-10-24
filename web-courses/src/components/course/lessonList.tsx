'use client'

import { useState } from "react"
import { Play, ChevronDown, ChevronUp } from "lucide-react"

interface Lesson {
  id: number
  title: string
  duration: string
}

interface LessonListProps {
  lessons: Lesson[]
}

export function LessonList({ lessons }: LessonListProps) {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null)

  const toggleLesson = (id: number) => {
    setExpandedLesson(expandedLesson === id ? null : id)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Contenido del curso
      </h3>

      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
        {lessons.map((lesson) => (
          <li
            key={lesson.id}
            className={`transition-all ${
              expandedLesson === lesson.id
                ? "bg-gray-50 dark:bg-gray-800"
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            <button
              onClick={() => toggleLesson(lesson.id)}
              className="w-full flex items-center justify-between p-3 text-left"
            >
              <div className="flex items-center gap-3">
                <Play className="w-5 h-5 text-indigo-500" />
                <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                  {lesson.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {lesson.duration}
                </span>
                {expandedLesson === lesson.id ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>

            {expandedLesson === lesson.id && (
              <div className="px-10 pb-3 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  Esta lección cubre los conceptos clave de <b>{lesson.title}</b> 
                  y su aplicación práctica en el desarrollo del curso.
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
