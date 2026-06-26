const API_BASE = import.meta.env.VITE_API_BASE ?? "";

const getUrlDestino = (endpoint: string): string => {
  const base = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
  return base.includes('/api/v1') ? `${base}/${endpoint}` : `${base}/api/v1/${endpoint}`;
};

export interface PackWalletItem {
  id: number;
  stock: number; 
  pack: {
    id: number;
    class: string;
    price: number;
    capacity: number;
    cover_image: string;
  };
}

export interface AddPackPayload {
  user_id: number;
  pack_id: number;
  stock: number; 
}

export const getMyPacksWallet = async (): Promise<PackWalletItem[]> => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';

  const response = await fetch(getUrlDestino('packs-wallet'), {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('No se pudo obtener la billetera de sobres.');
  }

  return response.json();
};

export const acreditarSobres = async (payload: AddPackPayload): Promise<void> => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';

  const response = await fetch(getUrlDestino('packs-wallet'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado. Por favor, inicia sesión nuevamente.');
    }
    throw new Error('No se pudieron acreditar los sobres en la billetera.');
  }
};