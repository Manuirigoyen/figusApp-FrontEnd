import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resolveImageUrl } from '../../../../components/user/utils/resolveImageUrl';

/**
 * Suite de pruebas unitarias para la función resolveImageUrl.
 * Evalúa el comportamiento de la resolución de URLs en base a diferentes formatos de entrada,
 * asegurando la correcta limpieza de diagonales y el manejo de fallbacks.
 */
describe('resolveImageUrl', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_API_BASE', 'http://localhost:8000/api/v1');
  });

  /**
   * Verifica que se retorne la ruta de la imagen por defecto del sistema
   * ante valores nulos, indefinidos o cadenas de texto vacías.
   */
  it('should return the default avatar path if no path is provided', () => {
    const defaultImage = '/assets/img/db/users/fotoPerfilDefault.png';

    expect(resolveImageUrl(null)).toBe(defaultImage);
    expect(resolveImageUrl(undefined)).toBe(defaultImage);
    expect(resolveImageUrl('')).toBe(defaultImage);
  });

  /**
   * Asegura que si la ruta proporcionada ya es una URL absoluta (comienza con http),
   * se retorne intacta sin sufrir modificaciones por parte de la función.
   */
  it('should return the path unchanged if it starts with http', () => {
    const absoluteUrlHttp = 'http://external-storage.com/avatar.jpg';
    const absoluteUrlHttps = 'https://external-storage.com/avatar.jpg';

    expect(resolveImageUrl(absoluteUrlHttp)).toBe(absoluteUrlHttp);
    expect(resolveImageUrl(absoluteUrlHttps)).toBe(absoluteUrlHttps);
  });

  /**
   * Comprueba que las rutas locales se concatenen de forma precisa a la URL base del servidor,
   * removiendo el sufijo /api/v1 y normalizando las barras diagonales redundantes.
   */
  it('should correctly build the absolute URL using VITE_API_BASE and stripping api subpath', () => {
    expect(resolveImageUrl('uploads/user1.png')).toBe('http://localhost:8000/uploads/user1.png');
    expect(resolveImageUrl('/uploads/user2.png')).toBe('http://localhost:8000/uploads/user2.png');
  });

  /**
   * Garantiza que la lógica de limpieza prevenga la duplicidad de barras intermedias
   * cuando la URL base configurada en el entorno finaliza con una diagonal explícita.
   */
  it('should prevent duplicate slashes if VITE_API_BASE ends with a slash', () => {
    vi.stubEnv('VITE_API_BASE', 'http://localhost:8000/api/v1/');
    
    expect(resolveImageUrl('/uploads/user3.png')).toBe('http://localhost:8000/uploads/user3.png');
  });

  /**
   * Evalúa el comportamiento de contingencia cuando la variable de entorno no se encuentra
   * definida, verificando que la URL se resuelva en base a una cadena de texto vacía.
   */
  it('should fallback to an empty string base if VITE_API_BASE is undefined', () => {
    vi.stubEnv('VITE_API_BASE', undefined);

    expect(resolveImageUrl('uploads/user4.png')).toBe('/uploads/user4.png');
  });
});