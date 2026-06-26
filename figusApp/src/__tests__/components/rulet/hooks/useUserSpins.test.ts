import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserSpins } from '../../../../components/rulet/hooks/useUserSpins';
import { getUserSpinsWallet } from '../../../../components/rulet/service/walletService';

// 1. Mockear el servicio que hace el fetch con la cookie
vi.mock('../../../../components/rulet/service/walletService', () => ({
  getUserSpinsWallet: vi.fn(),
}));

describe('useUserSpins', () => {
  const mockUserId = 42;
  const mockWallet = {
  id: 1,
  user_id: 1,
  spins: 3,
  stock: 3,
  last_spin: '...',
};

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería inicializarse con 0 giros y loading en false', () => {
    const { result } = renderHook(() => useUserSpins());

    expect(result.current.spins).toBe(0);
    expect(result.current.loadingSpins).toBe(false);
  });

  it('debería cargar los giros con éxito desde el servicio', async () => {
    // Simular que la API responde correctamente con la wallet
    vi.mocked(getUserSpinsWallet).mockResolvedValue(mockWallet);

    const { result } = renderHook(() => useUserSpins());

    // Ejecutamos la carga asíncrona
    await act(async () => {
      await result.current.loadSpins(mockUserId);
    });

    // Verificaciones
    expect(getUserSpinsWallet).toHaveBeenCalledWith(mockUserId);
    expect(result.current.spins).toBe(15); // El estado cambió al número del backend
    expect(result.current.loadingSpins).toBe(false);
  });

  it('debería manejar el error de la API y mantener los giros en 0', async () => {
    // Simular que la API falla (ej: cookie expirada o error de servidor)
    const apiError = new Error('No se pudo obtener la billetera de giros');
    vi.mocked(getUserSpinsWallet).mockRejectedValue(apiError);

    // Espiar el console.error para que no ensucie la consola del test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useUserSpins());

    await act(async () => {
      await result.current.loadSpins(mockUserId);
    });

    // Verificaciones de comportamiento seguro (fallback)
    expect(consoleSpy).toHaveBeenCalledWith('Error al cargar los giros:', apiError);
    expect(result.current.spins).toBe(0); 
    expect(result.current.loadingSpins).toBe(false);

    consoleSpy.mockRestore();
  });

  it('debería mantener los giros en 0 si la API responde con null (wallet no encontrada)', async () => {
    // Simular que la API responde exitosamente pero no encuentra una wallet asociada
    vi.mocked(getUserSpinsWallet).mockResolvedValue(null);

    const { result } = renderHook(() => useUserSpins());

    await act(async () => {
      await result.current.loadSpins(mockUserId);
    });

    expect(result.current.spins).toBe(0);
    expect(result.current.loadingSpins).toBe(false);
  });
});