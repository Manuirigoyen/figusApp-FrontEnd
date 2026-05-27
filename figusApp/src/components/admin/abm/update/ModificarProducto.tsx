import { useState } from 'react';

import {
  updateProduct,
} from '../services/productsService';

import '../../../register/register.css';
import '../abm.css';

/**
 * Renderiza el formulario de modificación de productos.
 */
export const ModificarProducto = () => {
  const updateLogo = new URL(
    '../../../../assets/img/icons/logo.png',
    import.meta.url,
  ).href;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);

      const id = Number(formData.get('id'));

      const productData = {
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
        ),
      };

      const image = formData.get(
        'cover_image',
      ) as File;

      const payload = new FormData();

      payload.append(
        'product_code',
        productData.product_code,
      );

      payload.append(
        'name',
        productData.name,
      );

      payload.append(
        'description',
        productData.description,
      );

      payload.append(
        'price_usd',
        String(productData.price_usd),
      );

      payload.append(
        'discount_usd',
        String(productData.discount_usd),
      );

      payload.append(
        'stock_available',
        String(productData.stock_available),
      );

      payload.append(
        'product_type',
        productData.product_type,
      );

      if (image && image.size > 0) {
        payload.append(
          'cover_image',
          image,
        );
      }

      await updateProduct(id, payload);

      console.log('Producto modificado');

      e.currentTarget.reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-card abm-card shadow-lg">
      <header className="register-header abm-header text-center">
        <img
          src={updateLogo}
          alt="FigusApp"
          className="register-logo abm-logo img-fluid"
        />

        <h2 className="register-title abm-title mb-2">
          Modificar Producto
        </h2>

        <p className="register-subtitle abm-subtitle mb-0">
          Se pueden modificar productos existentes
          de la tienda.
        </p>
      </header>

      <div className="register-body abm-body">
        <form
          name="modificar_producto"
          className="abm-form form_modificar"
          onSubmit={handleSubmit}
        >
          <div className="row g-3">
            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarProductoId"
                className="form-label"
              >
                ID del producto
              </label>

              <input
                type="number"
                id="inputModificarProductoId"
                name="id"
                className="form-control register-input abm-input"
                min={1}
                defaultValue={1}
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarCodigoProducto"
                className="form-label"
              >
                Nuevo código
              </label>

              <input
                type="text"
                id="inputModificarCodigoProducto"
                name="product_code"
                className="form-control register-input abm-input"
                placeholder="PACK-001"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarNombreProducto"
                className="form-label"
              >
                Nuevo nombre
              </label>

              <input
                type="text"
                id="inputModificarNombreProducto"
                name="name"
                className="form-control register-input abm-input"
                placeholder="Nombre del producto"
                required
              />
            </div>

            <div className="col-12 abm-field">
              <label
                htmlFor="textareaModificarDescripcionProducto"
                className="form-label"
              >
                Nueva descripción
              </label>

              <textarea
                id="textareaModificarDescripcionProducto"
                name="description"
                className="form-control register-input abm-input abm-textarea"
                rows={4}
                placeholder="Descripción del producto"
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarPrecioProducto"
                className="form-label"
              >
                Nuevo precio USD
              </label>

              <input
                type="number"
                id="inputModificarPrecioProducto"
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
                htmlFor="inputModificarDescuentoProducto"
                className="form-label"
              >
                Nuevo descuento USD
              </label>

              <input
                type="number"
                id="inputModificarDescuentoProducto"
                name="discount_usd"
                className="form-control register-input abm-input"
                min={0}
                step="0.01"
                defaultValue={0}
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="inputModificarStockProducto"
                className="form-label"
              >
                Nuevo stock
              </label>

              <input
                type="number"
                id="inputModificarStockProducto"
                name="stock_available"
                className="form-control register-input abm-input"
                min={0}
                defaultValue={0}
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label
                htmlFor="selectModificarTipoProducto"
                className="form-label"
              >
                Nuevo tipo
              </label>

              <select
                id="selectModificarTipoProducto"
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
                htmlFor="inputModificarImagenProducto"
                className="form-label"
              >
                Nueva imagen
              </label>

              <input
                type="file"
                id="inputModificarImagenProducto"
                name="cover_image"
                className="form-control register-input abm-input"
                accept="image/*"
              />
            </div>
          </div>

          <div className="abm-actions pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn register-btn abm-btn w-100"
            >
              {loading
                ? 'Modificando...'
                : 'Modificar'}
            </button>
          </div>
        </form>
      </div>

      <div
        id="respuesta_modificar_producto"
        className="abm-response"
      />
    </section>
  );
};