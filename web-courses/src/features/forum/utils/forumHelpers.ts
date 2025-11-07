export const formatDate = (date: Date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Justo ahora';
  if (minutes < 60) return `Hace ${minutes}m`;
  if (hours < 24) return `Hace ${hours}h`;
  if (days < 7) return `Hace ${days}d`;
  return d.toLocaleDateString('es-ES');
};

export const handleSharePost = (post: any) => {
  if (navigator.share) {
    navigator.share({
      title: `Publicación de ${post.userName}`,
      text: post.content,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(`${post.content}\n\n- ${post.userName}`);
    alert('Publicación copiada al portapapeles');
  }
};

export const handleShareComment = (comment: any, post: any) => {
  if (navigator.share) {
    navigator.share({
      title: `Respuesta de ${comment.userName}`,
      text: `${comment.content}\n\nEn respuesta a: ${post.content.substring(0, 100)}...`,
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(
      `"${comment.content}"\n\n- ${comment.userName}\n\nEn respuesta a: ${post.content.substring(0, 100)}...`
    );
    alert('Respuesta copiada al portapapeles');
  }
};