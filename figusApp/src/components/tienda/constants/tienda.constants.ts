import type { FiltrosTienda } from '../types/productos.data';
import type { OpcionSelect } from '../types/OpcionSelect';

export const OPCIONES_ORDEN: OpcionSelect<FiltrosTienda['ordenPrecio']>[] = [
  { value: "menor", label: "Menor precio" },
  { value: "mayor", label: "Mayor precio" }
] as const;

export const OPCIONES_CATEGORIA: OpcionSelect<FiltrosTienda['filtroTipoCompra']>[] = [
  { value: "unidad", label: "Unidad" },
  { value: "combo", label: "Combo" },
  { value: "pack", label: "Pack" },
  { value: "spin", label: "Giros" }, 
] as const;