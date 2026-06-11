import type { StickerWalletItem } from '../../billetera/services/stickersWalletService';

const API_BASE = import.meta.env.VITE_API_BASE;

export interface StickerOption {
  id: number;
  name: string;
  class: string;
  nationality: string;
  cover_image: string;
}

export interface OfferUser {
  id: number;
  first_name: string;
  last_name: string;
}

export interface ExchangeOffer {
  id: number;
  offered_quantity: number;
  request_quantity: number;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  offererUser: OfferUser;
  offerWallet: {
    id: number;
    sticker: StickerOption;
  };
  requestSticker: StickerOption;
}

export interface CreateOfferPayload {
  offer_wallet_id: number;
  offered_quantity: number;
  request_sticker_id: number;
  request_quantity: number;
}

const requestJson = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || 'Ocurrió un error.');
  }

  return data as T;
};

export const getStickers = () =>
  requestJson<StickerOption[]>(`${API_BASE}/stickers`);

export const getMyStickersWallet = () =>
  requestJson<StickerWalletItem[]>(`${API_BASE}/stickers-wallet/me`);

export const getPendingOffers = () =>
  requestJson<ExchangeOffer[]>(`${API_BASE}/offers/pending`);

export const createOffer = (payload: CreateOfferPayload) =>
  requestJson<ExchangeOffer>(`${API_BASE}/offers`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const acceptOffer = (offerId: number) =>
  requestJson(`${API_BASE}/offers/${offerId}/accept`, {
    method: 'POST',
  });

export const rejectOffer = (offerId: number) =>
  requestJson(`${API_BASE}/offers/${offerId}/reject`, {
    method: 'POST',
  });