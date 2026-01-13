import { ForumPost, ForumComment } from '@/entities/forum-post'

interface SharePayload {
  title: string
  text: string
}

/**
 * Share genérico con fallback a clipboard
 */
const share = async ({ title, text }: SharePayload) => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url: window.location.href
      })
    } catch {
      // usuario canceló → no hacemos nada
    }
  } else {
    await navigator.clipboard.writeText(text)
    alert('Contenido copiado al portapapeles')
  }
}


export const handleSharePost = (post: ForumPost) => {
  return share({
    title: `Publicación de ${post.userName}`,
    text: post.content
  })
}


export const handleShareComment = (
  comment: ForumComment,
  post: ForumPost
) => {
  return share({
    title: `Respuesta de ${comment.userName}`,
    text: `"${comment.content}"\n\nEn respuesta a:\n${post.content.slice(0, 100)}…`
  })
}
