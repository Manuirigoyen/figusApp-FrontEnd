/**
 * Represents a pack (envelope) entity containing stickers from an album
 */
export interface Pack {
  id?: number;
  album_id: number;
  class: string;
  price: number;
  stock: number;
  capacity: number;
  cover_image?: string | null;
}

/**
 * Data transfer object for creating a new pack
 */
export interface CreatePackDto {
  album_id: number;
  class: string;
  price: number;
  stock: number;
  capacity: number;
  cover_image?: File;
}

/**
 * Data transfer object for updating an existing pack with partial fields
 */
export interface UpdatePackDto {
  album_id?: number;
  class?: string;
  price?: number;
  stock?: number;
  capacity?: number;
  cover_image?: File;
}

const API_URL =
  import.meta.env.VITE_API_URL ??
  'http://localhost:3000';

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
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      ...init,
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      errorText || `Error ${response.status}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

/**
 * Fetches all packs from the database
 * @returns Promise resolving to an array of all Pack objects
 * @throws Error if packs cannot be retrieved
 */
export const getAllPacks = () => {
  return request<Pack[]>('/api/v1/packs');
};

/**
 * Fetches a pack by its unique identifier
 * @param id - The pack ID to retrieve
 * @returns Promise resolving to the Pack object
 * @throws Error if pack not found or request fails
 */
export const getPackById = (id: number) => {
  return request<Pack>(
    `/api/v1/packs/${id}`,
  );
};

/**
 * Fetches packs filtered by album ID with optional limit
 * @param albumId - The album ID to filter packs by
 * @param limit - Maximum number of packs to return
 * @returns Promise resolving to an array of Pack objects matching the criteria
 * @throws Error if packs cannot be retrieved
 */
export const getPacksByAlbumId = async (
  albumId: number,
  limit: number,
) => {
  const packs = await getAllPacks();

  const filtered = packs.filter(
    (pack) =>
      Number(pack.album_id) === albumId,
  );

  return filtered.slice(0, limit);
};

/**
 * Creates a new pack with provided data
 * @param data - The pack data (album_id, class, price, stock, capacity, optional cover image)
 * @returns Promise resolving to the created Pack object with generated ID
 * @throws Error if data is invalid, unauthorized, or creation fails
 */
export const createPack = async (
  data: CreatePackDto,
): Promise<Pack> => {
  const formData = new FormData();

  formData.append(
    'album_id',
    String(data.album_id),
  );

  formData.append('class', data.class);

  formData.append(
    'price',
    String(data.price),
  );

  formData.append(
    'stock',
    String(data.stock),
  );

  formData.append(
    'capacity',
    String(data.capacity),
  );

  if (data.cover_image) {
    formData.append(
      'cover_image',
      data.cover_image,
    );
  }

  const response = await fetch(
    `${API_URL}/api/v1/packs`,
    {
      method: 'POST',
      credentials: 'include',
      body: formData,
    },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado');
    }

    if (response.status === 400) {
      throw new Error(
        'Datos inválidos para crear el sobre',
      );
    }

    throw new Error(
      'No se pudo crear el sobre',
    );
  }

  return response.json();
};

/**
 * Updates an existing pack with partial or complete data
 * @param id - The pack ID to update (must be greater than 0)
 * @param data - The pack data to update with (all fields optional)
 * @returns Promise resolving to the updated Pack object
 * @throws Error if ID is invalid, data is invalid, unauthorized, or pack not found
 */
export const updatePack = async (
  id: number,
  data: UpdatePackDto,
): Promise<Pack> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID del sobre debe ser mayor a 0',
    );
  }

  const formData = new FormData();

  if (data.album_id !== undefined) {
    formData.append(
      'album_id',
      String(data.album_id),
    );
  }

  if (data.class !== undefined) {
    formData.append('class', data.class);
  }

  if (data.price !== undefined) {
    formData.append(
      'price',
      String(data.price),
    );
  }

  if (data.stock !== undefined) {
    formData.append(
      'stock',
      String(data.stock),
    );
  }

  if (data.capacity !== undefined) {
    formData.append(
      'capacity',
      String(data.capacity),
    );
  }

  if (data.cover_image) {
    formData.append(
      'cover_image',
      data.cover_image,
    );
  }

  const response = await fetch(
    `${API_URL}/api/v1/packs/${id}`,
    {
      method: 'PATCH',
      credentials: 'include',
      body: formData,
    },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado');
    }

    if (response.status === 404) {
      throw new Error('Sobre no encontrado');
    }

    if (response.status === 400) {
      throw new Error(
        'Datos inválidos para modificar el sobre',
      );
    }

    throw new Error(
      'No se pudo modificar el sobre',
    );
  }

  return response.json();
};

/**
 * Deletes a pack by its ID
 * @param id - The pack ID to delete (must be greater than 0)
 * @returns Promise that resolves when deletion is complete
 * @throws Error if ID is invalid, unauthorized, or pack not found
 */
export const deletePack = async (
  id: number,
): Promise<void> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID del sobre debe ser mayor a 0',
    );
  }

  const response = await fetch(
    `${API_URL}/api/v1/packs/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado');
    }

    if (response.status === 404) {
      throw new Error('Sobre no encontrado');
    }

    throw new Error(
      'No se pudo eliminar el sobre',
    );
  }
};