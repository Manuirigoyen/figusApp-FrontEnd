import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserSpinsWallet } from '../../../../components/rulet/service/walletService';

describe('walletService - getUserSpinsWallet', () => {
  const mockUserId = 7;
  const mockWallet = {
    id: 1,
    user_id: 7,
    spins: 10,
    last_spin: '2023-12-01T00:00:00Z',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Utilidad para simular una respuesta de fetch exitosa (OK 200)
  const mockFetchResponseSuccess = (data: unknown) => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: vi.fn().mockResolvedValue(data),
    } as unknown as Response);
    
    vi.stubGlobal('fetch', mockFetch);
    return mockFetch;
  };

  // Utilidad para simular una respuesta de fetch con error (ej: 401, 500)
  const mockFetchResponseError = (status = 401) => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status,
    } as unknown as Response);
    
    vi.stubGlobal('fetch', mockFetch);
  };

  it('debería hacer la petición con los parámetros correctos de cookies y headers', async () => {
    const fetchSpy = mockFetchResponseSuccess(mockWallet);

    await getUserSpinsWallet(mockUserId);

    // Validamos que se llamó al endpoint correcto con credentials e headers
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining('/spins-wallet'),
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  });

  it('debería devolver la wallet directamente si el backend responde con un objeto único', async () => {
    mockFetchResponseSuccess(mockWallet);

    const result = await getUserSpinsWallet(mockUserId);

    expect(result).toEqual(mockWallet);
  });

  it('debería buscar y devolver la wallet del usuario si el backend responde con un Array de todas las wallets', async () => {
    const mockWalletList = [
      { id: 1, user_id: 3, spins: 5, last_spin: '' },
      mockWallet, // El de nuestro user_id (7)
      { id: 3, user_id: 12, spins: 20, last_spin: '' },
    ];
    
    mockFetchResponseSuccess(mockWalletList);

    const result = await getUserSpinsWallet(mockUserId);

    // Debe filtrar el array y quedarse únicamente con el del usuario 7
    expect(result).toEqual(mockWallet);
  });

  it('debería devolver null si el backend devuelve un Array pero ninguna wallet coincide con el userId', async () => {
    const mockWalletList = [
      { id: 1, user_id: 3, spins: 5, last_spin: '' },
    ];
    
    mockFetchResponseSuccess(mockWalletList);

    const result = await getUserSpinsWallet(mockUserId);

    expect(result).toBeNull();
  });

  it('debería lanzar un error con el mensaje correspondiente si la respuesta no es OK', async () => {
    mockFetchResponseError(500);

    // Al lanzar un error asíncrono, verificamos que la promesa sea rechazada
    await expect(getUserSpinsWallet(mockUserId)).rejects.toThrow(
      'No se pudo obtener la billetera de giros'
    );
  });
});