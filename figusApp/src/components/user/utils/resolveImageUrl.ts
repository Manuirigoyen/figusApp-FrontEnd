const API_BASE = import.meta.env.VITE_API_BASE ?? '';

/**
 * Resuelve URLs de imágenes locales/remotas.
 */
export const resolveImageUrl = (
  path?: string | null,
): string => {
  const defaultImage = '/assets/img/db/users/fotoPerfilDefault.png';

  if (!path) {
    return defaultImage;
  }

  if (path.startsWith('http')) {
    return path;
  }

  const baseUrl = API_BASE.replace('/api/v1', '');

  const cleanBase = baseUrl.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');

  return `${cleanBase}/${cleanPath}`;
};