'use client'

import type { Course } from "@/types"

interface CourseContentProps {
  course: Course
}

export default function CourseContent({ course }: CourseContentProps) {
  return (
    <section className="space-y-6 bg-white p-6 dark:bg-gray-900 rounded-lg shadow-sm">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {course.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-blue-200">
          {course.lessons.length} lecciones · {course.duration}
        </p>
      </div>

      {/* Video principal */}
      {course.video && (
        <div className="w-full aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-sm">
          <iframe
            src={course.video}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      )}

      {/* Descripción */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Descripción del curso
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed dark:text-blue-200">
          {course.description}
        </p>
      </div>

      {/* Info adicional opcional */}
      {course.extraInfo && (
        <div>
          <p className="text-gray-600 text-sm leading-relaxed dark:text-blue-200 mt-3">
            {course.extraInfo}
          </p>
        </div>
      )}

      {/* Puntos clave opcionales */}
      {course.keyPoints && course.keyPoints.length > 0 && (
        <div>
          <h3 className="text-md font-semibold mb-2 text-gray-900 dark:text-white">
            Puntos clave que vas a explorar
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-blue-200 space-y-1">
            {course.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Cita final opcional */}
      {course.quote && (
        <div className="border-l-4 border-blue-500 pl-4 text-sm italic text-gray-600 dark:text-blue-200 bg-blue-50/40 dark:bg-blue-950/30 rounded-md py-3">
          {`“${course.quote}”`}
        </div>
      )}
    </section>
  )
}
