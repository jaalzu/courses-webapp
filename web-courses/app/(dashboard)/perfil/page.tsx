'use client'

import { PerfilPageWrapper } from "@/widgets/perfil/perfilPageWrapper"
import { useUserProfile } from "@/entities/profile/model/useUserProfile"

export default function PerfilPage() {
  const userStats = useUserProfile("Juan Pérez", "estudiante@ejemplo.com")

  return <PerfilPageWrapper {...userStats} />
}
