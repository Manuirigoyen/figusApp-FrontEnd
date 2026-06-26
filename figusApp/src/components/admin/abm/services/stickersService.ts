/**
 * Represents a sticker entity from an album collection
 */
export interface Sticker {
  id?: number;
  album_id: number;
  class: string;
  name: string;
  nationality: string;
  cover_image?: string;
}

/**
 * Data transfer object for creating a new sticker
 */
export interface CreateStickerDto {
  album_id: number;
  class: string;
  name: string;
  nationality: string;
  cover_image?: File | null;
}

/**
 * Data transfer object for updating an existing sticker with partial fields
 */
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

/**
 * Generic helper function to perform HTTP requests with JSON content type
 * @param path - The API endpoint path (without base URL)
 * @param init - Optional fetch RequestInit configuration (headers, method, body, etc.)
 * @returns Promise resolving to the response data of type T
 * @throws Error if the response is not ok or request fails
 */
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
 * Fetches all stickers from the database
 * @returns Promise resolving to an array of all Sticker objects
 * @throws Error if stickers cannot be retrieved
 */
export const getAllStickers = () => {
  return request<Sticker[]>(
    '/api/v1/stickers',
  );
};

/**
 * Fetches a sticker by its unique identifier
 * @param id - The sticker ID to retrieve (must be greater than 0)
 * @returns Promise resolving to the Sticker object
 * @throws Error if ID is invalid or sticker not found
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
 * Fetches stickers filtered by album ID with optional limit
 * @param albumId - The album ID to filter stickers by
 * @param limit - Maximum number of stickers to return
 * @returns Promise resolving to an array of Sticker objects matching the criteria
 * @throws Error if stickers cannot be retrieved
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
 * Creates a new sticker with provided metadata
 * @param stickerData - The sticker data (album_id, class, name, nationality, optional cover image)
 * @returns Promise resolving to the created Sticker object with generated ID
 * @throws Error if data is invalid, unauthorized, or creation fails
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
 * Updates an existing sticker with partial or complete data
 * @param id - The sticker ID to update (must be greater than 0)
 * @param stickerData - The sticker data to update with (all fields optional)
 * @returns Promise resolving to the updated Sticker object
 * @throws Error if ID is invalid, data is invalid, unauthorized, or sticker not found
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
 * Deletes a sticker by its ID
 * @param id - The sticker ID to delete (must be greater than 0)
 * @returns Promise that resolves when deletion is complete
 * @throws Error if ID is invalid, unauthorized, or sticker not found
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