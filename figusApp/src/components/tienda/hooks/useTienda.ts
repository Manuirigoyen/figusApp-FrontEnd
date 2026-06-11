import { useState, useMemo, useEffect } from 'react';
import type { ProductoTienda, ItemCarrito, FiltrosTienda, UseTiendaReturn } from '../types/productos.data';
import { resolveImageUrl } from '../../../utils/resolveImageUrl';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE}/stores`;

export const useTienda = (): UseTiendaReturn => {
  const [productos, setProductos] = useState<ProductoTienda[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [filtros, setFiltros] = useState<FiltrosTienda>({
    ordenPrecio: '',
    filtroTipoCompra: '',
    filtroRareza: '',
    filtroDescuento: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    const cargarProductos = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL, { signal: controller.signal });
        
        if (!response.ok) throw new Error('Error al obtener los productos');

        const data = await response.json();
        
        const productosNormalizados = data.map((p: any): ProductoTienda => ({
          ...p,
          cover_image: resolveImageUrl(p.cover_image, 'store'),
          price_usd: Number(p.price_usd),
          discount_usd: Number(p.discount_usd),
          discount_active: p.discount_active
        }));

        setProductos(productosNormalizados);
      } catch (err: any) {
        if (err.name !== 'AbortError') setError(err.message);
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

  const verificarDescuentoActivo = (producto: ProductoTienda): boolean => Number(producto.discount_active) > 0;

  const calcularPrecioFinal = (producto: ProductoTienda): number => {
    return verificarDescuentoActivo(producto)
      ? producto.price_usd - producto.discount_usd
      : producto.price_usd;
  };

  const agregarAlCarrito = (producto: ProductoTienda): void => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.producto.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id: number): void => setCarrito((prev) => prev.filter((item) => item.producto.id !== id));

  const vaciarCarrito = (): void => setCarrito([]);

  const totalCarrito = useMemo(() => 
    carrito.reduce((acc, item) => acc + calcularPrecioFinal(item.producto) * item.cantidad, 0), 
  [carrito]);

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
  }, [filtros, productos]);

  return {
    carrito, sidebarOpen, setSidebarOpen, filtros, handleSetFiltro,
    productosFiltradosYOrdenados, totalCarrito, totalItems, agregarAlCarrito,
    eliminarDelCarrito, vaciarCarrito, calcularPrecioFinal, verificarDescuentoActivo,
    loading, error,
  };
};