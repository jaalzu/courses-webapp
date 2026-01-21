// @/shared/lib/utils/avatar.ts

export function getAvatarColor(name: string) {
  const colors = [
    'bg-red-600',
    'bg-blue-600',
    'bg-green-600',
    'bg-yellow-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-orange-600',
  ]
  
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[index % colors.length]
}

export function getInitials(name: string) {
  return name.charAt(0).toUpperCase()
}