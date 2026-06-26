/**
 * Utilidad para resolver la URL de imágenes de usuario.
 *
 * Permite manejar imágenes locales, URLs completas y rutas
 * provenientes del backend generando una dirección accesible.
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

/**
 * Obtiene la URL final de una imagen de usuario.
 *
 * @param path Ruta de la imagen almacenada.
 * @returns URL completa de la imagen o imagen por defecto.
 */
export const resolveImageUrl = (
  path?: string | null,
): string => {
  /**
   * Imagen utilizada cuando el usuario no posee una foto configurada.
   */
  const defaultImage = new URL(
    "../../../assets/img/icons/user/fotoPerfilDefault.png",
    import.meta.url
  ).href;

  if (!path) {
    return defaultImage;
  }

  /**
   * Si la ruta ya es una URL absoluta se utiliza directamente.
   */
  if (path.startsWith("http")) {
    return path;
  }

  const baseUrl = API_BASE.replace("/api/v1", "");
  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");

  return `${cleanBase}/${cleanPath}`;
};