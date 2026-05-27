import '../../../register/register.css';
import '../abm.css';

const adminLogo = new URL(
  '../../../../assets/img/icons/logo.png',
  import.meta.url,
).href;

/**
 * Renderiza el formulario de eliminación de usuarios.
 *
 * @returns {JSX.Element}
 */
export const EliminarUsuario = () => {
  const handleSubmit = async (
  e: React.SyntheticEvent<HTMLFormElement>
) => {
  e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const id = formData.get('id');

    try {
      const response = await fetch(
        `/api/usuarios/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Error al eliminar usuario');
      }

      console.log('Usuario eliminado');
    } catch (error) {
      console.error(error);
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
          Eliminar Usuario
        </h2>

        <p className="register-subtitle abm-subtitle mb-0">
          Elimina usuarios mediante su identificador.
        </p>
      </header>

      <div className="register-body abm-body">
        <form
          onSubmit={handleSubmit}
          className="abm-form"
        >
          <div className="row g-3">
            <div className="col-12 abm-field">
              <label
                htmlFor="inputEliminarUsuarioId"
                className="form-label"
              >
                ID del usuario
              </label>

              <input
                type="number"
                id="inputEliminarUsuarioId"
                name="id"
                min={1}
                placeholder="1"
                required
                className="form-control register-input abm-input"
              />
            </div>
          </div>

          <div className="abm-actions pt-2">
            <button
              type="submit"
              className="btn abm-btn abm-btn-danger w-100"
            >
              Eliminar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};