import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createSticker,
  deleteSticker,
  getAllStickers,
  getStickerById,
  getStickersByAlbumId,
  updateSticker,
} from './stickersService';

const mockFetch = (response: Partial<Response>) => {
  const fetchMock = vi.fn().mockResolvedValue(response);
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
};

const jsonResponse = (data: unknown, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: vi.fn().mockResolvedValue(data),
  text: vi.fn().mockResolvedValue(''),
});

const stickerDto = {
  album_id: 1,
  class: 'A',
  name: 'Messi',
  nationality: 'AR',
};

describe('stickersService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getAllStickers obtiene figuritas desde la API', async () => {
    const stickers = [{ id: 1, ...stickerDto }];
    const fetchMock = mockFetch(jsonResponse(stickers));

    await expect(getAllStickers()).resolves.toEqual(stickers);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/stickers',
      expect.objectContaining({ headers: { 'Content-Type': 'application/json' } }),
    );
  });

  it('getStickerById valida ID y obtiene una figurita', async () => {
    await expect(() => getStickerById(0)).toThrow('El ID de la figurita debe ser mayor a 0');

    const sticker = { id: 1, ...stickerDto };
    const fetchMock = mockFetch(jsonResponse(sticker));

    await expect(getStickerById(1)).resolves.toEqual(sticker);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/stickers/1',
      expect.any(Object),
    );
  });

  it('getStickersByAlbumId filtra por album_id y limita', async () => {
    mockFetch(jsonResponse([
      { id: 1, album_id: 1 },
      { id: 2, album_id: 1 },
      { id: 3, album_id: 2 },
    ]));

    await expect(getStickersByAlbumId(1, 1)).resolves.toEqual([{ id: 1, album_id: 1 }]);
  });

  it('createSticker envía FormData y maneja 400', async () => {
    const sticker = { id: 1, ...stickerDto };
    const fetchMock = mockFetch(jsonResponse(sticker));

    await expect(createSticker(stickerDto)).resolves.toEqual(sticker);

    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe('POST');
    expect(init.credentials).toBe('include');
    expect(init.body).toBeInstanceOf(FormData);
    expect((init.body as FormData).get('name')).toBe('Messi');

    mockFetch(jsonResponse({}, 400));
    await expect(createSticker(stickerDto)).rejects.toThrow('Datos inválidos');
  });

  it('updateSticker valida ID, usa PUT y maneja 404', async () => {
    await expect(updateSticker(0, {})).rejects.toThrow('El ID de la figurita debe ser mayor a 0');

    const sticker = { id: 1, ...stickerDto };
    const fetchMock = mockFetch(jsonResponse(sticker));

    await expect(updateSticker(1, { name: 'Nuevo' })).resolves.toEqual(sticker);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/stickers/1',
      expect.objectContaining({ method: 'PUT', credentials: 'include' }),
    );

    mockFetch(jsonResponse({}, 404));
    await expect(updateSticker(1, { name: 'Nuevo' })).rejects.toThrow('Figurita no encontrada');
  });

  it('deleteSticker usa DELETE y maneja 401', async () => {
    const fetchMock = mockFetch(jsonResponse(undefined, 204));

    await expect(deleteSticker(1)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/stickers/1',
      expect.objectContaining({ method: 'DELETE', credentials: 'include' }),
    );

    mockFetch(jsonResponse({}, 401));
    await expect(deleteSticker(1)).rejects.toThrow('No autorizado');
  });
});
