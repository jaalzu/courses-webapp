'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCourseStore } from "@/lib/store/courses"
import { PencilIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function PerfilPage() {
  const courses = useCourseStore(state => state.courses)
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState("Juan Pérez")

  const totalCourses = courses.length
  const completedCourses = courses.filter(course => 
    course.lessons.every(lesson => lesson.completed)
  ).length
  const inProgressCourses = courses.filter(course => 
    course.lessons.some(lesson => lesson.completed) &&
    !course.lessons.every(lesson => lesson.completed)
  ).length
  const totalLessons = courses.reduce((acc, course) => acc + course.lessons.length, 0)
  const completedLessons = courses.reduce((acc, course) => 
    acc + course.lessons.filter(lesson => lesson.completed).length, 0
  )
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

  const handleSaveName = () => setIsEditing(false)

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-neutral-900 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header Usuario */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* Avatar */}
            <Avatar className="h-24 w-24 md:h-28 md:w-28">
              <AvatarFallback className="text-2xl bg-blue-600 text-white">
                {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>

            {/* Info */}
            <div className="flex-1 text-center md:text-left space-y-3">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <Button onClick={handleSaveName} size="sm">Guardar</Button>
                  <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">Cancelar</Button>
                </div>
              ) : (
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">{userName}</h1>
                  <Button onClick={() => setIsEditing(true)} variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <p className="text-gray-600 dark:text-gray-400">estudiante@ejemplo.com</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <Badge variant="secondary" className="text-sm">🎓 Estudiante</Badge>
                <Badge variant="outline" className="text-sm">Miembro desde 2024</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cursos completados */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
            <CheckCircleIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{completedCourses}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">de {totalCourses} cursos</p>
            </div>
          </div>

          {/* Cursos en progreso */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-3">
            <ClockIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{inProgressCourses}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">cursos activos</p>
            </div>
          </div>

          {/* Progreso general */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{progressPercentage}%</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${progressPercentage}%` }} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{completedLessons}/{totalLessons} lecciones</p>
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-lg text-gray-900 dark:text-gray-100 font-semibold mb-2">Actividad Reciente</h2>
          <p className="text-gray-600 dark:text-gray-400">Aquí podrías mostrar los últimos cursos vistos, logros desbloqueados, etc.</p>
        </div>

      </div>
    </div>
  )
}
