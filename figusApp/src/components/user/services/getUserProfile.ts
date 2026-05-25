import type { UserProfile } from '../interfaces/UserProfile';

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await fetch('http://localhost:3000/api/v1/users/me', {
    method: 'GET',
    credentials: 'include', // <- Manda la cookie HttpOnly automáticamente
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Sesión expirada. Iniciá sesión de nuevo.');
    }
    throw new Error('No se pudo obtener el perfil');
  }

  return response.json();
};
