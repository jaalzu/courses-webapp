// 📁 app/faq/page.tsx
'use client'

import FAQ from '@/components/ui/FAQS'

export default function FAQPage() {
  return (
    <main className="min-h-screen p-5 pt-12 md:p-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Título principal */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Preguntas Frecuentes
        </h1>

        {/* Subtítulo centrado */}
        <p className="text-gray-700 dark:text-gray-300 mb-10 text-base md:text-lg">
          Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros cursos y plataforma.
        </p>

        {/* Componente FAQ */}
        <div className="text-left">
          <FAQ />
        </div>
      </div>
    </main>
  )
}
