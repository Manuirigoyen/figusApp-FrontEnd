import type { ReactNode } from 'react';

import { COUNTRIES } from '../../../constants/countries';

import '../../register/register.css';
import './abm.css';


const adminLogo = new URL(
  '../../../assets/img/icons/logo.png',
  import.meta.url,
).href;

type AdminFormCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  responseId: string;
};

type FieldProps = {
  htmlFor: string;
  label: string;
  children: ReactNode;
  full?: boolean;
};

type SubmitButtonProps = {
  children: ReactNode;
  className?: string;
};

const countryOptions = COUNTRIES.map((country) => (
  <option key={country.code} value={country.code}>
    {country.name}
  </option>
));

/**
 * Renderiza formularios de alta administrativa del sistema.
 *
 * @returns {JSX.Element} Colección de formularios de alta.
 */
export const Alta = () => {
  return (
    <main className="abm-page">
      <div className="abm-overlay" />

      <section className="abm-shell container py-4 py-md-5">
        <div className="abm-forms-wrapper">
          <AgregarAlbum />
          <AgregarFigurita />
          <AgregarSobre />
          <AgregarUsuario />
          <AgregarProducto />
        </div>
      </section>
    </main>
  );
};

/**
 * Contenedor reutilizable para formularios administrativos.
 *
 * @returns {JSX.Element} Tarjeta de formulario administrativa.
 */
const AdminFormCard = ({
  title,
  description,
  children,
  responseId,
}: AdminFormCardProps) => (
  <section className="register-card abm-card shadow-lg">
    <header className="register-header abm-header text-center">
      <img
        src={adminLogo}
        alt="FigusApp"
        className="register-logo abm-logo img-fluid"
      />

      <h2 className="register-title abm-title mb-2">{title}</h2>

      <p className="register-subtitle abm-subtitle mb-0">{description}</p>
    </header>

    <div className="register-body abm-body">
      {children}
    </div>

    <div id={responseId} className="abm-response" />
  </section>
);

/**
 * Campo reutilizable de formulario.
 *
 * @returns {JSX.Element} Grupo de campo administrativo.
 */
const Field = ({
  htmlFor,
  label,
  children,
  full = false,
}: FieldProps) => (
  <div className={`col-12${full ? '' : ' col-md-6'} abm-field`}>
    <label htmlFor={htmlFor} className="form-label">
      {label}
    </label>

    {children}
  </div>
);

/**
 * Botón reutilizable de envío.
 *
 * @returns {JSX.Element} Botón de submit administrativo.
 */
const SubmitButton = ({
  children,
  className = '',
}: SubmitButtonProps) => (
  <button
    type="submit"
    className={`btn register-btn abm-btn w-100 ${className}`.trim()}
  >
    {children}
  </button>
);

/**
 * Select reutilizable de países.
 *
 * @returns {JSX.Element} Select con países disponibles.
 */
const CountrySelect = () => (
  <>
    <option value="" disabled>
      Seleccioná un país
    </option>

    {countryOptions}
  </>
);

/**
 * Renderiza el formulario de alta de álbumes.
 *
 * @returns {JSX.Element} Formulario de creación de álbum.
 */
export const AgregarAlbum = () => (
  <AdminFormCard
    title="Agregar Álbum"
    description="Se pueden agregar álbumes indicando nombre, clase, nacionalidad, descripción, capacidad e imagen de portada."
    responseId="respuesta_agregar_album"
  >
    <form name="agregar_album" className="abm-form">
      <div className="row g-3">
        <Field htmlFor="inputNombreAlbum" label="Nombre del álbum" full>
          <input
            type="text"
            id="inputNombreAlbum"
            name="name"
            className="form-control register-input abm-input"
            placeholder="Ej: Mundial Qatar 2022"
            required
          />
        </Field>

        <Field htmlFor="selectClaseAlbum" label="Clase del álbum">
          <select
            id="selectClaseAlbum"
            name="class"
            className="form-select register-input abm-input cls_album_class"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Seleccioná una clase
            </option>
          </select>
        </Field>

        <Field htmlFor="inputNacionalidadAlbum" label="Nacionalidad">
          <select
            id="inputNacionalidadAlbum"
            name="nationality"
            className="form-select register-input abm-input"
            defaultValue=""
            required
          >
            <CountrySelect />
          </select>
        </Field>

        <Field htmlFor="inputDescripcionAlbum" label="Descripción" full>
          <textarea
            id="inputDescripcionAlbum"
            name="description"
            className="form-control register-input abm-input abm-textarea"
            rows={4}
            placeholder="Describí el álbum..."
          />
        </Field>

        <Field htmlFor="inputCapacidadAlbum" label="Capacidad del álbum">
          <input
            type="number"
            id="inputCapacidadAlbum"
            name="capacity"
            className="form-control register-input abm-input"
            min={0}
            defaultValue={0}
            required
          />
        </Field>

        <Field htmlFor="inputImagenAlbum" label="Imagen de portada">
          <input
            type="file"
            id="inputImagenAlbum"
            name="cover_image"
            className="form-control register-input abm-input"
            accept="image/*"
          />
        </Field>
      </div>

      <div className="abm-actions pt-2">
        <SubmitButton>Agregar álbum</SubmitButton>
      </div>
    </form>
  </AdminFormCard>
);

