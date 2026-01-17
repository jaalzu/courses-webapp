// app/(dashboard)/comunidad/page.tsx
'use client'

import dynamic from 'next/dynamic'
import { CommunitySkeleton } from "@/widgets/community/CommunitySkeleton"

export const dynamicConfig = 'force-dynamic'

// Cargamos el widget de forma dinámica usando TU skeleton
const CommunitySection = dynamic(
  () => import("@/widgets/community/CommunitySection").then(mod => mod.CommunitySection),
  { 
    ssr: false, 
    loading: () => <CommunitySkeleton /> // <--- ACÁ USAMOS TU SKELETON
  }
)

export default function ComunidadPage() {
  return <CommunitySection />
}