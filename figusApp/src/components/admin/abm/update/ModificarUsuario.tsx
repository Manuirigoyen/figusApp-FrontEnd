import { useState } from 'react';
import { COUNTRIES } from '../../../../constants/countries';
import { updateUser } from '../services/usersService';
import type { SyntheticEvent } from 'react';

/**
 * Renderiza el formulario de modificación de usuarios.
 */
export const ModificarUsuario = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const updateLogo = new URL(
    '../../../../assets/img/icons/logo.png',
    import.meta.url,
  ).href;

  const handleSubmit = async (
    e: SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const form = e.currentTarget;

    setError('');
    setSuccess('');

    const formData = new FormData(form);

    const id = Number(formData.get('id'));
    const first_name = String(formData.get('first_name'));
    const last_name = String(formData.get('last_name'));
    const email = String(formData.get('email'));
    const phone_number = String(formData.get('phone_number'));
    const date_of_birth = String(formData.get('date_of_birth'));
    const nationality = String(formData.get('nationality'));
    const role = String(formData.get('role')) as 'user' | 'admin';
    const profile_picture = formData.get('profile_picture') as File;

    try {
      await updateUser(id, {
        first_name,
        last_name,
        email,
        phone_number,
        date_of_birth,
        nationality,
        role,
        profile_picture:
          profile_picture?.size > 0 ? profile_picture : undefined,
      });

      console.log('Usuario modificado');
      setSuccess('Usuario modificado correctamente');
      form.reset();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Error al modificar usuario');
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
          Modificar Usuario
        </h2>

        <p className="register-subtitle abm-subtitle mb-0">
          Se pueden modify usuarios existentes del sistema.
        </p>
      </header>

      <div className="register-body abm-body">
        <form
          name="modificar_usuario"
          className="abm-form form_modificar"
          onSubmit={handleSubmit}
        >
          <div className="row g-3">
            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="inputModificarUsuarioId" className="form-label">
                ID del usuario
              </label>

              <input
                type="number"
                id="inputModificarUsuarioId"
                name="id"
                className="form-control register-input abm-input"
                min={1}
                defaultValue={1}
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="inputModificarNombre" className="form-label">
                Nuevo nombre
              </label>

              <input
                type="text"
                id="inputModificarNombre"
                name="first_name"
                className="form-control register-input abm-input"
                placeholder="Nombre"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="inputModificarApellido" className="form-label">
                Nuevo apellido
              </label>

              <input
                type="text"
                id="inputModificarApellido"
                name="last_name"
                className="form-control register-input abm-input"
                placeholder="Apellido"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="inputModificarEmail" className="form-label">
                Nuevo email
              </label>

              <input
                type="email"
                id="inputModificarEmail"
                name="email"
                className="form-control register-input abm-input"
                placeholder="usuario@gmail.com"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="inputModificarTelefono" className="form-label">
                Nuevo teléfono
              </label>

              <input
                type="tel"
                id="inputModificarTelefono"
                name="phone_number"
                className="form-control register-input abm-input"
                placeholder="+5492230000000"
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="inputModificarNacimiento" className="form-label">
                Nueva fecha de nacimiento
              </label>

              <input
                type="date"
                id="inputModificarNacimiento"
                name="date_of_birth"
                className="form-control register-input abm-input"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="selectModificarNacionalidad" className="form-label">
                Nueva nacionalidad
              </label>

              <select
                id="selectModificarNacionalidad"
                name="nationality"
                className="form-select register-input abm-input"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Seleccioná un país
                </option>

                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="selectModificarRol" className="form-label">
                Nuevo rol
              </label>

              <select
                id="selectModificarRol"
                name="role"
                className="form-select register-input abm-input"
                defaultValue="user"
              >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="col-12 abm-field">
              <label htmlFor="inputModificarFoto" className="form-label">
                Nueva foto de perfil
              </label>

              <input
                type="file"
                id="inputModificarFoto"
                name="profile_picture"
                className="form-control register-input abm-input"
                accept="image/*"
              />
            </div>
          </div>

          <div className="abm-actions pt-2">
            <button type="submit" className="btn register-btn abm-btn w-100">
              Modificar
            </button>
          </div>
        </form>

        {success && (
          <div className="alert alert-success mt-3">
            {success}
          </div>
        )}

        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}
      </div>

      <div id="respuesta_modificar_usuario" className="abm-response" />
    </section>
  );
};