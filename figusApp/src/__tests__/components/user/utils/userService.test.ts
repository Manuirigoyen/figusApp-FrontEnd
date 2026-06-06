import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getCurrentUser,
  updateUser,
  updateUserField,
  deleteUser,
  updateUserProfilePicture,
} from '../../../../components/user/services/userService'; 
import type { UserConfig } from '../../../../components/user/config/types/UserConfig';
import type { UpdateUserPayload } from '../../../../components/user/config/interfaces/UpdateUserPayload';

// Mock de la variable de entorno de Vite
vi.stubEnv('VITE_API_BASE', 'http://api.test');

describe('UserService Tests', () => {
  // Guardamos una referencia al fetch original para restaurarlo después
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    // Creamos una función espía (mock) para fetch antes de cada test
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    // Restauramos el fetch original y limpiamos los mocks
    globalThis.fetch = originalFetch;
    vi.clearAllMocks();
  });

  // Helper para simular una respuesta exitosa de fetch
  const mockFetchSuccess = (data: any, status = 200) => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      status,
      json: async () => data,
    });
  };

  // Helper para simular una respuesta de error de fetch
  const mockFetchError = (errorMessage: string, status = 400) => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: false,
      status,
      json: async () => ({ message: errorMessage }),
    });
  };

  describe('getCurrentUser', () => {
    it('debería obtener los datos del usuario autenticado correctamente', async () => {
      const mockUser: UserConfig = { id: 1, name: 'John Doe', email: 'john@test.com' } as any;
      mockFetchSuccess(mockUser);

      const result = await getCurrentUser();

      expect(globalThis.fetch).toHaveBeenCalledWith('http://api.test/auth/me', {
        method: 'GET',
        credentials: 'include',
      });
      expect(result).toEqual(mockUser);
    });

    it('debería lanzar un error con el mensaje del servidor si la respuesta no es OK', async () => {
      mockFetchError('No autorizado', 401);

      await expect(getCurrentUser()).rejects.toThrow('No autorizado');
    });

    it('debería lanzar un error genérico si el servidor falla y no devuelve JSON válido', async () => {
      // Forzamos que json() falle al parsear para probar el catch interno de parseJson
      (globalThis.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => { throw new Error('Bad JSON'); },
      });

      // Espiamos el console.error para que no ensucie la consola de los tests
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(getCurrentUser()).rejects.toThrow('Ocurrió un error inesperado');
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('updateUser', () => {
    it('debería enviar un PUT con el payload correcto y retornar el usuario actualizado', async () => {
      const mockUser: UserConfig = { id: 1, name: 'Jane Doe' } as any;
      const payload: UpdateUserPayload = { first_name: 'Jane Doe' };
      mockFetchSuccess(mockUser);

      const result = await updateUser(1, payload);

      expect(globalThis.fetch).toHaveBeenCalledWith('http://api.test/users/1', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUserField', () => {
    it('debería llamar a updateUser enviando únicamente el campo modificado', async () => {
      const mockUser: UserConfig = { id: 1, email: 'new@test.com' } as any;
      mockFetchSuccess(mockUser);

      const result = await updateUserField(1, 'email', 'new@test.com');

      expect(globalThis.fetch).toHaveBeenCalledWith('http://api.test/users/1', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'new@test.com' }),
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('deleteUser', () => {
    it('debería enviar un DELETE y resolver undefined si el status es 204 (No Content)', async () => {
      // Simula respuesta 204 sin cuerpo
      (globalThis.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      const result = await deleteUser(1);

      expect(globalThis.fetch).toHaveBeenCalledWith('http://api.test/users/1', {
        method: 'DELETE',
        credentials: 'include',
      });
      expect(result).toBeUndefined();
    });
  });

  describe('updateUserProfilePicture', () => {
    it('debería enviar un POST con FormData conteniendo el archivo', async () => {
      const mockUser: UserConfig = { id: 1, profile_picture: 'url_imagen' } as any;
      const dummyFile = new File([''], 'avatar.png', { type: 'image/png' });
      mockFetchSuccess(mockUser);

      const result = await updateUserProfilePicture(1, dummyFile);

      expect(globalThis.fetch).toHaveBeenCalledWith('http://api.test/users/1/profile-picture', {
        method: 'POST',
        credentials: 'include',
        body: expect.any(FormData),
      });

      const callArgs = (globalThis.fetch as any).mock.calls[0][1];
      const sentFormData = callArgs.body as FormData;
      expect(sentFormData.get('profile_picture')).toEqual(dummyFile);
      
      expect(result).toEqual(mockUser);
    });
  });
});