// 📁 components/course/courseNotFound.tsx
import Link from "next/link"

export default function CourseNotFound() {
  return (
    <div className="flex items-center justify-center w-full" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <div className="text-center space-y-4 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
          Opa, este curso no existe .
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          Parece que te perdiste en el camino, crack. Este curso no está en nuestra base de datos (o escribiste mal la URL, no pasa nada, nos pasa a todos).
        </p>
        <Link 
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}