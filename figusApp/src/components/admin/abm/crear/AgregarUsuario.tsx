import { useState } from 'react';
import { COUNTRIES } from '../../../../constants/countries';
import '../../../register/register.css';
import '../abm.css';

const adminLogo = new URL(
  '../../../../assets/img/icons/logo.png',
  import.meta.url,
).href;

export const AgregarUsuario = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData(form);

      const body = {
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        date_of_birth: formData.get('date_of_birth'),
        nationality: formData.get('nationality'),
        email: formData.get('email'),
        phone_number: formData.get('phone_number'),
        password: formData.get('password'),
        captcha_token: 'dummy_token_admin_bypass',
      };

      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al agregar usuario');
      }

      await response.json();
      setSuccess('Usuario agregado correctamente');
      form.reset();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error inesperado');
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
        <h2 className="register-title abm-title mb-2">Agregar Usuario</h2>
        <p className="register-subtitle abm-subtitle mb-0">
          Se pueden agregar usuarios nuevos al sistema.
        </p>
      </header>

      <div className="register-body abm-body">
        <form name="agregar_usuario" className="abm-form" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="inputNombreUsuario" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="inputNombreUsuario"
                name="first_name"
                className="form-control register-input abm-input"
                placeholder="Nombre"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="inputApellidoUsuario" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                id="inputApellidoUsuario"
                name="last_name"
                className="form-control register-input abm-input"
                placeholder="Apellido"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="inputFechaNacimiento" className="form-label">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                id="inputFechaNacimiento"
                name="date_of_birth"
                className="form-control register-input abm-input"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="inputNacionalidadUsuario" className="form-label">
                Nacionalidad
              </label>
              <select
                id="inputNacionalidadUsuario"
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
              <label htmlFor="inputEmailUsuario" className="form-label">
                Correo electrónico
              </label>
              <input
                type="email"
                id="inputEmailUsuario"
                name="email"
                className="form-control register-input abm-input"
                placeholder="usuario@gmail.com"
                required
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="inputTelefonoUsuario" className="form-label">
                Número de teléfono
              </label>
              <input
                type="tel"
                id="inputTelefonoUsuario"
                name="phone_number"
                className="form-control register-input abm-input"
                placeholder="+54 9 11 1234-5678"
              />
            </div>

            <div className="col-12 col-md-6 abm-field">
              <label htmlFor="inputPasswordUsuario" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                id="inputPasswordUsuario"
                name="password"
                className="form-control register-input abm-input"
                placeholder="Contraseña"
                required
              />
            </div>
          </div>

          <div className="abm-actions pt-2">
            <button
              type="submit"
              className="btn register-btn abm-btn w-100"
              disabled={loading}
            >
              {loading ? 'Agregando usuario...' : 'Agregar usuario'}
            </button>
          </div>
        </form>

        {success && <div className="alert alert-success mt-3">{success}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>

      <div id="respuesta_agregar_usuario" className="abm-response" />
    </section>
  );
};