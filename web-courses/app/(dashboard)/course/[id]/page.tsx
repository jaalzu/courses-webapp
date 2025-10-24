'use client'

import { useParams } from "next/navigation"
import { courses, Course } from "@/lib/data/curso"
import CourseContent from "@/components/course/courseContent"
import {LessonList} from "@/components/course/lessonList"

export default function CoursePage() {
  const { id } = useParams()
  const course: Course | undefined = courses.find((c) => c.id.toString() === id)

  if (!course) return <div className="p-6 text-gray-600">Curso no encontrado.</div>

  return (
    <div className="p-4 md:p-8 space-y-6 bg-gray-50">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">
        Dashboard / Cursos / <span className="font-medium text-gray-700">{course.title}</span>
      </p>

      {/* Contenedor principal: grid para contenido y lista */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Izquierda: Video + descripción */}
        <CourseContent course={course} />

        {/* Derecha: Lista de lecciones */}
        <LessonList lessons={course.lessons} />
      </div>
    </div>
  )
}
