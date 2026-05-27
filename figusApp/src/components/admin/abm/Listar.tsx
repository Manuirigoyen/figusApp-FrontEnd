import type { ReactNode } from 'react';

import '../../register/register.css';
import './abm.css';

const adminLogo = new URL(
  '../../../assets/img/icons/logo.png',
  import.meta.url,
).href;

type ListCardProps = {
  title: string;
  children: ReactNode;
};

type ListSectionProps = {
  title: string;
  description: string;
  formName: string;
  responseId: string;
  buttonText: string;
  children: ReactNode;
};

type SearchByIdSectionProps = {
  title: string;
  description: string;
  formName: string;
  inputId: string;
  label: string;
  responseId: string;
  buttonText: string;
};

type RangeSectionProps = {
  title: string;
  description: string;
  formName: string;
  inputId: string;
  label: string;
  rangeName: string;
  responseId: string;
  buttonText: string;
};

type FieldProps = {
  htmlFor: string;
  label: string;
  children: ReactNode;
  full?: boolean;
};

const ListCard = ({
  title,
  children,
}: ListCardProps) => (
  <section className="register-card abm-card shadow-lg">
    <header className="register-header abm-header text-center">
      <img
        src={adminLogo}
        alt="FigusApp"
        className="register-logo abm-logo img-fluid"
      />

      <h2 className="register-title abm-title mb-0">
        {title}
      </h2>
    </header>

    <div className="abm-list-wrapper">
      {children}
    </div>
  </section>
);

const ListSection = ({
  title,
  description,
  formName,
  responseId,
  buttonText,
  children,
}: ListSectionProps) => (
  <section className="abm-list-section">
    <div className="abm-list-header">
      <h3 className="abm-list-subtitle">
        {title}
      </h3>

      <p className="register-subtitle abm-subtitle mb-0">
        {description}
      </p>
    </div>

    <form name={formName} className="abm-form">
      <div className="row g-3">
        {children}
      </div>

      <div className="abm-actions pt-2">
        <button
          type="submit"
          className="btn register-btn abm-btn w-100"
        >
          {buttonText}
        </button>
      </div>
    </form>

    <div id={responseId} className="abm-response" />
  </section>
);

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

const SearchByIdSection = ({
  title,
  description,
  formName,
  inputId,
  label,
  responseId,
  buttonText,
}: SearchByIdSectionProps) => (
  <ListSection
    title={title}
    description={description}
    formName={formName}
    responseId={responseId}
    buttonText={buttonText}
  >
    <Field htmlFor={inputId} label={label}>
      <input
        type="number"
        id={inputId}
        name="id"
        min={1}
        required
        defaultValue={1}
        className="form-control register-input abm-input"
      />
    </Field>
  </ListSection>
);

const RangeSection = ({
  title,
  description,
  formName,
  inputId,
  label,
  rangeName,
  responseId,
  buttonText,
}: RangeSectionProps) => (
  <ListSection
    title={title}
    description={description}
    formName={formName}
    responseId={responseId}
    buttonText={buttonText}
  >
    <Field htmlFor={inputId} label={label} full>
      <input
        type="range"
        id={inputId}
        name={rangeName}
        min={1}
        max={50}
        defaultValue={5}
        className="form-range abm-range"
      />
    </Field>
  </ListSection>
);

/**
 * Renderiza formularios de listado administrativo.
 *
 * @returns {JSX.Element} Colección de formularios de listado.
 */
export const Listar = () => {
  return (
    <main className="abm-page">
      <div className="abm-overlay" />

      <section className="abm-shell container py-4 py-md-5">
        <div className="abm-forms-wrapper">
          <ListarAlbum />
          <ListarFigurita />
          <ListarSobre />
          <ListarUsuario />
          <ListarProducto />
        </div>
      </section>
    </main>
  );
};

export const ListarAlbum = () => (
  <ListCard title="Listar Álbumes">
    <SearchByIdSection
      title="Buscar álbum por ID"
      description="Se puede buscar un álbum específico indicando su identificador."
      formName="listar_album_por_id"
      inputId="inputAlbumId"
      label="ID del álbum"
      responseId="respuesta_listar_album_por_id"
      buttonText="Buscar álbum"
    />

    <RangeSection
      title="Listar álbumes"
      description="Se pueden listar varios álbumes indicando un límite de resultados."
      formName="listar_album_por_limite"
      inputId="inputLimiteAlbumes"
      label="Límite de álbumes"
      rangeName="limite_albumes"
      responseId="respuesta_listar_album_por_limite"
      buttonText="Listar álbumes"
    />
  </ListCard>
);

