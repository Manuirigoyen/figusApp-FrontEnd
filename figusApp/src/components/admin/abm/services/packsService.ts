export interface Pack {
  id?: number;
  album_id: number;
  class: string;
  price: number;
  stock: number;
  capacity: number;
  cover_image?: string | null;
}

export interface CreatePackDto {
  album_id: number;
  class: string;
  price: number;
  stock: number;
  capacity: number;
  cover_image?: File;
}

export interface UpdatePackDto {
  album_id?: number;
  class?: string;
  price?: number;
  stock?: number;
  capacity?: number;
  cover_image?: File;
}

const API_URL = import.meta.env.VITE_API_BASE;

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${API_URL}${path}`,
    {
      credentials: 'include',
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

export const getAllPacks = () => {
  return request<Pack[]>('/packs');
};

export const getPackById = (id: number) => {
  return request<Pack>(
    `/packs/${id}`,
  );
};

export const getPacksByAlbumId = async (
  albumId: number,
  limit: number,
) => {
  const packs = await getAllPacks();
  const filtered = packs.filter(
    (pack) => Number(pack.album_id) === albumId,
  );
  return filtered.slice(0, limit);
};

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
    `${API_URL}/packs`,
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
    `${API_URL}/packs/${id}`,
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

export const deletePack = async (
  id: number,
): Promise<void> => {
  if (!id || id < 1) {
    throw new Error(
      'El ID del sobre debe ser mayor a 0',
    );
  }

  const response = await fetch(
    `${API_URL}/packs/${id}`,
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