import '../../register/register.css';
import './abm.css';

const adminLogo = new URL(
  '../../../assets/img/icons/logo.png',
  import.meta.url,
).href;

type DeleteFormCardProps = {
  title: string;
  description: string;
  formName: string;
  inputId: string;
  label: string;
  responseId: string;
};

type DeleteFieldProps = {
  htmlFor: string;
  label: string;
};

const DeleteField = ({
  htmlFor,
  label,
}: DeleteFieldProps) => (
  <div className="col-12 abm-field">
    <label htmlFor={htmlFor} className="form-label">
      {label}
    </label>

    <input
      type="number"
      id={htmlFor}
      name="id"
      min={1}
      defaultValue={1}
      required
      className="form-control register-input abm-input"
    />
  </div>
);

const DeleteButton = () => (
  <button
    type="submit"
    className="btn abm-btn abm-btn-danger w-100"
  >
    Eliminar
  </button>
);

const DeleteFormCard = ({
  title,
  description,
  formName,
  inputId,
  label,
  responseId,
}: DeleteFormCardProps) => (
  <section className="register-card abm-card shadow-lg">
    <header className="register-header abm-header text-center">
      <img
        src={adminLogo}
        alt="FigusApp"
        className="register-logo abm-logo img-fluid"
      />

      <h2 className="register-title abm-title mb-2">
        {title}
      </h2>

      <p className="register-subtitle abm-subtitle mb-0">
        {description}
      </p>
    </header>

    <div className="register-body abm-body">
      <form name={formName} className="abm-form">
        <div className="row g-3">
          <DeleteField
            htmlFor={inputId}
            label={label}
          />
        </div>

        <div className="abm-actions pt-2">
          <DeleteButton />
        </div>
      </form>
    </div>

    <div id={responseId} className="abm-response" />
  </section>
);

/**
 * Renderiza formularios de eliminación administrativa del sistema.
 *
 * @returns {JSX.Element} Colección de formularios de eliminación.
 */
export const Delete = () => {
  return (
    <main className="abm-page">
      <div className="abm-overlay" />

      <section className="abm-shell container py-4 py-md-5">
        <div className="abm-forms-wrapper">
          <EliminarAlbum />
          <EliminarFigurita />
          <EliminarSobre />
          <EliminarUsuario />
          <EliminarProducto />
        </div>
      </section>
    </main>
  );
};

/**
 * Renderiza el formulario de eliminación de álbumes.
 *
 * @returns {JSX.Element}
 */
export const EliminarAlbum = () => (
  <DeleteFormCard
    title="Eliminar Álbum"
    description="Se pueden eliminar álbumes existentes mediante su identificador."
    formName="eliminar_album"
    inputId="inputEliminarAlbumId"
    label="ID del álbum"
    responseId="respuesta_eliminar_album"
  />
);

/**
 * Renderiza el formulario de eliminación de figuritas.
 *
 * @returns {JSX.Element}
 */
export const EliminarFigurita = () => (
  <DeleteFormCard
    title="Eliminar Figurita"
    description="Se pueden eliminar figuritas existentes mediante su identificador."
    formName="eliminar_figurita"
    inputId="inputEliminarFiguritaId"
    label="ID de la figurita"
    responseId="respuesta_eliminar_figurita"
  />
);

/**
 * Renderiza el formulario de eliminación de sobres.
 *
 * @returns {JSX.Element}
 */
export const EliminarSobre = () => (
  <DeleteFormCard
    title="Eliminar Sobre"
    description="Se pueden eliminar sobres existentes mediante su identificador."
    formName="eliminar_sobre"
    inputId="inputEliminarSobreId"
    label="ID del sobre"
    responseId="respuesta_eliminar_sobre"
  />
);

/**
 * Renderiza el formulario de eliminación de usuarios.
 *
 * @returns {JSX.Element}
 */
export const EliminarUsuario = () => (
  <DeleteFormCard
    title="Eliminar Usuario"
    description="Se pueden eliminar usuarios existentes mediante su identificador."
    formName="eliminar_usuario"
    inputId="inputEliminarUsuarioId"
    label="ID del usuario"
    responseId="respuesta_eliminar_usuario"
  />
);

/**
 * Renderiza el formulario de eliminación de productos.
 *
 * @returns {JSX.Element}
 */
export const EliminarProducto = () => (
  <DeleteFormCard
    title="Eliminar Producto"
    description="Se pueden eliminar productos de tienda mediante su identificador."
    formName="eliminar_producto"
    inputId="inputEliminarProductoId"
    label="ID del producto"
    responseId="respuesta_eliminar_producto"
  />
);