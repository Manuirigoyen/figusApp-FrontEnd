import type { ReactNode } from 'react';

import { COUNTRIES } from '../../../constants/countries';

import '../../register/register.css';
import './abm.css';

const updateLogo = new URL(
  '../../../assets/img/icons/logo.png',
  import.meta.url,
).href;

type UpdateFormCardProps = {
  title: string;
  description: string;
  formName: string;
  responseId: string;
  children: ReactNode;
};

type UpdateFieldProps = {
  id: string;
  label: string;
  name: string;
  type?: string;
  min?: number;
  max?: number;
  step?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
  accept?: string;
};

type UpdateTextareaProps = {
  id: string;
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
};

type UpdateSelectProps = {
  id: string;
  label: string;
  name: string;
  options: { value: string; text: string }[];
  defaultValue?: string;
  required?: boolean;
};

const countryOptions = COUNTRIES.map((country) => (
  <option key={country.code} value={country.code}>
    {country.name}
  </option>
));

const roleOptions = [
  { value: 'user', text: 'Usuario' },
  { value: 'admin', text: 'Administrador' },
];

const productTypeOptions = [
  { value: 'pack', text: 'Pack' },
  { value: 'combo', text: 'Combo' },
];

/**
 * Renderiza formularios de modificación administrativa del sistema.
 *
 * @returns {JSX.Element} Colección de formularios de modificación.
 */
export const Update = () => {
  return (
    <main className="abm-page">
      <div className="abm-overlay" />

      <section className="abm-shell container py-4 py-md-5">
        <div className="abm-forms-wrapper">
          <ModificarAlbum />
          <ModificarFigurita />
          <ModificarSobre />
          <ModificarUsuario />
          <ModificarProducto />
        </div>
      </section>
    </main>
  );
};

/**
 * Contenedor reutilizable para formularios administrativos de modificación.
 *
 * @returns {JSX.Element} Tarjeta de formulario administrativa.
 */
const UpdateFormCard = ({
  title,
  description,
  formName,
  responseId,
  children,
}: UpdateFormCardProps) => (
  <section className="register-card abm-card shadow-lg">
    <header className="register-header abm-header text-center">
      <img
        src={updateLogo}
        alt="FigusApp"
        className="register-logo abm-logo img-fluid"
      />

      <h2 className="register-title abm-title mb-2">{title}</h2>

      <p className="register-subtitle abm-subtitle mb-0">{description}</p>
    </header>

    <div className="register-body abm-body">
      <form name={formName} className="abm-form form_modificar">
        <div className="row g-3">{children}</div>

        <div className="abm-actions pt-2">
          <button type="submit" className="btn register-btn abm-btn w-100">
            Modificar
          </button>
        </div>
      </form>
    </div>

    <div id={responseId} className="abm-response" />
  </section>
);

/**
 * Campo reutilizable de formulario de modificación.
 *
 * @returns {JSX.Element} Grupo de campo.
 */
const UpdateField = ({
  id,
  label,
  name,
  type = 'text',
  min,
  max,
  step,
  defaultValue,
  required = false,
  placeholder,
  accept,
}: UpdateFieldProps) => (
  <div className="col-12 col-md-6 abm-field">
    <label htmlFor={id} className="form-label">
      {label}
    </label>

    <input
      type={type}
      id={id}
      name={name}
      className="form-control register-input abm-input"
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      required={required}
      placeholder={placeholder}
      accept={accept}
    />
  </div>
);

/**
 * Textarea reutilizable de formulario de modificación.
 *
 * @returns {JSX.Element} Grupo de textarea.
 */
const UpdateTextarea = ({
  id,
  label,
  name,
  rows = 4,
  placeholder,
  required = false,
  defaultValue,
}: UpdateTextareaProps) => (
  <div className="col-12 abm-field abm-field-full">
    <label htmlFor={id} className="form-label">
      {label}
    </label>

    <textarea
      id={id}
      name={name}
      className="form-control register-input abm-input abm-textarea"
      rows={rows}
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
    />
  </div>
);

/**
 * Select reutilizable de formulario de modificación.
 *
 * @returns {JSX.Element} Grupo de select.
 */
const UpdateSelect = ({
  id,
  label,
  name,
  options,
  defaultValue = '',
  required = false,
}: UpdateSelectProps) => (
  <div className="col-12 col-md-6 abm-field">
    <label htmlFor={id} className="form-label">
      {label}
    </label>

    <select
      id={id}
      name={name}
      className="form-select register-input abm-input"
      defaultValue={defaultValue}
      required={required}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  </div>
);

