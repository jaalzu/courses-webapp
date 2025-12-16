// forumHelpers.ts

/**
 * Formatea una fecha en formato relativo:
 * - "Justo ahora"
 * - "Hace 5m"
 * - "Hace 3h"
 * - "Hace 2d"
 * - o fecha corta
 */
export const formatDate = (date: Date | string) => {
  const d = new Date(date)
  const now = new Date()

  const diff = now.getTime() - d.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Justo ahora'
  if (minutes < 60) return `Hace ${minutes}m`
  if (hours < 24) return `Hace ${hours}h`
  if (days < 7) return `Hace ${days}d`

  return d.toLocaleDateString('es-ES')
}