/**
 * Renderiza el formulario de alta de figuritas.
 *
 * @returns {JSX.Element} Formulario de creación de figuritas.
 */
export const AgregarFigurita = () => (
  <AdminFormCard
    title="Agregar Figurita"
    description="Se pueden agregar figuritas indicando álbum, clase, nombre, nacionalidad e imagen."
    responseId="respuesta_agregar_figurita"
  >
    <form name="agregar_figurita" className="abm-form">
      <div className="row g-3">
        <Field htmlFor="selectAlbumFigurita" label="Álbum asociado" full>
          <select
            id="selectAlbumFigurita"
            name="album_id"
            className="form-select register-input abm-input cls_album"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Seleccioná un álbum
            </option>
          </select>
        </Field>

        <Field htmlFor="selectClaseFigurita" label="Clase de figurita">
          <select
            id="selectClaseFigurita"
            name="class"
            className="form-select register-input abm-input cls_sticker_class"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Seleccioná una clase
            </option>
          </select>
        </Field>

        <Field htmlFor="inputNombreFigurita" label="Nombre de la figurita">
          <input
            type="text"
            id="inputNombreFigurita"
            name="name"
            className="form-control register-input abm-input"
            placeholder="Ej: Lionel Messi"
            required
          />
        </Field>

        <Field htmlFor="inputNacionalidadFigurita" label="Nacionalidad">
          <select
            id="inputNacionalidadFigurita"
            name="nationality"
            className="form-select register-input abm-input"
            defaultValue=""
            required
          >
            <CountrySelect />
          </select>
        </Field>

        <Field htmlFor="inputImagenFigurita" label="Imagen de la figurita" full>
          <input
            type="file"
            id="inputImagenFigurita"
            name="cover_image"
            className="form-control register-input abm-input"
            accept="image/*"
          />
        </Field>
      </div>

      <div className="abm-actions pt-2">
        <SubmitButton>Agregar figurita</SubmitButton>
      </div>
    </form>
  </AdminFormCard>
);

/**
 * Renderiza el formulario de alta de sobres.
 *
 * @returns {JSX.Element} Formulario de creación de sobres.
 */
export const AgregarSobre = () => (
  <AdminFormCard
    title="Agregar Sobre"
    description="Se pueden agregar sobres indicando álbum, clase, precio, stock, capacidad e imagen."
    responseId="respuesta_agregar_sobre"
  >
    <form name="agregar_sobre" className="abm-form">
      <div className="row g-3">
        <Field htmlFor="selectAlbumSobre" label="Álbum asociado" full>
          <select
            id="selectAlbumSobre"
            name="album_id"
            className="form-select register-input abm-input cls_album"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Seleccioná un álbum
            </option>
          </select>
        </Field>

        <Field htmlFor="selectClaseSobre" label="Clase del sobre">
          <select
            id="selectClaseSobre"
            name="class"
            className="form-select register-input abm-input cls_pack_class"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Seleccioná una clase
            </option>
          </select>
        </Field>

        <Field htmlFor="inputPrecioSobre" label="Precio del sobre">
          <input
            type="number"
            id="inputPrecioSobre"
            name="price"
            className="form-control register-input abm-input"
            min={0}
            step="0.01"
            defaultValue={0}
            required
          />
        </Field>

        <Field htmlFor="inputStockSobre" label="Stock disponible">
          <input
            type="number"
            id="inputStockSobre"
            name="stock"
            className="form-control register-input abm-input"
            min={0}
            defaultValue={0}
            required
          />
        </Field>

        <Field htmlFor="inputCapacidadSobre" label="Capacidad del sobre">
          <input
            type="number"
            id="inputCapacidadSobre"
            name="capacity"
            className="form-control register-input abm-input"
            min={1}
            defaultValue={7}
            required
          />
        </Field>

        <Field htmlFor="inputImagenSobre" label="Imagen del sobre" full>
          <input
            type="file"
            id="inputImagenSobre"
            name="cover_image"
            className="form-control register-input abm-input"
            accept="image/*"
          />
        </Field>
      </div>

      <div className="abm-actions pt-2">
        <SubmitButton>Agregar sobre</SubmitButton>
      </div>
    </form>
  </AdminFormCard>
);

/**
 * Renderiza el formulario de alta de usuarios.
 *
 * @returns {JSX.Element} Formulario de creación de usuarios.
 */
