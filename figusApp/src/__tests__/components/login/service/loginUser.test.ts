import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginUser } from '../../../../components/login/services/LoginUser';
import type { LoginPayload } from '../../../../components/login/interfaces/LoginPayload';
import type { LoginResponse } from '../../../../components/login/interfaces/LoginResponse';

/**
 * Suite de pruebas unitarias para la función loginUser.
 * Valida el comportamiento de la autenticación frente a respuestas válidas,
 * denegaciones controladas y fallos de infraestructura del servidor.
 */
describe('loginUser', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  /**
   * Asegura que las credenciales válidas devuelvan el objeto de respuesta esperado
   * y que los encabezados HTTP estén configurados como JSON de forma estricta.
   */
 it('should return LoginResponse when the credentials are valid', async () => {
    const mockResponseBody: LoginResponse = {
      user: { id: 1, email: 'usuario@dominio.com', role: 'user' },
      access_token: 'jwt-mock-token',
    };

    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => mockResponseBody,
    };

    vi.mocked(fetch).mockResolvedValueOnce(mockResponse as unknown as Response);

    const payload: LoginPayload = {
      email: 'usuario@dominio.com',
      password: 'password123',
      captcha_token: 'captcha-token',
    };

    const result = await loginUser(payload);

    expect(result).toEqual(mockResponseBody);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/login'),
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    );
  });

  /**
   * Comprueba que la función capture el mensaje de error provisto desde el backend
   * para notificar de forma explícita fallos de autenticación comunes (por ejemplo, clave incorrecta).
   */
  it('should throw an error with the backend message when credentials are invalid', async () => {
    const mockErrorBody = { message: 'Credenciales inválidas.' };
    const mockResponse = {
      ok: false,
      status: 401,
      json: async () => mockErrorBody,
    };

    vi.mocked(fetch).mockResolvedValueOnce(mockResponse as unknown as Response);

    const payload: LoginPayload = {
      email: 'error@dominio.com',
      password: 'wrong-password',
      captcha_token: 'captcha-token',
    };

    await expect(loginUser(payload)).rejects.toThrow('Credenciales inválidas.');
  });

  /**
   * Garantiza que ante un fallo crítico donde el cuerpo de la respuesta no sea JSON legible,
   * el flujo de ejecución no se interrumpa abruptamente y devuelva el mensaje genérico de contingencia.
   */
  it('should throw the generic fallback error message when server responds with an error and json is invalid', async () => {
    const mockResponse = {
      ok: false,
      status: 502,
      json: async () => {
        throw new Error('Bad Gateway HTML/Plain Text');
      },
    };

    vi.mocked(fetch).mockResolvedValueOnce(mockResponse as unknown as Response);

    const payload: LoginPayload = {
      email: 'caido@dominio.com',
      password: 'password123',
      captcha_token: 'captcha-token',
    };

    await expect(loginUser(payload)).rejects.toThrow(
      'No fue posible iniciar sesión ahora mismo.'
    );
  });
});