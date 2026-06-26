import type { ItemCarrito, ProductoTienda } from '../../tienda/types/productos.data';

const API_BASE = import.meta.env.VITE_API_BASE ?? "";

export interface PurchasePayload {
  user_id: number;
  store_id: number;
  quantity: number;
  total_usd: number;
  discount_usd: number;
}

/**
 * Representación de la entidad Store devuelta por el backend en las relaciones.
 */
export interface PurchaseStoreRelation {
  id: number;
  name: string;
  product_type: 'pack' | 'combo' | 'unidad' | 'spin';
  price_usd: number;
}

/**
 * Estructura de la entidad Purchase que retorna el backend de NestJS.
 */
export interface PurchaseResponse {
  id: number;
  user_id: number;
  store_id: number;
  quantity: number;
  total_usd: string | number;
  discount_usd: string | number;
  purchased_at: string;
  store?: PurchaseStoreRelation;
}

const parseJson = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as unknown as T;
  }

  if (!response.ok) {
    let message = 'Ocurrió un error inesperado';
    try {
      const errorBody = (await response.json()) as { message?: string };
      message = errorBody.message ?? message;
    } catch (parseError) {
      console.error('No se pudo leer el cuerpo de error:', parseError);
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
};

export const purchasesService = {
  registrarCompras: async (
    items: ItemCarrito[],
    userId: number,
    verificarDescuentoActivo: (producto: ProductoTienda) => boolean
  ): Promise<void> => {
    const urlDestino = API_BASE.includes('/api/v1') ? `${API_BASE}/purchases` : `${API_BASE}/api/v1/purchases`;

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
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      await parseJson<void>(response);
    });

    await Promise.all(peticiones);
  },

  /**
   * Obtiene el historial de compras completo de un usuario específico.
   * @param userId - Identificador único del usuario.
   * @returns Listado de compras formateadas por la entidad de NestJS.
   */
  obtenerComprasPorUsuario: async (userId: number): Promise<PurchaseResponse[]> => {
    const urlDestino = API_BASE.includes('/api/v1') 
      ? `${API_BASE}/purchases/user/${userId}` 
      : `${API_BASE}/api/v1/purchases/user/${userId}`;

    const response = await fetch(urlDestino, {
      method: 'GET',
      credentials: 'include',
    });

    return parseJson<PurchaseResponse[]>(response);
  },
};