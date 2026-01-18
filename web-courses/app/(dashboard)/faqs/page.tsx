
import { FAQWrapper } from '@/widgets/faqs/FAQWrapper'

export const dynamic = 'force-dynamic' 

export default function FAQPage() {


  return (
    <main className="min-h-screen p-5 pt-12 md:p-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="uppercase tracking-widest text-muted-foreground text-2xl">
          Preguntas Frecuentes
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-10 text-base md:text-lg">
          Aquí encontrarás respuestas a las preguntas más comunes sobre nuestros cursos y plataforma.
        </p>

        <div className="text-left">
          <FAQWrapper />
        </div>
      </div>
    </main>
  )
}
