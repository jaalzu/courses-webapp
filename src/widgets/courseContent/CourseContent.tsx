// widgets/courseContent/CourseContent.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import type { Course } from "@/entities/course/types";
import { FavoriteButton } from "@/features/favorites/ui/FavoriteButton";
import { useFavoriteIds } from "@/features/favorites/model/hooks/useFavoritesIds";
import { PlayIcon } from '@heroicons/react/24/solid';

interface CourseContentProps {
  course: Course;
  currentVideoUrl?: string;
}

// Mantenemos el import dinámico pero ahora solo se montará cuando playVideo sea true
const YouTube = dynamic(() => import("react-youtube"), { 
  ssr: false, 
  loading: () => <div className="w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse flex items-center justify-center text-gray-400">Cargando reproductor...</div> 
});

export default function CourseContent({ course, currentVideoUrl }: CourseContentProps) {
  const { isFavorite, toggleFavorite } = useFavoriteIds();
  const [playVideo, setPlayVideo] = useState(false);

  // El video a reproducir: prioridad a la lección seleccionada, luego la primera lección, luego el video del curso
  const videoToPlay = currentVideoUrl || course.lessons?.[0]?.videoUrl || course.video;
  const videoId = extractVideoId(videoToPlay);

  // ✨ LIMPIEZA: Si el usuario cambia de lección, volvemos al estado de "miniatura" 
  // para evitar que se acumulen procesos de YouTube en segundo plano.
  useEffect(() => {
    setPlayVideo(false);
  }, [currentVideoUrl]);

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4 md:p-5 space-y-6 w-full">
      {/* HEADER */}
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

      {/* REPRODUCTOR DE VIDEO / FACHADA */}
      {videoToPlay && (
        <div className="w-full rounded-lg overflow-hidden shadow-sm bg-black aspect-video relative">
          {!playVideo ? (
            // 🖼️ FACHADA: Solo una imagen y un botón de Play. 
            // Esto ahorra ~1MB de JS en la carga inicial.
            <div 
              className="relative w-full h-full cursor-pointer group"
              onClick={() => setPlayVideo(true)}
            >
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Miniatura del video"
                fill
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                priority // Cargamos rápido la miniatura
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <PlayIcon className="w-10 h-10 text-blue-700 dark:text-blue-400" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/60 px-2 py-1 rounded text-xs text-white">
                Hacer clic para reproducir
              </div>
            </div>
          ) : (
            // 📺 REPRODUCTOR REAL: Solo se monta tras el clic
            <div className="relative w-full h-full">
              <YouTube
                videoId={videoId}
                className="absolute top-0 left-0 w-full h-full"
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: { 
                    autoplay: 1, // Autoplay porque ya hubo interacción del usuario
                    modestbranding: 1,
                    rel: 0 
                  },
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* DESCRIPCIÓN */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Descripción del curso
        </h2>
        <p className="text-gray-800 text-sm leading-relaxed dark:text-blue-100 break-words whitespace-normal">
          {course.description}
        </p>
      </div>

      {/* PUNTOS CLAVE */}
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