const API_BASE = import.meta.env.VITE_API_BASE;

export const getAllAlbums = async () => {
  const response = await fetch(`${API_BASE}/albums`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('No se pudieron cargar los álbumes');
  }

  return response.json();
};

export const getAlbumProgress = async (albumId: number, userId: number) => {
  const response = await fetch(
    `${API_BASE}/albums/${albumId}/progress/user/${userId}`,
    {
      credentials: 'include',
    },
  );

  if (!response.ok) {
    throw new Error('No se pudo cargar el álbum');
  }

  return response.json();
};