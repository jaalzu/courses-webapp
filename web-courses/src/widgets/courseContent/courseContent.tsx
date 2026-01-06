"use client";

import YouTube from "react-youtube";
import dynamic from 'next/dynamic';
import { useRef } from "react";
import type { Course } from "@/entities/course/types"

import { FavoriteButton } from "@/features/favorites/ui/favoriteButton";
import { useFavoriteIds } from "@/features/favorites/model/hooks/useFavoritesIds";

interface CourseContentProps {
  course: Course;
  currentVideoUrl?: string; 
  onPlayerReady?: (seekFn: (seconds: number) => void) => void;
}

export default function CourseContent({ 
  course, 
  currentVideoUrl,
  onPlayerReady 
}: CourseContentProps) {
  const playerRef = useRef<any>(null);
const { isFavorite, toggleFavorite } = useFavoriteIds()
  // Usa el video de la lección actual, o el de la primera lección si existe
  const videoToPlay = currentVideoUrl || course.lessons?.[0]?.videoUrl || course.video;


const YouTube = dynamic(() => import("react-youtube"), { 
  ssr: false, 
  loading: () => <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg" /> 
});

  const handleReady = (event: any) => {
    playerRef.current = event.target;
    if (onPlayerReady) {
      onPlayerReady((seconds: number) => {
        if (playerRef.current) {
          playerRef.current.seekTo(seconds, true);
          playerRef.current.playVideo();
        }
      });
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 md:p-5 space-y-6 w-full">
      {/* Título y favorito */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {course.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-blue-200">
            {course.lessons.length} lecciones · {course.duration}
          </p>
        </div>

        <FavoriteButton
          isFavorite={isFavorite(course.id)}
          onToggle={() => toggleFavorite(course.id)}
          noBorder
          className="ml-4"
        />
      </div>

      {/* Video */}
      {videoToPlay && (
        <div className="w-full rounded-lg overflow-hidden shadow-sm">
          <div className="relative w-full pb-[90%] sm:pb-[60%] md:pb-[68.25%]">
            <YouTube
              videoId={extractVideoId(videoToPlay)}
              onReady={handleReady}
              className="absolute top-0 left-0 w-full h-full"
              opts={{
                width: "100%",
                height: "100%",
                playerVars: { autoplay: 0 },
              }}
              key={videoToPlay}  
            />
          </div>
        </div>
      )}

      {/* Descripción */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Descripción del curso
        </h2>
        <p className="text-gray-800 text-sm leading-relaxed dark:text-blue-100 break-words whitespace-normal">
          {course.description}
        </p>
      </div>

      {/* Puntos clave */}
      {course.keyPoints && course.keyPoints.length > 0 && (
        <div>
          <h3 className="text-md font-semibold mb-2 text-gray-900 dark:text-white">
            Puntos clave
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 dark:text-blue-100 space-y-3">
            {course.keyPoints.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function extractVideoId(url: string | undefined): string {
  if (!url) return "";
  const match = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : url; 
}