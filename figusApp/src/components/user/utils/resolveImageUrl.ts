const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export const resolveImageUrl = (
  path?: string | null,
): string => {
  const defaultImage = new URL(
    "../../../assets/img/icons/user/fotoPerfilDefault.png",
    import.meta.url
  ).href;

  if (!path) {
    return defaultImage;
  }

  if (path.startsWith("http")) {
    return path;
  }

  const baseUrl = API_BASE.replace("/api/v1", "");
  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = path.replace(/^\//, "");

  return `${cleanBase}/${cleanPath}`;
};