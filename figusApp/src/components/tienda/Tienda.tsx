import { useNavigate, Navigate } from 'react-router-dom';
import { useTienda } from './hooks/useTienda';
import packBanner from '../../assets/img/add/store/pack.png';
import { OPCIONES_ORDEN, OPCIONES_CATEGORIA } from './constants/tienda.constants';
import { ROUTES } from '../../routes/constants/routes.constants';
import './tienda.css';

/**
 * Tienda component for product store.
 */
export const Tienda: React.FC = () => {
  const navigate = useNavigate();
  const {
    carrito, sidebarOpen, setSidebarOpen, filtros, handleSetFiltro,
    productosFiltradosYOrdenados, totalCarrito, totalItems, agregarAlCarrito,
    eliminarDelCarrito, vaciarCarrito, calcularPrecioFinal, verificarDescuentoActivo,
    loading, error
  } = useTienda();

  /**
   * Removes album version suffix from product names.
   *
   * @param name - The product name to clean.
   * @returns The cleaned product name.
   */
  const limpiarNombreProducto = (name: string): string => name.replace(/\s*\(álbum\s*\d+\)/i, '').trim();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-white">
        <div className="spinner-border text-success" role="status"><span className="visually-hidden">Cargando...</span></div>
      </div>
    );
  }

  if (error) return <Navigate to={ROUTES.NOT_FOUND} replace={true} />;

  return (
    <main id="mainContent" className="main-wrapper store-page position-relative text-white">
      {sidebarOpen && <div className="sidebar-overlay sidebar-overlay-active" onClick={() => setSidebarOpen(false)} />}

      <aside className={`store-cart-sidebar d-flex flex-column ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="cart-top-section">
          <div className="p-2 border-bottom border-secondary d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 fw-bold text-white">Tu Carrito</h5>
            <button type="button" className="btn-close btn-close-white" onClick={() => setSidebarOpen(false)} />
          </div>
          <div className="cart-scroll-container">
            {carrito.length === 0 ? <p className="text-center text-muted my-5">El carrito está vacío.</p> : (
              <div className="d-flex flex-column gap-3">
                {carrito.map((item) => (
                  <div key={item.producto.id} className="d-flex gap-2 align-items-center pb-2 border-bottom border-secondary">
                    <img src={item.producto.cover_image} alt={limpiarNombreProducto(item.producto.name)} className="p-1 rounded bg-dark cart-item-img" onError={(e) => e.currentTarget.src = '/assets/img/default-product.png'} />
                    <div className="flex-grow-1 min-w-0">
                      <h6 className="mb-0 text-truncate fs-6 fw-bold text-white">{limpiarNombreProducto(item.producto.name)}</h6>
                      <span className="text-white-50 small">{item.cantidad} x USD {calcularPrecioFinal(item.producto).toFixed(2)}</span>
                    </div>
                    <button type="button" onClick={() => eliminarDelCarrito(item.producto.id)} className="btn btn-danger btn-sm">X</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="cart-bottom-section pt-3 border-top border-secondary mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="fw-semibold text-white-50">Total:</span>
            <span className="fw-bold fs-4 text-success">USD {totalCarrito.toFixed(2)}</span>
          </div>
          <div className="d-flex flex-column gap-2">
            <button type="button" onClick={() => navigate('/finalizar-compra')} disabled={carrito.length === 0} className="btn-store-agregar w-100 fw-bold py-2">Finalizar Compra</button>
            <button type="button" onClick={vaciarCarrito} disabled={carrito.length === 0} className="btn btn-danger w-100">Vaciar Carrito</button>
          </div>
        </div>
      </aside>

      <section className="store-content-wrapper flex-grow-1 p-4 w-100">
        <div className="store-ad-banner mb-5 text-center"><img src={packBanner} alt="Promoción" className="img-fluid" /></div>
        
        <div className="row align-items-center justify-content-center g-3 p-3 mb-5 store-filter-bar mx-0">
          <div className="col-auto">
            <button type="button" className="store-cart-icon-btn" onClick={() => setSidebarOpen((p) => !p)}>
              🛒 {totalItems > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{totalItems}</span>}
            </button>
          </div>
          <div className="col-12 col-sm-auto">
            <select className="form-select" value={filtros.ordenPrecio} onChange={(e) => handleSetFiltro('ordenPrecio', e.target.value as any)}>
              <option value="">Productos por precio</option>
              {OPCIONES_ORDEN.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="col-12 col-sm-auto">
            <select className="form-select" value={filtros.filtroTipoCompra} onChange={(e) => handleSetFiltro('filtroTipoCompra', e.target.value as any)}>
              <option value="">Productos por categoria</option>
              {OPCIONES_CATEGORIA.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="col-auto">
            <div className="form-check form-switch d-flex align-items-center">
              <input className="form-check-input me-2" type="checkbox" checked={filtros.filtroDescuento} onChange={(e) => handleSetFiltro('filtroDescuento', e.target.checked)} />
              <label className="form-check-label text-white">Descuento</label>
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
          {productosFiltradosYOrdenados.map((producto) => (
            <div key={producto.id} className="col d-flex">
              <div className="store-product-card w-100">
                <div className="store-card-img-wrapper">
                  <img src={producto.cover_image} alt={limpiarNombreProducto(producto.name)} className="product-card-img" />
                </div>
                <div className="store-card-body">
                  <h5 className="store-product-title fs-6">{limpiarNombreProducto(producto.name)}</h5>
                  <div className="mb-2">
                    {verificarDescuentoActivo(producto) ? (
                      <div className="d-flex flex-column">
                        <span className="text-secondary text-decoration-line-through small">USD {producto.price_usd.toFixed(2)}</span>
                        <span className="text-success fw-bold fs-5">USD {calcularPrecioFinal(producto).toFixed(2)}</span>
                      </div>
                    ) : <span className="fw-bold fs-5 text-dark">USD {producto.price_usd.toFixed(2)}</span>}
                  </div>
                  <div className="mt-auto">
                    <button type="button" onClick={() => navigate(`/producto/${producto.id}`)} className="btn-store-comprar w-100 mb-2">Comprar</button>
                    <button type="button" onClick={() => agregarAlCarrito(producto)} className="btn-store-agregar w-100">Agregar al carrito</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};