export interface Album {
  id: number;
  name: string;
  class: string;
  nationality: string;
  description: string;
  capacity: number;
  cover_image?: string;
}

export interface CreateAlbumDto {
  name: string;
  class: string;
  nationality: string;
  description?: string;
  capacity: number;
  cover_image?: File | null;
}

export interface UpdateAlbumDto {
  name?: string;
  class?: string;
  nationality?: string;
  description?: string;
  capacity?: number;
  cover_image?: File | null;
}

const BASE_URL = import.meta.env.VITE_API_BASE;
const API_URL = `${BASE_URL}/albums`;

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
    {
      credentials: 'include',
    }
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

export const getAlbums = async (): Promise<
  Album[]
> => {
  const response = await fetch(API_URL, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(
      'No se pudieron obtener los álbumes',
    );
  }

  return response.json();
};

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