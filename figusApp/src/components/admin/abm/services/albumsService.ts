/**
 * Represents an album entity with sticker collection metadata
 */
export interface Album {
  id: number;
  name: string;
  class: string;
  nationality: string;
  description: string;
  capacity: number;
  cover_image?: string;
}

/**
 * Data transfer object for creating a new album
 */
export interface CreateAlbumDto {
  name: string;
  class: string;
  nationality: string;
  description?: string;
  capacity: number;
  cover_image?: File | null;
}

/**
 * Data transfer object for updating an existing album with partial fields
 */
export interface UpdateAlbumDto {
  name?: string;
  class?: string;
  nationality?: string;
  description?: string;
  capacity?: number;
  cover_image?: File | null;
}

const API_URL = 'http://localhost:3000/api/v1/albums';

/**
 * Fetches an album by its unique identifier
 * @param id - The album ID to retrieve (must be greater than 0)
 * @returns Promise resolving to the Album object
 * @throws Error if ID is invalid or album not found
 */
export const getAlbumById = async (
  id: number,
): Promise<Album> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID del álbum debe ser mayor a 0',
    );
  }

  const response = await fetch(
    `${API_URL}/${id}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Álbum no encontrado');
    }

    throw new Error(
      'No se pudo obtener el álbum',
    );
  }

  return response.json();
};

/**
 * Fetches all albums
 * @returns Promise resolving to an array of all Album objects
 * @throws Error if albums cannot be retrieved
 */
export const getAlbums = async (): Promise<
  Album[]
> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      'No se pudieron obtener los álbumes',
    );
  }

  return response.json();
};

/**
 * Creates a new album with provided metadata
 * @param albumData - The album data (name, class, nationality, description, capacity, optional cover image)
 * @returns Promise resolving to the created Album object with generated ID
 * @throws Error if data is invalid, unauthorized, or creation fails
 */
export const createAlbum = async (
  albumData: CreateAlbumDto,
): Promise<Album> => {
  const formData = new FormData();

  formData.append('name', albumData.name);
  formData.append('class', albumData.class);
  formData.append(
    'nationality',
    albumData.nationality,
  );
  formData.append(
    'description',
    albumData.description || '',
  );
  formData.append(
    'capacity',
    String(albumData.capacity),
  );

  if (albumData.cover_image) {
    formData.append(
      'cover_image',
      albumData.cover_image,
    );
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Datos inválidos');
    }

    if (response.status === 401) {
      throw new Error('No autorizado');
    }

    throw new Error(
      'No se pudo crear el álbum',
    );
  }

  return response.json();
};

/**
 * Updates an existing album with partial or complete data
 * @param id - The album ID to update (must be greater than 0)
 * @param albumData - The album data to update with (all fields optional)
 * @returns Promise resolving to the updated Album object
 * @throws Error if ID is invalid, data is invalid, unauthorized, or album not found
 */
export const updateAlbum = async (
  id: number,
  albumData: UpdateAlbumDto,
): Promise<Album> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID del álbum debe ser mayor a 0',
    );
  }

  const formData = new FormData();

  if (albumData.name) {
    formData.append('name', albumData.name);
  }

  if (albumData.class) {
    formData.append('class', albumData.class);
  }

  if (albumData.nationality) {
    formData.append(
      'nationality',
      albumData.nationality,
    );
  }

  if (albumData.description !== undefined) {
    formData.append(
      'description',
      albumData.description,
    );
  }

  if (albumData.capacity !== undefined) {
    formData.append(
      'capacity',
      String(albumData.capacity),
    );
  }

  if (albumData.cover_image) {
    formData.append(
      'cover_image',
      albumData.cover_image,
    );
  }

  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: 'PUT',
      credentials: 'include',
      body: formData,
    },
  );

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Datos inválidos');
    }

    if (response.status === 401) {
      throw new Error('No autorizado');
    }

    if (response.status === 404) {
      throw new Error('Álbum no encontrado');
    }

    throw new Error(
      'No se pudo actualizar el álbum',
    );
  }

  return response.json();
};

/**
 * Deletes an album by its ID
 * @param id - The album ID to delete (must be greater than 0)
 * @returns Promise that resolves when deletion is complete
 * @throws Error if ID is invalid, unauthorized, or album not found
 */
export const deleteAlbum = async (
  id: number,
): Promise<void> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID del álbum debe ser mayor a 0',
    );
  }

  const response = await fetch(
    `${API_URL}/${id}`,
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
      throw new Error('No autorizado');
    }

    if (response.status === 404) {
      throw new Error(
        'Álbum no encontrado',
      );
    }

    throw new Error(
      'No se pudo eliminar el álbum',
    );
  }
};