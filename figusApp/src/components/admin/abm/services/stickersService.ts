export interface Sticker {
  id?: number;
  album_id: number;
  class: string;
  name: string;
  nationality: string;
  cover_image?: string;
}

export interface CreateStickerDto {
  album_id: number;
  class: string;
  name: string;
  nationality: string;
  cover_image?: File | null;
}

export interface UpdateStickerDto {
  album_id?: number;
  class?: string;
  name?: string;
  nationality?: string;
  cover_image?: File | null;
}

const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3000';

const STICKERS_URL =
  `${API_URL}/api/v1/stickers`;

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${API_URL}${path}`,
    {
      headers: {
        'Content-Type':
          'application/json',
        ...(init?.headers ?? {}),
      },
      ...init,
    },
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      errorText ||
        `Error ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

/**
 * Obtener todos los stickers
 */
export const getAllStickers = () => {
  return request<Sticker[]>(
    '/api/v1/stickers',
  );
};

/**
 * Obtener sticker por ID
 */
export const getStickerById = (
  id: number,
) => {
  if (!id || id < 1) {
    throw new Error(
      'El ID de la figurita debe ser mayor a 0',
    );
  }

  return request<Sticker>(
    `/api/v1/stickers/${id}`,
  );
};

/**
 * Listar stickers por album_id
 */
export const getStickersByAlbumId =
  async (
    albumId: number,
    limit: number,
  ) => {
    const stickers =
      await getAllStickers();

    const filtered = stickers.filter(
      (s) =>
        Number(s.album_id) ===
        albumId,
    );

    return filtered.slice(0, limit);
  };

/**
 * Crear figurita
 */
export const createSticker = async (
  stickerData: CreateStickerDto,
): Promise<Sticker> => {
  const formData = new FormData();

  formData.append(
    'album_id',
    String(stickerData.album_id),
  );

  formData.append(
    'class',
    stickerData.class,
  );

  formData.append(
    'name',
    stickerData.name,
  );

  formData.append(
    'nationality',
    stickerData.nationality,
  );

  if (stickerData.cover_image) {
    formData.append(
      'cover_image',
      stickerData.cover_image,
    );
  }

  const response = await fetch(
    STICKERS_URL,
    {
      method: 'POST',
      credentials: 'include',
      body: formData,
    },
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(
        'Datos inválidos',
      );
    }

    if (response.status === 401) {
      throw new Error(
        'No autorizado',
      );
    }

    throw new Error(
      'No se pudo crear la figurita',
    );
  }

  return response.json();
};

/**
 * Actualizar figurita
 */
export const updateSticker = async (
  id: number,
  stickerData: UpdateStickerDto,
): Promise<Sticker> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID de la figurita debe ser mayor a 0',
    );
  }

  const formData = new FormData();

  if (
    stickerData.album_id !== undefined
  ) {
    formData.append(
      'album_id',
      String(stickerData.album_id),
    );
  }

  if (stickerData.class) {
    formData.append(
      'class',
      stickerData.class,
    );
  }

  if (stickerData.name) {
    formData.append(
      'name',
      stickerData.name,
    );
  }

  if (stickerData.nationality) {
    formData.append(
      'nationality',
      stickerData.nationality,
    );
  }

  if (stickerData.cover_image) {
    formData.append(
      'cover_image',
      stickerData.cover_image,
    );
  }

  const response = await fetch(
    `${STICKERS_URL}/${id}`,
    {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    },
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(
        'Datos inválidos',
      );
    }

    if (response.status === 401) {
      throw new Error(
        'No autorizado',
      );
    }

    if (response.status === 404) {
      throw new Error(
        'Figurita no encontrada',
      );
    }

    throw new Error(
      'No se pudo actualizar la figurita',
    );
  }

  return response.json();
};

/**
 * Eliminar sticker
 */
export const deleteSticker = async (
  id: number,
): Promise<void> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID de la figurita debe ser mayor a 0',
    );
  }

  const response = await fetch(
    `${STICKERS_URL}/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type':
          'application/json',
      },
    },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        'No autorizado',
      );
    }

    if (response.status === 404) {
      throw new Error(
        'Figurita no encontrada',
      );
    }

    throw new Error(
      'No se pudo eliminar la figurita',
    );
  }
};