import { useState, useMemo, useEffect, useCallback } from 'react';
import type { ProductoTienda, ItemCarrito, FiltrosTienda, UseTiendaReturn } from '../types/productos.data';
import { resolveImageUrl } from '../../../utils/resolveImageUrl';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE}/stores`;

export const useTienda = (): UseTiendaReturn => {
  const [productos, setProductos] = useState<ProductoTienda[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
    const saved = localStorage.getItem('carrito');
    return saved ? JSON.parse(saved) : [];
  });

  const [compraInmediata, setCompraInmediata] = useState<ItemCarrito | null>(() => {
    const saved = localStorage.getItem('compraInmediata');
    return saved ? JSON.parse(saved) : null;
  });

  const [filtros, setFiltros] = useState<FiltrosTienda>({
    ordenPrecio: '',
    filtroTipoCompra: '',
    filtroRareza: '',
    filtroDescuento: false,
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (compraInmediata) {
      localStorage.setItem('compraInmediata', JSON.stringify(compraInmediata));
    } else {
      localStorage.removeItem('compraInmediata');
    }
  }, [compraInmediata]);

  const verificarDescuentoActivo = useCallback((producto: ProductoTienda): boolean => {
    return Number(producto.discount_active) > 0;
  }, []);

  const calcularPrecioFinal = useCallback((producto: ProductoTienda): number => {
    return verificarDescuentoActivo(producto) 
      ? producto.price_usd - producto.discount_usd 
      : producto.price_usd;
  }, [verificarDescuentoActivo]);

  useEffect(() => {
    const controller = new AbortController();
    const cargarProductos = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL, { signal: controller.signal });
        if (!response.ok) throw new Error('Error al obtener los productos');
        
        // Reemplazamos 'any' especificando que es un array de registros desconocidos
        const data = (await response.json()) as Record<string, unknown>[];
        
        const productosNormalizados = data.map((p): ProductoTienda => ({
          id: Number(p.id),
          pack_id: p.pack_id ? Number(p.pack_id) : null,
          name: String(p.name),
          description: String(p.description),
          price_usd: Number(p.price_usd),
          discount_usd: Number(p.discount_usd),
          discount_active: String(p.discount_active),
          stock_available: Number(p.stock_available),
          cover_image: resolveImageUrl(String(p.cover_image), 'store'),
          product_type: p.product_type as ProductoTienda['product_type'],
          comboItems: p.comboItems as ProductoTienda['comboItems']
        }));
        setProductos(productosNormalizados);
      } catch (err: unknown) { // Tipamos el catch de forma segura como unknown
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    cargarProductos();
    return () => controller.abort();
  }, []);

  const handleSetFiltro = <K extends keyof FiltrosTienda>(campo: K, valor: FiltrosTienda[K]): void => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const agregarAlCarrito = (producto: ProductoTienda, cantidad: number): void => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.producto.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      }
      return [...prev, { producto, cantidad }];
    });
  };

  const eliminarDelCarrito = (id: number): void => setCarrito((prev) => prev.filter((item) => item.producto.id !== id));

  const vaciarCarrito = (): void => {
    setCarrito([]);
    setCompraInmediata(null);
    localStorage.removeItem('carrito');
    localStorage.removeItem('compraInmediata');
  };

  const totalCarrito = useMemo(() => 
    carrito.reduce((acc, item) => acc + calcularPrecioFinal(item.producto) * item.cantidad, 0), 
  [carrito, calcularPrecioFinal]);

  const totalItems = useMemo(() => 
    carrito.reduce((acc, item) => acc + item.cantidad, 0), 
  [carrito]);

  const productosFiltradosYOrdenados = useMemo(() => {
    let resultado = [...productos];
    if (filtros.filtroTipoCompra) resultado = resultado.filter((p) => p.product_type === filtros.filtroTipoCompra);
    if (filtros.filtroRareza) {
      resultado = resultado.filter((p) => 
        p.name.toLowerCase().includes(filtros.filtroRareza.toLowerCase()) || 
        p.description.toLowerCase().includes(filtros.filtroRareza.toLowerCase())
      );
    }
    if (filtros.filtroDescuento) resultado = resultado.filter((p) => verificarDescuentoActivo(p));
    if (filtros.ordenPrecio === 'menor') resultado.sort((a, b) => calcularPrecioFinal(a) - calcularPrecioFinal(b));
    else if (filtros.ordenPrecio === 'mayor') resultado.sort((a, b) => calcularPrecioFinal(b) - calcularPrecioFinal(a));
    return resultado;
  }, [filtros, productos, calcularPrecioFinal, verificarDescuentoActivo]);

  return {
    carrito, sidebarOpen, setSidebarOpen, filtros, handleSetFiltro,
    productosFiltradosYOrdenados, totalCarrito, totalItems, agregarAlCarrito,
    eliminarDelCarrito, vaciarCarrito, calcularPrecioFinal, verificarDescuentoActivo,
    loading, error, compraInmediata, setCompraInmediata
  };
};