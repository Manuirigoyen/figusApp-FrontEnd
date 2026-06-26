import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTienda } from './hooks/useTienda';
import { useAuth } from '../../routes/hooks/useAuth';
import { ROUTES } from '../../routes/constants/routes.constants';
import ofertaBanner from '../../assets/img/add/store/offerta.png';
import './producto.css';

export const Producto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); 
  const {
    carrito, sidebarOpen, setSidebarOpen, productosFiltradosYOrdenados,
    agregarAlCarrito, eliminarDelCarrito, vaciarCarrito,
    setCompraInmediata, calcularPrecioFinal, verificarDescuentoActivo, totalCarrito, totalItems
  } = useTienda();

  const { user } = useAuth();
  const [cantidad, setCantidad] = useState(1);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const producto = productosFiltradosYOrdenados.find((p) => p.id === Number(id));

  if (!producto) return null;

  const handleCompraDirecta = (): void => {
    setCompraInmediata({ producto, cantidad });
    if (user) {
      navigate(ROUTES.PAGO);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  const handleFinalizarCompra = (): void => {
    if (user) {
      navigate(ROUTES.PAGO);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  const limpiarNombreProducto = (name: string): string => name.replace(/\s*\(álbum\s*\d+\)/i, '').trim();

  return (
    <main className="main-wrapper position-relative text-white mt-2">
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
                      <span className="text-white-50 small">{item.cantidad} x ARS {calcularPrecioFinal(item.producto).toFixed(2)}</span>
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
            <span className="fw-bold fs-4 text-success">ARS {totalCarrito.toFixed(2)}</span>
          </div>
          <div className="d-flex flex-column gap-2">
            <button type="button" onClick={handleFinalizarCompra} disabled={carrito.length === 0} className="btn-store-agregar w-100 fw-bold py-2">Finalizar Compra</button>
            <button type="button" onClick={vaciarCarrito} disabled={carrito.length === 0} className="btn btn-danger w-100">Vaciar Carrito</button>
          </div>
        </div>
      </aside>

      <div className="py-5">
        <div className="product-detail-card position-relative">
          
          {isBannerVisible && (
            <div 
              className="position-absolute top-0 start-0 end-0 bottom-0 w-100 h-100" 
              style={{ 
                zIndex: 20, 
                borderRadius: '20px', 
                overflow: 'hidden',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(2px)'
              }}
            >
              <div className="w-100 h-100 position-relative">
                <img 
                  src={ofertaBanner} 
                  alt="Oferta" 
                  className="w-100 h-100 shadow-lg" 
                  style={{ objectFit: 'cover' }} 
                />
                <button
                  type="button"
                  className="position-absolute top-0 end-0 m-3 border-0 bg-transparent text-danger fw-bold fs-3"
                  style={{ zIndex: 30, cursor: 'pointer', lineHeight: 1, textShadow: '0px 0px 6px rgba(0,0,0,0.8)' }}
                  onClick={() => setIsBannerVisible(false)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div className="detail-cart-icon-wrapper">
            <button type="button" className="store-cart-icon-btn" onClick={() => setSidebarOpen(true)}>
              🛒 {totalItems > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{totalItems}</span>}
            </button>
          </div>

          <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
              <img src={producto.cover_image} alt={producto.name} className="product-detail-img img-fluid" />
            </div>

            <div className="col-12 col-md-6">
              <h1 className="product-title-detail mb-3">{producto.name}</h1>
              <p className="product-description mb-4">{producto.description}</p>

              <div className="mb-4">
                {verificarDescuentoActivo(producto) ? (
                  <>
                    <span className="text-secondary text-decoration-line-through me-2 fs-5">ARS {producto.price_usd.toFixed(2)}</span>
                    <span className="product-price-main">ARS {calcularPrecioFinal(producto).toFixed(2)}</span>
                  </>
                ) : (
                  <span className="product-price-main">ARS {producto.price_usd.toFixed(2)}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="quantity-label mb-2">Cantidad: {cantidad}</label>
                <input type="range" className="form-range w-100" min="1" max={producto.stock_available} value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} />
              </div>

              <div className="d-flex flex-column gap-3">
                <button className="btn-store-comprar w-100" onClick={handleCompraDirecta}>Comprar ahora</button>
                <button className="btn-store-agregar w-100" onClick={() => agregarAlCarrito(producto, cantidad)}>Añadir al carrito</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};