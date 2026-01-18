export function formatTimeAgo(date: Date | string): string {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) return 'hace un momento'
  if (diffInSeconds < 3600) {
    const mins = Math.floor(diffInSeconds / 60)
    return `hace ${mins} ${mins === 1 ? 'minuto' : 'minutos'}`
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400)
    return `hace ${days} ${days === 1 ? 'día' : 'días'}`
  }
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800)
    return `hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`
  }
  
  // Más de un mes: mostrar fecha
  return past.toLocaleDateString('es-AR', { 
    day: 'numeric', 
    month: 'short' 
  })
}