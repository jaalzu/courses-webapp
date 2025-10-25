'use client'

import { Course } from "@/lib/data/curso"

interface CourseContentProps {   // 🔹 define la interfaz
  course: Course
}

export default function CourseContent({ course }: CourseContentProps) {
  return (
    <section className="space-y-4 bg-white p-4 dark:bg-neutral-900 rounded-lg shadow-sm">
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
  )
}
