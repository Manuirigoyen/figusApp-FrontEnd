const API_BASE = import.meta.env.VITE_API_BASE ?? '';

export const resolveImageUrl = (path?: string | null, type: 'user' | 'store' = 'user'): string => {
  const defaultImage = type === 'user' 
    ? '/assets/img/db/users/fotoPerfilDefault.png' 
    : '/assets/img/default-product.png';

  if (!path) return defaultImage;
  if (path.startsWith('http')) return path;

  const baseUrl = API_BASE.replace('/api/v1', '').replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');

  return `${baseUrl}/${cleanPath}`;
};