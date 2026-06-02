import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createPack,
  deletePack,
  getAllPacks,
  getPackById,
  getPacksByAlbumId,
  updatePack,
} from './packsService';

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

describe('packsService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getAllPacks obtiene sobres desde la API', async () => {
    const packs = [{ id: 1, album_id: 1, class: 'Dorado', price: 5, stock: 10, capacity: 5 }];
    const fetchMock = mockFetch(jsonResponse(packs));

    await expect(getAllPacks()).resolves.toEqual(packs);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/packs',
      expect.objectContaining({ headers: { 'Content-Type': 'application/json' } }),
    );
  });

  it('getPackById obtiene un sobre por ID', async () => {
    const pack = { id: 2, album_id: 1, class: 'Bronce', price: 2, stock: 5, capacity: 3 };
    const fetchMock = mockFetch(jsonResponse(pack));

    await expect(getPackById(2)).resolves.toEqual(pack);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/packs/2',
      expect.any(Object),
    );
  });

  it('getPacksByAlbumId filtra por álbum y limita resultados', async () => {
    mockFetch(jsonResponse([
      { id: 1, album_id: 1 },
      { id: 2, album_id: 1 },
      { id: 3, album_id: 2 },
    ]));

    await expect(getPacksByAlbumId(1, 1)).resolves.toEqual([{ id: 1, album_id: 1 }]);
  });

  it('createPack envía FormData y maneja 400', async () => {
    const pack = { id: 1, album_id: 1, class: 'Dorado', price: 5, stock: 10, capacity: 5 };
    const fetchMock = mockFetch(jsonResponse(pack));

    await expect(createPack({ album_id: 1, class: 'Dorado', price: 5, stock: 10, capacity: 5 })).resolves.toEqual(pack);

    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe('POST');
    expect(init.credentials).toBe('include');
    expect(init.body).toBeInstanceOf(FormData);
    expect((init.body as FormData).get('price')).toBe('5');

    mockFetch(jsonResponse({}, 400));
    await expect(createPack({ album_id: 1, class: 'Dorado', price: 5, stock: 10, capacity: 5 })).rejects.toThrow('Datos inválidos para crear el sobre');
  });

  it('updatePack valida ID y usa PATCH', async () => {
    await expect(updatePack(0, {})).rejects.toThrow('El ID del sobre debe ser mayor a 0');

    const pack = { id: 1 };
    const fetchMock = mockFetch(jsonResponse(pack));
    await expect(updatePack(1, { class: 'Plata' })).resolves.toEqual(pack);

    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe('PATCH');
  });

  it('deletePack usa DELETE y maneja 404', async () => {
    const fetchMock = mockFetch(jsonResponse(undefined, 204));

    await expect(deletePack(1)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/packs/1',
      expect.objectContaining({ method: 'DELETE', credentials: 'include' }),
    );

    mockFetch(jsonResponse({}, 404));
    await expect(deletePack(1)).rejects.toThrow('Sobre no encontrado');
  });
});
