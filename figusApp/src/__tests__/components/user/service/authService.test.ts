import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAuthenticatedUser, logout } from '../../../../components/user/services/authService';
import type { LoggedUser } from '../../../../components/user/services/authService';

/**
 * Suite de pruebas unitarias para las funciones de autenticación de authService.
 * Verifica la obtención de perfiles de usuario y la finalización correcta
 * de las sesiones activas en el sistema.
 */
describe('authService', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  describe('getAuthenticatedUser', () => {
    /**
     * Garantiza la obtención y mapeo correcto del perfil del usuario
     * cuando las credenciales de sesión en las cookies son válidas.
     */
    it('should return LoggedUser data when the fetch is successful', async () => {
      const mockUser: LoggedUser = {
        id: 1,
        email: 'usuario@dominio.com',
        role: 'user',
        first_name: 'Lionel',
        last_name: 'Messi',
        profile_picture: 'uploads/messi.jpg',
        phone_number: '+5491112345678',
        date_of_birth: '1987-06-24',
        nationality: 'AR'
      };

      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => mockUser,
      };

      vi.mocked(fetch).mockResolvedValueOnce(mockResponse as unknown as Response);

      const result = await getAuthenticatedUser();

      expect(result).toEqual(mockUser);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/me'),
        expect.objectContaining({
          method: 'GET',
          credentials: 'include',
        })
      );
    });

    /**
     * Asegura el lanzamiento de una excepción controlada cuando el token
     * o la sesión expira en el servidor de backend.
     */
    it('should throw an explicit error message when the response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
      };

      vi.mocked(fetch).mockResolvedValueOnce(mockResponse as unknown as Response);

      await expect(getAuthenticatedUser()).rejects.toThrow(
        'No se pudo obtener el usuario autenticado'
      );
    });
  });

  describe('logout', () => {
    /**
     * Comprueba que la petición de cierre de sesión sea enviada mediante POST
     * y resuelva de forma limpia indicando la destrucción de la sesión.
     */
    it('should resolve successfully when logout response is ok', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
      };

      vi.mocked(fetch).mockResolvedValueOnce(mockResponse as unknown as Response);

      await expect(logout()).resolves.not.toThrow();
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/logout'),
        expect.objectContaining({
          method: 'POST',
          credentials: 'include',
        })
      );
    });

    /**
     * Valida que la función falle explícitamente si el servidor responde
     * con un código erróneo durante el proceso de cierre de sesión.
     */
    it('should throw an explicit error message when logout response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
      };

      vi.mocked(fetch).mockResolvedValueOnce(mockResponse as unknown as Response);

      await expect(logout()).rejects.toThrow('No se pudo cerrar sesión');
    });
  });
});