export const AgregarUsuario = () => (
  <AdminFormCard
    title="Agregar Usuario"
    description="Se pueden agregar usuarios nuevos al sistema."
    responseId="respuesta_agregar_usuario"
  >
    <form name="agregar_usuario" className="abm-form">
      <div className="row g-3">
        <Field htmlFor="inputNombreUsuario" label="Nombre">
          <input
            type="text"
            id="inputNombreUsuario"
            name="first_name"
            className="form-control register-input abm-input"
            placeholder="Nombre"
            required
          />
        </Field>

        <Field htmlFor="inputApellidoUsuario" label="Apellido">
          <input
            type="text"
            id="inputApellidoUsuario"
            name="last_name"
            className="form-control register-input abm-input"
            placeholder="Apellido"
            required
          />
        </Field>

        <Field htmlFor="inputFechaNacimiento" label="Fecha de nacimiento">
          <input
            type="date"
            id="inputFechaNacimiento"
            name="date_of_birth"
            className="form-control register-input abm-input"
            required
          />
        </Field>

        <Field htmlFor="inputNacionalidadUsuario" label="Nacionalidad">
          <select
            id="inputNacionalidadUsuario"
            name="nationality"
            className="form-select register-input abm-input"
            defaultValue=""
            required
          >
            <CountrySelect />
          </select>
        </Field>

        <Field htmlFor="inputEmailUsuario" label="Correo electrónico">
          <input
            type="email"
            id="inputEmailUsuario"
            name="email"
            className="form-control register-input abm-input"
            placeholder="usuario@gmail.com"
            required
          />
        </Field>

        <Field htmlFor="inputTelefonoUsuario" label="Número de teléfono">
          <input
            type="tel"
            id="inputTelefonoUsuario"
            name="phone_number"
            className="form-control register-input abm-input"
            placeholder="+54 9 11 1234-5678"
          />
        </Field>

        <Field htmlFor="inputPasswordUsuario" label="Contraseña">
          <input
            type="password"
            id="inputPasswordUsuario"
            name="password"
            className="form-control register-input abm-input"
            placeholder="Contraseña"
            required
          />
        </Field>

        <Field htmlFor="selectRolUsuario" label="Rol del usuario">
          <select
            id="selectRolUsuario"
            name="role"
            className="form-select register-input abm-input"
            defaultValue="user"
          >
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </Field>

        <Field htmlFor="inputFotoUsuario" label="Foto de perfil" full>
          <input
            type="file"
            id="inputFotoUsuario"
            name="profile_picture"
            className="form-control register-input abm-input"
            accept="image/*"
          />
        </Field>
      </div>

      <div className="abm-actions pt-2">
        <SubmitButton>Agregar usuario</SubmitButton>
      </div>
    </form>
  </AdminFormCard>
);

/**
 * Renderiza el formulario de alta de productos de tienda.
 *
 * @returns {JSX.Element} Formulario de creación de productos.
 */
export const AgregarProducto = () => (
  <AdminFormCard
    title="Agregar Producto"
    description="Se pueden agregar productos de tienda del tipo pack o combo."
    responseId="respuesta_agregar_producto"
  >
    <form name="agregar_producto" className="abm-form">
      <div className="row g-3">
        <Field htmlFor="inputCodigoProducto" label="Código del producto">
          <input
            type="text"
            id="inputCodigoProducto"
            name="product_code"
            className="form-control register-input abm-input"
            placeholder="Ej: PROD-001"
            required
          />
        </Field>

        <Field htmlFor="inputNombreProducto" label="Nombre del producto">
          <input
            type="text"
            id="inputNombreProducto"
            name="name"
            className="form-control register-input abm-input"
            placeholder="Ej: Pack inicial"
            required
          />
        </Field>

        <Field htmlFor="inputDescripcionProducto" label="Descripción" full>
          <textarea
            id="inputDescripcionProducto"
            name="description"
            className="form-control register-input abm-input abm-textarea"
            rows={4}
            placeholder="Describí el producto..."
            required
          />
        </Field>

        <Field htmlFor="inputPrecioProducto" label="Precio USD">
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
        </Field>

        <Field htmlFor="inputDescuentoProducto" label="Descuento USD">
          <input
            type="number"
            id="inputDescuentoProducto"
            name="discount_usd"
            className="form-control register-input abm-input"
            min={0}
            step="0.01"
            defaultValue={0}
          />
        </Field>

        <Field htmlFor="inputStockProducto" label="Stock disponible">
          <input
            type="number"
            id="inputStockProducto"
            name="stock_available"
            className="form-control register-input abm-input"
            min={0}
            defaultValue={0}
            required
          />
        </Field>

        <Field htmlFor="selectTipoProducto" label="Tipo de producto">
          <select
            id="selectTipoProducto"
            name="product_type"
            className="form-select register-input abm-input"
            defaultValue="pack"
          >
            <option value="pack">Pack</option>
            <option value="combo">Combo</option>
          </select>
        </Field>

        <Field htmlFor="inputImagenProducto" label="Imagen del producto" full>
          <input
            type="file"
            id="inputImagenProducto"
            name="cover_image"
            className="form-control register-input abm-input"
            accept="image/*"
          />
        </Field>
      </div>

      <div className="abm-actions pt-2">
        <SubmitButton>Agregar producto</SubmitButton>
      </div>
    </form>
  </AdminFormCard>
);