import type { SpinsWallet } from '../types/SpinsWallet';
import type { SpinResult } from '../types/SpingResult';

const API_BASE = import.meta.env.VITE_API_BASE;

export const getUserSpinsWallet = async (userId: number): Promise<SpinsWallet | null> => {
  const response = await fetch(`${API_BASE}/spins-wallet`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('No se pudo obtener la billetera de giros');
  const data = await response.json();

  if (Array.isArray(data)) {
    return data.find((wallet: SpinsWallet) => wallet.user_id === userId) || null;
  }
  return data as SpinsWallet;
};

export const executeSecureSpin = async (): Promise<SpinResult> => {
  const response = await fetch(`${API_BASE}/spins-wallet/spin`, {
    method: 'POST', 
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Error al procesar el giro seguro');
  }

  return (await response.json()) as SpinResult;
};