import type { SpinsWallet } from '../types/SpinsWallet';
import type { SpinResult } from '../types/SpingResult';

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

const getUrlDestino = (endpoint: string): string => {
  const base = API_BASE.endsWith('/')
    ? API_BASE.slice(0, -1)
    : API_BASE;

  return base.includes('/api/v1')
    ? `${base}/${endpoint}`
    : `${base}/api/v1/${endpoint}`;
};


const parseJson = async <T>(
  response: Response,
): Promise<T> => {

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  if (!response.ok) {

    let message = "Error inesperado en el servidor.";

    try {
      const error = await response.json();
      message = error.message ?? message;
    } catch {}

    throw new Error(message);
  }

  return response.json();
};


export const getUserSpinsWallet = async (
  userId: number,
): Promise<SpinsWallet | null> => {

  const response = await fetch(
    getUrlDestino(`spins-wallet/user/${userId}`),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-store",
    },
  );

  return parseJson<SpinsWallet>(response);
};


export const executeSecureSpin = async (): Promise<SpinResult> => {

  const response = await fetch(
    getUrlDestino("spins-wallet/spin"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  return parseJson<SpinResult>(response);
};