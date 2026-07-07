const API_BASE = import.meta.env.VITE_API_BASE;

export interface StickerWalletItem {
  id: number;
  stock: number;
  sticker: {
    id: number;
    name: string;
    class: string;
    nationality: string;
    cover_image: string;
  }; 
}

export const getMyStickersWallet = async (): Promise<StickerWalletItem[]> => {
  const response = await fetch(`${API_BASE}/stickers-wallet/me`, {
    method: 'GET',
    credentials: 'include',
  });
 
  if (!response.ok) {
    throw new Error('No se pudo obtener la billetera.');
  }

  return response.json();
};

export const decrementStickerWalletItem = async (
  walletItemId: number,
): Promise<void> => {
  if (!walletItemId || walletItemId < 1) {
    throw new Error('El ID de la figurita de billetera debe ser mayor a 0');
  }

  const response = await fetch(
    `${API_BASE}/stickers-wallet/${walletItemId}/decrement`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No autorizado');
    }

    if (response.status === 404) {
      throw new Error('Figurita no encontrada en billetera');
    }

    const data = await response.json().catch(() => null);
    throw new Error(data?.message || 'No se pudo eliminar una unidad de la figurita.');
  }
};