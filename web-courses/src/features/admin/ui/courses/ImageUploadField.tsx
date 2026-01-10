'use client'

import { useState, useRef } from 'react'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

interface ImageUploadFieldProps {
  value: File | null
  onChange: (file: File | null) => void
  preview?: string
  error?: string
}

export function ImageUploadField({ value, onChange, preview, error }: ImageUploadFieldProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0])
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation() // Evitar que abra el selector de archivos
    onChange(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Imagen del curso *
      </label>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg text-center cursor-pointer
          transition-all duration-200
          ${preview ? 'p-0 h-48' : 'p-8'}
          ${dragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
          }
        `}
      >
        {preview ? (
          // Preview de la imagen con hover para cambiar
          <>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-white text-center space-y-2">
                <PhotoIcon className="w-12 h-12 mx-auto" />
                <p className="text-sm font-medium">Click o arrastra para cambiar</p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              type="button"
              className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all z-10"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 rounded-b-lg">
              <p className="text-white text-xs font-medium truncate">
                {value?.name || 'Imagen cargada'}
              </p>
              <p className="text-white/80 text-xs">
                {value ? `${(value.size / 1024).toFixed(0)} KB` : ''}
              </p>
            </div>
          </>
        ) : (
          // Zona de drop inicial
          <>
            <PhotoIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Arrastra una imagen o haz clic para seleccionar
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              JPG, PNG o WEBP • Máximo 2MB • Se redimensionará automáticamente
            </p>
          </>
        )}
        
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
           {error}
        </p>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400">
         Recomendado: 1200x675px (16:9) para mejor visualización
      </p>
    </div>
  )
}