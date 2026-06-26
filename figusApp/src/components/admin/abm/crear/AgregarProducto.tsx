import { useState } from 'react';

import '../../../register/register.css';
import '../abm.css';

import { createProduct } from '../services/productsService';

const adminLogo = new URL(
  '../../../../assets/img/icons/logo.png',
  import.meta.url,
).href;

/**
 * Renderiza el formulario de alta de productos.
 */
export const AgregarProducto = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData(e.currentTarget);

      await createProduct({
        product_code: String(
          formData.get('product_code'),
        ),
        name: String(formData.get('name')),
        description: String(
          formData.get('description'),
        ),
        price_usd: Number(
          formData.get('price_usd'),
        ),
        discount_usd: Number(
          formData.get('discount_usd'),
        ),
        stock_available: Number(
          formData.get('stock_available'),
        ),
        product_type: String(
          formData.get('product_type'),
        ) as 'pack' | 'combo',
        cover_image:
          formData.get('cover_image') instanceof File
            ? (formData.get(
                'cover_image',
              ) as File)
            : undefined,
      });

      setSuccess(
        'Producto agregado correctamente',
      );

      e.currentTarget.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error inesperado',
      );
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

        <h2 className="register-title abm-title mb-2">
          Agregar Producto
        </h2>

        <p className="register-subtitle abm-subtitle mb-0">
          Se pueden agregar productos de tienda
          del tipo pack o combo.
        </p>
      </header>

      <div className="register-body abm-body">
        <form
          name="agregar_producto"
          className="abm-form"
          onSubmit={handleSubmit}
        >
          <div className="row g-3">
            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputCodigoProducto"
                className="form-label"
              >
                Código del producto
              </label>

              <input
                type="text"
                id="inputCodigoProducto"
                name="product_code"
                className="form-control register-input abm-input"
                placeholder="Ej: PROD-001"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputNombreProducto"
                className="form-label"
              >
                Nombre del producto
              </label>

              <input
                type="text"
                id="inputNombreProducto"
                name="name"
                className="form-control register-input abm-input"
                placeholder="Ej: Pack inicial"
                required
              />
            </div>

            <div className="col-12 abm-field">
              <label
                htmlFor="inputDescripcionProducto"
                className="form-label"
              >
                Descripción
              </label>

              <textarea
                id="inputDescripcionProducto"
                name="description"
                className="form-control register-input abm-input abm-textarea"
                rows={4}
                placeholder="Describí el producto..."
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputPrecioProducto"
                className="form-label"
              >
                Precio USD
              </label>

              <input
                type="number"
                id="inputPrecioProducto"
                name="price_usd"
                className="form-control register-input abm-input"
                min={0}
                step="0.01"
                defaultValue={0}
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputDescuentoProducto"
                className="form-label"
              >
                Descuento USD
              </label>

              <input
                type="number"
                id="inputDescuentoProducto"
                name="discount_usd"
                className="form-control register-input abm-input"
                min={0}
                step="0.01"
                defaultValue={0}
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputStockProducto"
                className="form-label"
              >
                Stock disponible
              </label>

              <input
                type="number"
                id="inputStockProducto"
                name="stock_available"
                className="form-control register-input abm-input"
                min={0}
                defaultValue={0}
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="selectTipoProducto"
                className="form-label"
              >
                Tipo de producto
              </label>

              <select
                id="selectTipoProducto"
                name="product_type"
                className="form-select register-input abm-input"
                defaultValue="pack"
              >
                <option value="pack">
                  Pack
                </option>

                <option value="combo">
                  Combo
                </option>
              </select>
            </div>

            <div className="col-12 abm-field">
              <label
                htmlFor="inputImagenProducto"
                className="form-label"
              >
                Imagen del producto
              </label>

              <input
                type="file"
                id="inputImagenProducto"
                name="cover_image"
                className="form-control register-input abm-input"
                accept="image/*"
              />
            </div>
          </div>

          <div className="abm-actions pt-2">
            <button
              type="submit"
              className="btn register-btn abm-btn w-100"
              disabled={loading}
            >
              {loading
                ? 'Agregando...'
                : 'Agregar producto'}
            </button>
          </div>
        </form>

        {success && (
          <div className="text-success mt-3">
            {success}
          </div>
        )}

        {error && (
          <div className="text-danger mt-3">
            {error}
          </div>
        )}
      </div>
    </section>
  );
};