// 📁 components/course/courseContent.tsx
'use client'

import type { Course } from "@/types" 

interface CourseContentProps {
  course: Course
}

export default function CourseContent({ course }: CourseContentProps) {
  return (
    <section className="space-y-4 bg-white p-6 dark:bg-gray-900 rounded-lg shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold">{course.title}</h1>
        <p className="text-sm text-gray-500 dark:text-blue-200">
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
        <p className="text-gray-600 text-sm leading-relaxed dark:text-blue-200">
          {course.description}
        </p>
      </div>
    </section>
  )
}