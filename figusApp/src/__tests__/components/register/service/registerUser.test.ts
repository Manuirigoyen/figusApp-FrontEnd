import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser } from '../../../../components/register/services/RegisterUser';

/**
 * Suite de pruebas unitarias para la función registerUser.
 * Evalúa el comportamiento del cliente HTTP frente a respuestas exitosas,
 * errores controlados con mensajes del backend y fallos inesperados de red.
 */
describe('registerUser', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  /**
   * Verifica que la petición POST se realice correctamente hacia el endpoint configurado,
   * enviando el FormData de manera adecuada y resolviendo la promesa sin retornar datos.
   */
  it('should resolve successfully when the server returns an ok response', async () => {
    const mockResponse = {
      ok: true,
      status: 201,
    };
    
    vi.mocked(fetch).mockResolvedValueOnce(mockResponse as unknown as Response);

    const mockPayload = new FormData();
    mockPayload.append('first_name', 'Lionel');

    await expect(registerUser(mockPayload)).resolves.not.toThrow();
    
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/users'),
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        body: mockPayload,
      })
    );
  });

  /**
   * Comprueba que la función extraiga y lance el mensaje de error específico
   * devuelto por la estructura JSON del backend cuando el estado de la respuesta no es OK.
   */
  it('should throw an error with the message provided by the backend when response is not ok', async () => {
    const mockErrorBody = { message: 'El correo electrónico ya se encuentra registrado.' };
    const mockResponse = {
      ok: false,
      status: 400,
      json: async () => mockErrorBody,
    };

    vi.mocked(fetch).mockResolvedValueOnce(mockResponse as unknown as Response);

    const mockPayload = new FormData();

    await expect(registerUser(mockPayload)).rejects.toThrow(
      'El correo electrónico ya se encuentra registrado.'
    );
  });

  /**
   * Garantiza que la función capture excepciones en el parseo del JSON y devuelva
   * el mensaje genérico fallback ante fallos de comunicación o respuestas corruptas del servidor.
   */
  it('should throw a generic fallback error message when response is not ok and json parsing fails', async () => {
    const mockResponse = {
      ok: false,
      status: 500,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    };

    vi.mocked(fetch).mockResolvedValueOnce(mockResponse as unknown as Response);

    const mockPayload = new FormData();

    await expect(registerUser(mockPayload)).rejects.toThrow(
      'No fue posible crear la cuenta ahora mismo.'
    );
  });
});