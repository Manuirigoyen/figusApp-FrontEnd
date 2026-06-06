import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendContactForm } from '../../../../components/home/services/sendContactForm'; 
import type { FooterContactPayload } from '../../../../components/home/utils/buildContactPayload';

describe('sendContactForm', () => {
  const mockEndpoint = 'https://api.figusapp.com/v1/contact';
  const mockPayload: FooterContactPayload = {
    contact_reason: 'soporte',
    contact_email: 'test@correo.com',
    contact_message: 'Necesito ayuda con mis figuritas.',
    captcha_token: 'token123',
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('debería enviar los datos correctamente y retornar el JSON de respuesta', async () => {
    const mockResponseBody = { success: true, message: 'Recibido' };
    
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      text: vi.fn().mockResolvedValue(JSON.stringify(mockResponseBody)),
    });
    
    vi.stubGlobal('fetch', mockFetch);

    const result = await sendContactForm(mockPayload, mockEndpoint);

    expect(mockFetch).toHaveBeenCalledWith(mockEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockPayload),
    });
    
    expect(result).toEqual(mockResponseBody);
  });

  it('debería retornar null si el servidor responde con éxito pero sin cuerpo de texto', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      text: vi.fn().mockResolvedValue(''),
    });
    
    vi.stubGlobal('fetch', mockFetch);

    const result = await sendContactForm(mockPayload, mockEndpoint);

    expect(result).toBeNull();
  });

  it('debería lanzar un error con el mensaje del servidor si response.ok es falso', async () => {
    const errorMessageFromServer = 'El token de CAPTCHA es inválido.';
    
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      text: vi.fn().mockResolvedValue(errorMessageFromServer),
    });
    
    vi.stubGlobal('fetch', mockFetch);

    await expect(sendContactForm(mockPayload, mockEndpoint)).rejects.toThrowError('...');
  });

  it('debería lanzar un error genérico si response.ok es falso y el servidor no da detalles', async () => {
    
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      text: vi.fn().mockResolvedValue(''),
    });
    
    vi.stubGlobal('fetch', mockFetch);

   await expect(sendContactForm(mockPayload, mockEndpoint)).rejects.toThrowError('...');
  });
});