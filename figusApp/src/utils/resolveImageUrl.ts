/**
 * Utilidad para resolver URLs de imágenes.
 *
 * Convierte rutas relativas en URLs completas usando la URL base del backend
 * y devuelve imágenes por defecto según el tipo de recurso.
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

/**
 * Genera la URL final de una imagen.
 *
 * @param path Ruta de la imagen almacenada.
 * @param type Tipo de imagen a resolver (usuario o tienda).
 * @returns URL completa de la imagen.
 */
export const resolveImageUrl = (
  path?: string | null,
  type: "user" | "store" = "user"
): string => {
  const defaultImage =
    type === "user"
      ? "/assets/img/db/users/fotoPerfilDefault.png"
      : "/assets/img/default-product.png";

  if (!path) return defaultImage;
  if (path.startsWith("http")) return path;

  const baseUrl = API_BASE.replace("/api/v1", "").replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");

  return `${baseUrl}/${cleanPath}`;
};