import type { FiltrosTienda } from '../types/productos.data';
import type { OpcionSelect } from '../types/OpcionSelect';

/**
 * Opciones disponibles para el selector de ordenamiento por precio en la interfaz.
 */
export const OPCIONES_ORDEN: OpcionSelect<FiltrosTienda['ordenPrecio']>[] = [
  { value: "menor", label: "Menor precio" },
  { value: "mayor", label: "Mayor precio" }
];

/**
 * Opciones disponibles para el selector de categorías basadas en el tipo de producto.
 */
export const OPCIONES_CATEGORIA: OpcionSelect<FiltrosTienda['filtroTipoCompra']>[] = [
  { value: "unidad", label: "Unidad" },
  { value: "combo", label: "Combo" },
  { value: "pack", label: "Pack" },
];