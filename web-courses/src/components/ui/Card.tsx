'use client'

interface CardProps {
  image: string
  title: string
  description: string
  progress: number
  className?: string 
    children?: React.ReactNode

}

export default function Card({ image, title, description, progress, className }: CardProps) {
  return (
   <div className={`bg-white rounded-xl shadow-md overflow-hidden flex flex-col ${className}`}>
  <img src={image} alt={title} className="w-full h-40 object-cover" />

  <div className="p-4 flex flex-col flex-1">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <div className="flex-1"></div>
  </div>

  {/* Barra de progreso al borde */}
  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
    <div
      className="bg-blue-500 h-2 rounded-full"
      style={{ width: `${progress}%` }}
    />
  </div>
</div>

  )
}
