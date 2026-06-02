import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createAlbum,
  deleteAlbum,
  getAlbumById,
  getAlbums,
  updateAlbum,
} from './albumsService';

const mockFetch = (response: Partial<Response>) => {
  const fetchMock = vi.fn().mockResolvedValue(response);
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  return fetchMock;
};

const jsonResponse = (data: unknown, status = 200) => ({
  ok: status >= 200 && status < 300,
  status,
  json: vi.fn().mockResolvedValue(data),
});

describe('albumsService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getAlbumById valida ID mayor a 0', async () => {
    await expect(getAlbumById(0)).rejects.toThrow('El ID del álbum debe ser mayor a 0');
  });

  it('getAlbumById obtiene un álbum por id', async () => {
    const album = { id: 1, name: 'Argentina' };
    const fetchMock = mockFetch(jsonResponse(album));

    await expect(getAlbumById(1)).resolves.toEqual(album);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/v1/albums/1');
  });

  it('getAlbumById transforma 404 en mensaje específico', async () => {
    mockFetch(jsonResponse({}, 404));

    await expect(getAlbumById(99)).rejects.toThrow('Álbum no encontrado');
  });

  it('getAlbums obtiene todos los álbumes', async () => {
    const albums = [{ id: 1, name: 'Argentina' }];
    const fetchMock = mockFetch(jsonResponse(albums));

    await expect(getAlbums()).resolves.toEqual(albums);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/v1/albums');
  });

  it('createAlbum envía FormData y credenciales', async () => {
    const album = { id: 1, name: 'Argentina' };
    const fetchMock = mockFetch(jsonResponse(album));

    await expect(createAlbum({
      name: 'Argentina',
      class: 'A',
      nationality: 'AR',
      description: 'Campeones',
      capacity: 10,
    })).resolves.toEqual(album);

    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe('POST');
    expect(init.credentials).toBe('include');
    expect(init.body).toBeInstanceOf(FormData);
    expect((init.body as FormData).get('capacity')).toBe('10');
  });

  it('updateAlbum valida ID y maneja 401', async () => {
    await expect(updateAlbum(0, {})).rejects.toThrow('El ID del álbum debe ser mayor a 0');

    mockFetch(jsonResponse({}, 401));
    await expect(updateAlbum(1, { name: 'Nuevo' })).rejects.toThrow('No autorizado');
  });

  it('deleteAlbum usa DELETE y maneja 404', async () => {
    const fetchMock = mockFetch(jsonResponse(undefined, 204));

    await expect(deleteAlbum(1)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/albums/1',
      expect.objectContaining({ method: 'DELETE', credentials: 'include' }),
    );

    mockFetch(jsonResponse({}, 404));
    await expect(deleteAlbum(1)).rejects.toThrow('Álbum no encontrado');
  });
});
