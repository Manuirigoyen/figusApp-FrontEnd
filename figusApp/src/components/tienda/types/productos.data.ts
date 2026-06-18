export interface ProductoTienda {
  id: number;
  pack_id: number | null;
  name: string;
  description: string;
  price_usd: number;
  discount_usd: number;
  discount_active: number | string;
  stock_available: number;
  cover_image: string;
  product_type: 'pack' | 'combo' | 'unidad' | 'spin';
}

export interface ItemCarrito {
  producto: ProductoTienda;
  cantidad: number;
}

export interface FiltrosTienda {
  ordenPrecio: '' | 'menor' | 'mayor';
  filtroTipoCompra: '' | 'pack' | 'combo' | 'unidad';
  filtroRareza: string;
  filtroDescuento: boolean;
}

export interface UseTiendaReturn {
  carrito: ItemCarrito[];
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filtros: FiltrosTienda;
  handleSetFiltro: <K extends keyof FiltrosTienda>(campo: K, valor: FiltrosTienda[K]) => void;
  productosFiltradosYOrdenados: ProductoTienda[];
  totalCarrito: number;
  totalItems: number;
  agregarAlCarrito: (producto: ProductoTienda, cantidad: number) => void;
  eliminarDelCarrito: (id: number) => void;
  vaciarCarrito: () => void;
  calcularPrecioFinal: (producto: ProductoTienda) => number;
  verificarDescuentoActivo: (producto: ProductoTienda) => boolean;
  loading: boolean;
  error: string | null;
  compraInmediata: ItemCarrito | null;
  setCompraInmediata: React.Dispatch<React.SetStateAction<ItemCarrito | null>>;
}