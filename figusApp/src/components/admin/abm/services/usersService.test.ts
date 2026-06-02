import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from './usersService';

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

const userDto = {
  first_name: 'Manuel',
  last_name: 'Irigoyen',
  date_of_birth: '2000-01-01',
  nationality: 'AR',
  email: 'manu@test.com',
  phone_number: '2231234567',
  password: 'Password1',
  role: 'user' as const,
};

const updateDto = {
  first_name: 'Manuel',
  last_name: 'Irigoyen',
  date_of_birth: '2000-01-01',
  nationality: 'AR',
  email: 'manu@test.com',
  phone_number: '2231234567',
  role: 'admin' as const,
};

describe('usersService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getUserById valida ID y maneja 404', async () => {
    await expect(getUserById(0)).rejects.toThrow('El ID del usuario debe ser mayor a 0');

    mockFetch(jsonResponse({}, 404));
    await expect(getUserById(1)).rejects.toThrow('Usuario no encontrado');
  });

  it('getUserById obtiene usuario por ID', async () => {
    const user = { id: 1, email: 'manu@test.com' };
    const fetchMock = mockFetch(jsonResponse(user));

    await expect(getUserById(1)).resolves.toEqual(user);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/users/1',
      expect.objectContaining({ method: 'GET', credentials: 'include' }),
    );
  });

  it('createUser envía FormData y maneja 400', async () => {
    const user = { id: 1, ...userDto };
    const fetchMock = mockFetch(jsonResponse(user));

    await expect(createUser(userDto)).resolves.toEqual(user);

    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe('POST');
    expect(init.credentials).toBe('include');
    expect(init.body).toBeInstanceOf(FormData);
    expect((init.body as FormData).get('email')).toBe('manu@test.com');

    mockFetch(jsonResponse({}, 400));
    await expect(createUser(userDto)).rejects.toThrow('Datos inválidos para crear el usuario');
  });

  it('updateUser valida ID, usa PUT y maneja 401', async () => {
    await expect(updateUser(0, updateDto)).rejects.toThrow('El ID del usuario debe ser mayor a 0');

    const user = { id: 1, ...updateDto };
    const fetchMock = mockFetch(jsonResponse(user));

    await expect(updateUser(1, updateDto)).resolves.toEqual(user);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/users/1',
      expect.objectContaining({ method: 'PUT', credentials: 'include' }),
    );

    mockFetch(jsonResponse({}, 401));
    await expect(updateUser(1, updateDto)).rejects.toThrow('No autorizado');
  });

  it('deleteUser usa DELETE y maneja 404', async () => {
    const fetchMock = mockFetch(jsonResponse(undefined, 204));

    await expect(deleteUser(1)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/users/1',
      expect.objectContaining({ method: 'DELETE', credentials: 'include' }),
    );

    mockFetch(jsonResponse({}, 404));
    await expect(deleteUser(1)).rejects.toThrow('Usuario no encontrado');
  });
});