/**
 * Select reutilizable de países.
 *
 * @returns {JSX.Element} Opciones de país.
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
 * Renderiza el formulario de modificación de álbumes.
 *
 * @returns {JSX.Element} Formulario de modificación de álbum.
 */
export const ModificarAlbum = () => (
  <UpdateFormCard
    title="Modificar Álbum"
    description="Se pueden modificar álbumes existentes del sistema."
    formName="modificar_album"
    responseId="respuesta_modificar_album"
  >
    <UpdateField
      id="inputModificarAlbumId"
      label="ID del álbum"
      name="id"
      type="number"
      min={1}
      defaultValue={1}
      required
    />

    <UpdateField
      id="inputModificarNombreAlbum"
      label="Nuevo nombre"
      name="name"
      required
      placeholder="Nombre del álbum"
    />

    <UpdateSelect
      id="selectModificarClaseAlbum"
      label="Nueva clase"
      name="class"
      options={[]}
      defaultValue=""
      required
    />

    <UpdateSelect
      id="selectModificarNacionalidadAlbum"
      label="Nueva nacionalidad"
      name="nationality"
      options={[
        { value: '', text: 'Seleccioná un país' },
        ...COUNTRIES.map((country) => ({
          value: country.code,
          text: country.name,
        })),
      ]}
      defaultValue=""
      required
    />

    <UpdateTextarea
      id="inputModificarDescripcionAlbum"
      label="Nueva descripción"
      name="description"
      placeholder="Descripción del álbum"
    />

    <UpdateField
      id="inputModificarCapacidadAlbum"
      label="Nueva capacidad"
      name="capacity"
      type="number"
      min={1}
      defaultValue={100}
    />

    <UpdateField
      id="inputModificarImagenAlbum"
      label="Nueva imagen de portada"
      name="cover_image"
      type="file"
      accept="image/*"
    />
  </UpdateFormCard>
);

/**
 * Renderiza el formulario de modificación de figuritas.
 *
 * @returns {JSX.Element} Formulario de modificación de figurita.
 */
export const ModificarFigurita = () => (
  <UpdateFormCard
    title="Modificar Figurita"
    description="Se pueden modificar figuritas existentes del sistema."
    formName="modificar_figurita"
    responseId="respuesta_modificar_figurita"
  >
    <UpdateField
      id="inputModificarFiguId"
      label="ID de la figurita"
      name="id"
      type="number"
      min={1}
      defaultValue={1}
      required
    />

    <UpdateField
      id="inputModificarAlbumFigurita"
      label="ID del álbum"
      name="album_id"
      type="number"
      min={1}
      defaultValue={1}
      required
    />

    <UpdateSelect
      id="selectModificarClaseFigurita"
      label="Nueva clase"
      name="class"
      options={[]}
      defaultValue=""
      required
    />

    <UpdateField
      id="inputModificarNombreFigurita"
      label="Nuevo nombre"
      name="name"
      required
      placeholder="Nombre de la figurita"
    />

    <UpdateSelect
      id="selectModificarNacionalidadFigurita"
      label="Nueva nacionalidad"
      name="nationality"
      options={COUNTRIES.map((country) => ({
        value: country.code,
        text: country.name,
      }))}
      defaultValue=""
      required
    />

    <UpdateField
      id="inputModificarImagenFigurita"
      label="Nueva imagen"
      name="cover_image"
      type="file"
      accept="image/*"
    />
  </UpdateFormCard>
);

/**
 * Renderiza el formulario de modificación de sobres.
 *
 * @returns {JSX.Element} Formulario de modificación de sobre.
 */
export const ModificarSobre = () => (
  <UpdateFormCard
    title="Modificar Sobre"
    description="Se pueden modificar sobres existentes del sistema."
    formName="modificar_sobre"
    responseId="respuesta_modificar_sobre"
  >
    <UpdateField
      id="inputModificarSobreId"
      label="ID del sobre"
      name="id"
      type="number"
      min={1}
      defaultValue={1}
      required
    />

    <UpdateField
      id="inputModificarAlbumSobre"
      label="ID del álbum"
      name="album_id"
      type="number"
      min={1}
      defaultValue={1}
      required
    />

    <UpdateSelect
      id="selectModificarClaseSobre"
      label="Nueva clase"
      name="class"
      options={[]}
      defaultValue=""
      required
    />

    <UpdateField
      id="inputModificarPrecioSobre"
      label="Nuevo precio"
      name="price"
      type="number"
      min={0}
      step="0.01"
      defaultValue={0}
      required
    />

    <UpdateField
      id="inputModificarStockSobre"
      label="Nuevo stock"
      name="stock"
      type="number"
      min={0}
      defaultValue={0}
    />

    <UpdateField
      id="inputModificarCapacidadSobre"
      label="Nueva capacidad"
      name="capacity"
      type="number"
      min={1}
      defaultValue={7}
    />

    <UpdateField
      id="inputModificarImagenSobre"
      label="Nueva imagen"
      name="cover_image"
      type="file"
      accept="image/*"
    />
  </UpdateFormCard>
);

