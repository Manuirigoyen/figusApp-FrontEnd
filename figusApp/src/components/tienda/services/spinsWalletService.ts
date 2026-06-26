const API_BASE = import.meta.env.VITE_API_BASE ?? "";

const getUrlDestino = (endpoint: string): string => {
  const base = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
  return base.includes('/api/v1') ? `${base}/${endpoint}` : `${base}/api/v1/${endpoint}`;
};

export interface AddSpinsPayload {
  user_id: number;
  spins: number;
}

export const acreditarGiros = async (payload: AddSpinsPayload): Promise<void> => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';

  const response = await fetch(getUrlDestino('spins-wallet'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado. Por favor, ingresa a tu cuenta nuevamente.');
    }
    throw new Error('No se pudieron acreditar los giros en la billetera.');
  }
};