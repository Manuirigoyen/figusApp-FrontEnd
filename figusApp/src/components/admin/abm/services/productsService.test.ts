import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from './productsService';

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

const productDto = {
  product_code: 'PACK-001',
  name: 'Sobre Dorado',
  description: 'Sobre premium',
  price_usd: 10,
  discount_usd: 1,
  stock_available: 20,
  product_type: 'pack' as const,
};

describe('productsService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('getProductById valida ID y maneja 404', async () => {
    await expect(getProductById(0)).rejects.toThrow('El ID del producto debe ser mayor a 0');

    mockFetch(jsonResponse({}, 404));
    await expect(getProductById(10)).rejects.toThrow('Producto no encontrado');
  });

  it('getProducts obtiene todos los productos', async () => {
    const products = [{ id: 1, name: 'Sobre' }];
    const fetchMock = mockFetch(jsonResponse(products));

    await expect(getProducts()).resolves.toEqual(products);
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/v1/stores');
  });

  it('createProduct envía FormData y maneja 401', async () => {
    const product = { id: 1, ...productDto };
    const fetchMock = mockFetch(jsonResponse(product));

    await expect(createProduct(productDto)).resolves.toEqual(product);

    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe('POST');
    expect(init.credentials).toBe('include');
    expect(init.body).toBeInstanceOf(FormData);
    expect((init.body as FormData).get('discount_usd')).toBe('1');

    mockFetch(jsonResponse({}, 401));
    await expect(createProduct(productDto)).rejects.toThrow('No autorizado');
  });

  it('updateProduct usa PUT y maneja 400', async () => {
    const product = { id: 1, ...productDto };
    const fetchMock = mockFetch(jsonResponse(product));

    await expect(updateProduct(1, productDto)).resolves.toEqual(product);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/stores/1',
      expect.objectContaining({ method: 'PUT', credentials: 'include' }),
    );

    mockFetch(jsonResponse({}, 400));
    await expect(updateProduct(1, productDto)).rejects.toThrow('Datos inválidos para modificar el producto');
  });

  it('deleteProduct usa DELETE y valida ID', async () => {
    await expect(deleteProduct(0)).rejects.toThrow('El ID del producto debe ser mayor a 0');

    const fetchMock = mockFetch(jsonResponse(undefined, 204));
    await expect(deleteProduct(1)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3000/api/v1/stores/1',
      expect.objectContaining({ method: 'DELETE', credentials: 'include' }),
    );
  });
});