/**
 * Renderiza el formulario de modificación de usuarios.
 *
 * @returns {JSX.Element} Formulario de modificación de usuario.
 */
export const ModificarUsuario = () => (
  <UpdateFormCard
    title="Modificar Usuario"
    description="Se pueden modificar usuarios existentes del sistema."
    formName="modificar_usuario"
    responseId="respuesta_modificar_usuario"
  >
    <UpdateField
      id="inputModificarUsuarioId"
      label="ID del usuario"
      name="id"
      type="number"
      min={1}
      defaultValue={1}
      required
    />

    <UpdateField
      id="inputModificarNombre"
      label="Nuevo nombre"
      name="first_name"
      required
      placeholder="Nombre"
    />

    <UpdateField
      id="inputModificarApellido"
      label="Nuevo apellido"
      name="last_name"
      required
      placeholder="Apellido"
    />

    <UpdateField
      id="inputModificarEmail"
      label="Nuevo correo electrónico"
      name="email"
      type="email"
      required
      placeholder="usuario@gmail.com"
    />

    <UpdateField
      id="inputModificarTelefono"
      label="Nuevo número de teléfono"
      name="phone_number"
      type="tel"
      placeholder="+5492230000000"
    />

    <UpdateField
      id="inputModificarNacimiento"
      label="Nueva fecha de nacimiento"
      name="date_of_birth"
      type="date"
      required
    />

    <UpdateSelect
      id="selectModificarNacionalidad"
      label="Nueva nacionalidad"
      name="nationality"
      options={COUNTRIES.map((country) => ({
        value: country.code,
        text: country.name,
      }))}
      defaultValue=""
      required
    />

    <UpdateSelect
      id="selectModificarRol"
      label="Nuevo rol"
      name="role"
      options={roleOptions}
      defaultValue="user"
      required
    />

    <UpdateField
      id="inputModificarFotoPerfil"
      label="Nueva foto de perfil"
      name="profile_picture"
      type="file"
      accept="image/*"
    />
  </UpdateFormCard>
);

/**
 * Renderiza el formulario de modificación de productos.
 *
 * @returns {JSX.Element} Formulario de modificación de producto.
 */
export const ModificarProducto = () => (
  <UpdateFormCard
    title="Modificar Producto"
    description="Se pueden modificar productos existentes de la tienda."
    formName="modificar_producto"
    responseId="respuesta_modificar_producto"
  >
    <UpdateField
      id="inputModificarProductoId"
      label="ID del producto"
      name="id"
      type="number"
      min={1}
      defaultValue={1}
      required
    />

    <UpdateField
      id="inputModificarCodigoProducto"
      label="Nuevo código"
      name="product_code"
      required
      placeholder="PACK-001"
    />

    <UpdateField
      id="inputModificarNombreProducto"
      label="Nuevo nombre"
      name="name"
      required
      placeholder="Nombre del producto"
    />

    <UpdateTextarea
      id="textareaModificarDescripcionProducto"
      label="Nueva descripción"
      name="description"
      placeholder="Descripción del producto"
    />

    <UpdateField
      id="inputModificarPrecioProducto"
      label="Nuevo precio"
      name="price_usd"
      type="number"
      min={0}
      step="0.01"
      defaultValue={0}
      required
    />

    <UpdateField
      id="inputModificarDescuentoProducto"
      label="Nuevo descuento"
      name="discount_usd"
      type="number"
      min={0}
      step="0.01"
      defaultValue={0}
    />

    <UpdateField
      id="inputModificarStockProducto"
      label="Nuevo stock"
      name="stock_available"
      type="number"
      min={0}
      defaultValue={0}
    />

    <UpdateSelect
      id="selectModificarTipoProducto"
      label="Nuevo tipo de producto"
      name="product_type"
      options={productTypeOptions}
      defaultValue="pack"
      required
    />

    <UpdateField
      id="inputModificarImagenProducto"
      label="Nueva imagen"
      name="cover_image"
      type="file"
      accept="image/*"
    />
  </UpdateFormCard>
);