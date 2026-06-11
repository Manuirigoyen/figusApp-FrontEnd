import { useState } from 'react';
import React from 'react';
import '../../../register/register.css';
import '../abm.css';
import {
  getProductById,
  getProducts,
  type Product,
} from '../services/productsService';
import { TablaResultados } from '../TablaResultados';

const adminLogo = new URL('../../../../assets/img/icons/logo.png', import.meta.url).href;

/**
 * Renderiza formularios de listado de productos.
 *
 * @returns {JSX.Element} El componente de listado de productos.
 */
export const ListarProducto = () => {
  const [limiteProductos, setLimiteProductos] = useState<number>(5);
  const [datosParaTabla, setDatosParaTabla] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleBuscarProducto = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDatosParaTabla(null);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const id = Number(formData.get('id'));

      const data = await getProductById(id);
      setDatosParaTabla(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja el listado de productos con un límite definido.
   */
  const handleListarProductos = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDatosParaTabla(null);

    try {
      const data = await getProducts();
      setDatosParaTabla(data.slice(0, limiteProductos));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-card abm-card shadow-lg">
      <header className="register-header abm-header text-center">
        <img
          src={adminLogo}
          alt="FigusApp"
          className="register-logo abm-logo img-fluid"
        />
        <h2 className="register-title abm-title mb-0">Listar Productos</h2>
      </header>

      <div className="abm-list-wrapper">
        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">Buscar producto por ID</h3>
            <p className="register-subtitle abm-subtitle mb-0">
              Busca un producto específico mediante su identificador.
            </p>
          </div>

          <form onSubmit={handleBuscarProducto} className="abm-form">
            <div className="row g-3">
              <div className="col-12 col-md-6 abm-field">
                <label htmlFor="inputProductoId" className="form-label">ID del producto</label>
                <input
                  type="number"
                  id="inputProductoId"
                  name="id"
                  min={1}
                  required
                  defaultValue={1}
                  className="form-control register-input abm-input"
                />
              </div>
            </div>
            <div className="abm-actions pt-2">
              <button
                type="submit"
                className="btn register-btn abm-btn w-100"
                disabled={loading}
              >
                {loading ? 'Buscando...' : 'Buscar producto'}
              </button>
            </div>
          </form>
        </section>

        <section className="abm-list-section">
          <div className="abm-list-header">
            <h3 className="abm-list-subtitle">Listar productos</h3>
            <p className="register-subtitle abm-subtitle mb-0">
              Lista varios productos mediante un límite de resultados.
            </p>
          </div>

          <form onSubmit={handleListarProductos} className="abm-form">
            <div className="row g-3">
              <div className="col-12 abm-field">
                <label htmlFor="inputLimiteProductos" className="form-label">
                  Límite de productos:{' '}
                  <strong className="abm-range-value">{limiteProductos}</strong>
                </label>
                <input
                  type="range"
                  id="inputLimiteProductos"
                  name="limite_productos"
                  min={1}
                  max={50}
                  value={limiteProductos}
                  onChange={(e) => setLimiteProductos(Number(e.target.value))}
                  className="form-range abm-range"
                />
              </div>
            </div>
            <div className="abm-actions pt-2">
              <button
                type="submit"
                className="btn register-btn abm-btn w-100"
                disabled={loading}
              >
                {loading ? 'Listando...' : 'Listar productos'}
              </button>
            </div>
          </form>
        </section>

        {datosParaTabla && <TablaResultados data={datosParaTabla} />}

        {error && <div className="text-danger mt-3 text-center fw-bold">{error}</div>}
      </div>
    </section>
  );
};