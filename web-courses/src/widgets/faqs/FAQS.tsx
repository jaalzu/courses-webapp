'use client'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/shared/ui/index"
import { DashboardLayout } from '@/shared/layouts/DashboardLayout'


const faqs = [
  { question: "¿Qué tecnologías usas en tus proyectos?", answer: "Principalmente React, Next.js, TypeScript, Tailwind CSS, y Shadcn UI. También manejo Node.js y Express para backend cuando es necesario." },
  { question: "¿Puedo contactarte para un proyecto freelance?", answer: "Sí, en la sección de contacto encontrarás un formulario y mis redes para comunicarte directamente conmigo." },
  { question: "¿Tus proyectos son open source?", answer: "Muchos sí, especialmente los educativos o plantillas de frontend. Algunos proyectos de clientes son privados." },
  { question: "¿Tienes experiencia con APIs externas?", answer: "Sí, he trabajado con APIs públicas y privadas, incluyendo autenticación, fetch, y consumo de datos en tiempo real." },
]

export default function FAQ() {
  return (
    <DashboardLayout
  title="Preguntas Frecuentes"
  description="Respuestas a las dudas más comunes"
>
      <Accordion type="multiple" className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <AccordionTrigger className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-3 text-left text-gray-900 dark:text-white font-medium transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-gray-700 dark:text-gray-200">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </DashboardLayout>
  )
}
