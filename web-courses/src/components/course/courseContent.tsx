'use client'

import YouTube from "react-youtube"
import { useRef } from "react"
import type { Course } from "@/types"

interface CourseContentProps {
  course: Course
  onPlayerReady?: (seekFn: (seconds: number) => void) => void
}

export default function CourseContent({ course, onPlayerReady }: CourseContentProps) {
  const playerRef = useRef<any>(null)

  const handleReady = (event: any) => {
    playerRef.current = event.target
    if (onPlayerReady) {
      onPlayerReady((seconds: number) => {
        if (playerRef.current) {
          playerRef.current.seekTo(seconds, true)
          playerRef.current.playVideo()
        }
      })
    }
  }

  return (
    <section className="space-y-6 bg-white p-6 dark:bg-gray-900 rounded-lg shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {course.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-blue-200">
          {course.lessons.length} lecciones · {course.duration}
        </p>
      </div>

      {course.video && (
        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-sm">
  <YouTube
    videoId={extractVideoId(course.video)}
    onReady={handleReady}
    className="w-full h-full"
    opts={{
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 0,
      },
    }}
  />
</div>

      )}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Descripción del curso
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed dark:text-blue-100">
          {course.description}
        </p>
      </div>
    </section>
  )
}

function extractVideoId(url: string): string {
  // Soporta: youtu.be/ID, v=ID, embed/ID
  const match = url.match(
    /(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : url
}
