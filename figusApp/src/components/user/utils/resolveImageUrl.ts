const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * Resuelve URLs de imágenes locales/remotas.
 */
export const resolveImageUrl = (
  path?: string | null,
): string => {
  if (!path) {
    return '/assets/img/db/users/fotoPerfilDefault.png';
  }

  if (path.startsWith('http')) {
    return path;
  }

  const baseUrl = API_BASE.replace(
    '/api/v1',
    '',
  );

  return `${baseUrl}/${
    path.startsWith('/')
      ? path.slice(1)
      : path
  }`;
};