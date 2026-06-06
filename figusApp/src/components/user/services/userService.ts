import type { UpdateUserPayload } from '../config/interfaces/UpdateUserPayload';
import type { UserConfig } from '../config/types/UserConfig';

const API_BASE = import.meta.env.VITE_API_BASE;

/**
 * Parsea la respuesta HTTP y lanza un error si el servidor no respondió OK.
 */
const parseJson = async <T>(
  response: Response,
): Promise<T> => {
  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    let message =
      'Ocurrió un error inesperado';

    try {
      const errorBody =
        (await response.json()) as {
          message?: string;
        };

      message =
        errorBody.message ?? message;
    } catch (parseError) {
      console.error(
        'No se pudo leer el cuerpo de error de la respuesta:',
        parseError,
      );
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
};

/** 
 * Obtiene los datos del usuario autenticado.
 */
export const getCurrentUser =
  async (): Promise<UserConfig> => {
    const response = await fetch(
      `${API_BASE}/auth/me`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );

    return parseJson<UserConfig>(
      response,
    );
  };

/**
 * Actualiza datos del usuario.
 */
export const updateUser = async (
  id: number,
  payload: UpdateUserPayload,
): Promise<UserConfig> => {
  const response = await fetch(
    `${API_BASE}/users/${id}`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type':
          'application/json',
      },
      body: JSON.stringify(payload),
    },
  );

  return parseJson<UserConfig>(
    response,
  );
};

/**
 * Actualiza un campo individual del usuario.
 */
export const updateUserField = async <
  K extends keyof UpdateUserPayload,
>(
  id: number,
  field: K,
  value: UpdateUserPayload[K],
): Promise<UserConfig> => {
  return updateUser(id, {
    [field]: value,
  } as UpdateUserPayload);
};

/**
 * Elimina la cuenta del usuario.
 */
export const deleteUser = async (
  id: number,
): Promise<void> => {
  const response = await fetch(
    `${API_BASE}/users/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );

  await parseJson<void>(response);
};

/**
 * Actualiza la foto de perfil del usuario.
 */
export const updateUserProfilePicture =
  async (
    id: number,
    file: File,
  ): Promise<UserConfig> => {
    const formData =
      new FormData();

    formData.append(
      'profile_picture',
      file,
    );

    const response = await fetch(
      `${API_BASE}/users/${id}/profile-picture`,
      {
        method: 'POST',
        credentials: 'include',
        body: formData,
      },
    );

    return parseJson<UserConfig>(
      response,
    );
  };