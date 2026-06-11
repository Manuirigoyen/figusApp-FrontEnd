import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTienda } from '../../../../components/tienda/hooks/useTienda';

vi.mock('../../../utils/resolveImageUrl', () => ({
  resolveImageUrl: (url: string) => url
}));

describe('useTienda Hook', () => {
  const mockProducto = {
    id: 1,
    name: 'Producto Test',
    price_usd: 100,
    discount_usd: 20,
    discount_active: 1,
    product_type: 'pack'
  };

  beforeEach(() => {
    // Mock global de fetch
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockProducto]),
      })
    ));
  });

  it('debe cargar productos correctamente', async () => {
    const { result } = renderHook(() => useTienda());

    // Inicialmente cargando
    expect(result.current.loading).toBe(true);

    // Esperar a que termine el useEffect
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.productosFiltradosYOrdenados).toHaveLength(1);
  });

  it('debe agregar productos al carrito', async () => {
    const { result } = renderHook(() => useTienda());

    await act(async () => {
      result.current.agregarAlCarrito(mockProducto as any);
    });

    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.totalItems).toBe(1);
  });

  it('debe calcular el precio final con descuento', () => {
    const { result } = renderHook(() => useTienda());
    const precio = result.current.calcularPrecioFinal(mockProducto as any);
    
    // 100 - 20 = 80
    expect(precio).toBe(80);
  });

  it('debe vaciar el carrito', async () => {
    const { result } = renderHook(() => useTienda());

    await act(async () => {
      result.current.agregarAlCarrito(mockProducto as any);
      result.current.vaciarCarrito();
    });

    expect(result.current.carrito).toHaveLength(0);
    expect(result.current.totalCarrito).toBe(0);
  });
});