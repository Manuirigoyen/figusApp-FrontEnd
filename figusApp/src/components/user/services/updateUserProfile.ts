import type { UserProfile } from '../interfaces/UserProfile';

export const updateUserProfile = async (
  field: string,
  value: string | File,
): Promise<UserProfile> => {
  // Si es un archivo, usar endpoint de foto con FormData
  if (value instanceof File) {
    const body = new FormData();
    body.append('profile_picture', value); // <- Este nombre tiene que matchear FileInterceptor

    const response = await fetch('http://localhost:3000/api/v1/users/me/profile-picture', {
      method: 'PUT',
      credentials: 'include', // <- CRÍTICO: manda la cookie JWT
      body, // <- NO pongas Content-Type, el browser lo setea con boundary
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
      throw new Error(error.message || 'Error al actualizar la foto');
    }

    return response.json();
  }

  // Si es texto, usar JSON normal
  const response = await fetch('http://localhost:3000/api/v1/users/me', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ [field]: value }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(error.message || 'Error al actualizar');
  }

  return response.json();
};