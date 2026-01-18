'use client'

import dynamic from 'next/dynamic'
import { CommunitySkeleton } from "@/widgets/community/CommunitySkeleton"

export const dynamicConfig = 'force-dynamic'

const CommunitySection = dynamic(
  () =>
    import("@/widgets/community/CommunitySection").then(
      mod => mod.default
    ),
  {
    ssr: false,
    loading: () => <CommunitySkeleton />
  }
)


export default function ComunidadPage() {
  return <CommunitySection />
}