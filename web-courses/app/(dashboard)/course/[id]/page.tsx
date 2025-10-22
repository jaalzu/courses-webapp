'use client'

import { useParams } from "next/navigation"
import { courses, Course } from "@/lib/data/curso"

export default function CoursePage() {
  const { id } = useParams()
  const course: Course | undefined = courses.find((c) => c.id.toString() === id)

  if (!course) {
    return <div className="p-6 text-gray-600">Curso no encontrado.</div>
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">
        Dashboard / Cursos / <span className="font-medium text-gray-700">{course.title}</span>
      </p>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* IZQUIERDA: Video + descripción */}
        <section className="space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">{course.title}</h1>
            <p className="text-sm text-gray-500">
              {course.lessons.length} lecciones · {course.duration}
            </p>
          </div>

          <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-sm">
            <iframe
              src={course.video}
              className="w-full h-full"
              allowFullScreen
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-1">Descripción</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
          </div>
        </section>

        {/* DERECHA: Lista de lecciones */}
        <aside className="space-y-3">
          <h3 className="text-lg font-semibold">Lecciones</h3>
          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
            {course.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-3 bg-white rounded-md shadow-sm hover:bg-gray-50 cursor-pointer transition"
              >
                <p className="text-sm font-medium text-gray-700">{lesson.title}</p>
                <span className="text-xs text-gray-500">{lesson.duration}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
