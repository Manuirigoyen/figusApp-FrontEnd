import type { ItemCarrito, ProductoTienda } from '../types/productos.data';

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

const getUrlDestino = (endpoint: string): string => {
  const base = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
  return base.includes('/api/v1') ? `${base}/${endpoint}` : `${base}/api/v1/${endpoint}`;
};

export interface PurchasePayload {
  user_id: number;
  store_id: number;
  quantity: number;
  total_usd: number;
  discount_usd: number;
}

const parseJson = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as unknown as T;
  }

  if (!response.ok) {
    let message = 'Ocurrió un error inesperado al registrar la compra.';
    try {
      const errorBody = (await response.json()) as { message?: string };
      message = errorBody.message ?? message;
    } catch (parseError) {
      console.error('No se pudo leer el cuerpo de error del servidor:', parseError);
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
};

export const purchasesService = {
  registrarCompras: async (
    items: ItemCarrito[],
    userId: number,
    verificarDescuentoActivo = (producto: ProductoTienda): boolean => Number(producto.discount_active) > 0
  ): Promise<void> => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || '';
    const urlDestino = getUrlDestino('purchases');

    const peticiones = items.map(async (item) => {
      const tieneDescuento = verificarDescuentoActivo(item.producto);
      const descuentoUnitario = tieneDescuento ? item.producto.discount_usd : 0;
      
      const brutoTotal = item.producto.price_usd * item.cantidad;
      const descuentoTotal = descuentoUnitario * item.cantidad;

      const body: PurchasePayload = {
        user_id: userId,
        store_id: item.producto.id,
        quantity: item.cantidad,
        total_usd: brutoTotal,
        discount_usd: descuentoTotal,
      };

      const response = await fetch(urlDestino, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(body),
      });

      await parseJson<void>(response);
    });

    await Promise.all(peticiones);
  },
};