export const ListarFigurita = () => (
  <ListCard title="Listar Figuritas">
    <SearchByIdSection
      title="Buscar figurita por ID"
      description="Se puede buscar una figurita específica indicando su identificador."
      formName="listar_figurita_por_id"
      inputId="inputFiguritaId"
      label="ID de la figurita"
      responseId="respuesta_listar_figurita_por_id"
      buttonText="Buscar figurita"
    />

    <ListSection
      title="Listar figuritas por álbum"
      description="Se pueden listar figuritas pertenecientes a un álbum específico."
      formName="listar_figurita_por_album"
      responseId="respuesta_listar_figurita_por_album"
      buttonText="Listar figuritas"
    >
      <Field
        htmlFor="inputAlbumFiguritaId"
        label="ID del álbum"
      >
        <input
          type="number"
          id="inputAlbumFiguritaId"
          name="album_id"
          min={1}
          required
          defaultValue={1}
          className="form-control register-input abm-input"
        />
      </Field>

      <Field
        htmlFor="inputLimiteFiguritas"
        label="Límite de figuritas"
      >
        <input
          type="range"
          id="inputLimiteFiguritas"
          name="limite_figuritas"
          min={1}
          max={50}
          defaultValue={5}
          className="form-range abm-range"
        />
      </Field>
    </ListSection>
  </ListCard>
);

export const ListarSobre = () => (
  <ListCard title="Listar Sobres">
    <SearchByIdSection
      title="Buscar sobre por ID"
      description="Se puede buscar un sobre específico indicando su identificador."
      formName="listar_sobre_por_id"
      inputId="inputSobreId"
      label="ID del sobre"
      responseId="respuesta_listar_sobre_por_id"
      buttonText="Buscar sobre"
    />

    <ListSection
      title="Listar sobres por álbum"
      description="Se pueden listar sobres pertenecientes a un álbum específico."
      formName="listar_sobre_por_album"
      responseId="respuesta_listar_sobre_por_album"
      buttonText="Listar sobres"
    >
      <Field
        htmlFor="inputAlbumSobreId"
        label="ID del álbum"
      >
        <input
          type="number"
          id="inputAlbumSobreId"
          name="album_id"
          min={1}
          required
          defaultValue={1}
          className="form-control register-input abm-input"
        />
      </Field>

      <Field
        htmlFor="inputLimiteSobres"
        label="Límite de sobres"
      >
        <input
          type="range"
          id="inputLimiteSobres"
          name="limite_sobres"
          min={1}
          max={50}
          defaultValue={5}
          className="form-range abm-range"
        />
      </Field>
    </ListSection>
  </ListCard>
);

export const ListarUsuario = () => (
  <ListCard title="Listar Usuarios">
    <SearchByIdSection
      title="Buscar usuario por ID"
      description="Se puede buscar un usuario específico indicando su identificador."
      formName="listar_usuario_por_id"
      inputId="inputUsuarioId"
      label="ID del usuario"
      responseId="respuesta_listar_usuario_por_id"
      buttonText="Buscar usuario"
    />
  </ListCard>
);

export const ListarProducto = () => (
  <ListCard title="Listar Productos">
    <SearchByIdSection
      title="Buscar producto por ID"
      description="Se puede buscar un producto específico indicando su identificador."
      formName="listar_producto_por_id"
      inputId="inputProductoId"
      label="ID del producto"
      responseId="respuesta_listar_producto_por_id"
      buttonText="Buscar producto"
    />

    <RangeSection
      title="Listar productos"
      description="Se pueden listar varios productos indicando un límite de resultados."
      formName="listar_producto_por_limite"
      inputId="inputLimiteProductos"
      label="Límite de productos"
      rangeName="limite_productos"
      responseId="respuesta_listar_producto_por_limite"
      buttonText="Listar productos"
    />
  </ListCard>
);