'use client'

import { lazy, Suspense } from 'react'

// Lazy load del FAQ real
const FAQ = lazy(() => import('./FAQS'))

export function FAQWrapper() {
  return (
    <Suspense fallback={<div>Cargando FAQ...</div>}>
      <FAQ />
    </Suspense>
  )
}
