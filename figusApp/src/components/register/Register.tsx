import { useCallback, useMemo, useState } from 'react';
import type { FormEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import { TurnstileCaptcha } from '../captcha/TurnstileCaptcha';

import { buildRegisterPayload } from './utils/buildRegisterPayload';
import { registerUser } from './services/RegisterUser';

import './register.css';

const COUNTRIES = [
  { code: 'AR', name: 'Argentina' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BR', name: 'Brasil' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CU', name: 'Cuba' },
  { code: 'DO', name: 'República Dominicana' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'ES', name: 'España' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GQ', name: 'Guinea Ecuatorial' },
  { code: 'HN', name: 'Honduras' },
  { code: 'MX', name: 'México' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'PA', name: 'Panamá' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Perú' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'PT', name: 'Portugal' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'VE', name: 'Venezuela' },
];

/**
 * Pantalla de registro de usuarios.
 */
export const Register = () => {
  const [captchaToken, setCaptchaToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const turnstileSiteKey = import.meta.env
    .VITE_TURNSTILE_SITE_KEY as string;

  /**
   * Fecha máxima permitida para usuarios
   * con un mínimo de 12 años.
   */
  const maxBirthDate = useMemo(() => {
    const today = new Date();

    today.setFullYear(today.getFullYear() - 12);

    return today.toISOString().split('T')[0];
  }, []);

  /**
   * Opciones del select de países.
   */
  const countryOptions = useMemo(() => {
    return COUNTRIES.map((country) => (
      <option key={country.code} value={country.code}>
        {country.name}
      </option>
    ));
  }, []);

  /**
   * Maneja el envío del formulario.
   */
  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setErrorMessage('');

      const form = event.currentTarget;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);

      const password = String(formData.get('password'));
      const confirmPassword = String(formData.get('confirm_password'));

      if (password !== confirmPassword) {
        setErrorMessage('Las contraseñas no coinciden.');
        return;
      }

      if (!captchaToken) {
        setErrorMessage('Completá la verificación CAPTCHA.');
        return;
      }

      try {
        setIsSubmitting(true);

        const payload = buildRegisterPayload(formData, captchaToken);

        await registerUser(payload);

        navigate('/user');
      } catch (error) {
        console.error(error);

        setErrorMessage(
          error instanceof Error
            ? `Ocurrió un error inesperado, por favor vuelva a intentarlo más tarde. ${error.message}`
            : 'Ocurrió un error inesperado, por favor vuelva a intentarlo más tarde.',
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [captchaToken, navigate],
  );

  return (
    <main className="register-page">
      <div className="register-overlay" />

      <section className="register-shell container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <div className="register-card shadow-lg">
              <div className="register-header text-center">
                <img
                  src={new URL('../../assets/img/icons/logo.png', import.meta.url).href}
                  alt="FigusApp"
                  className="register-logo img-fluid"
                />

                <h1 className="register-title mb-2">Creá tu cuenta</h1>

                <p className="register-subtitle mb-0">
                  Registrate para comenzar a coleccionar, intercambiar y descubrir figuritas.
                </p>

                {errorMessage && (
                  <p className="text-danger mt-3 mb-0">{errorMessage}</p>
                )}
              </div>

              <div className="register-body">
                <form className="register-form" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="first_name" className="form-label">
                        Nombre
                      </label>

                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="form-control register-input"
                        placeholder="Tu nombre"
                        autoComplete="given-name"
                        minLength={2}
                        maxLength={40}
                        pattern={String.raw`^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'\-]+$`}
                        title="El nombre solo puede contener letras, espacios, apóstrofes y guiones."
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="last_name" className="form-label">
                        Apellido
                      </label>

                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="form-control register-input"
                        placeholder="Tu apellido"
                        autoComplete="family-name"
                        minLength={2}
                        maxLength={40}
                        pattern={String.raw`^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'\-]+$`}
                        title="El apellido solo puede contener letras, espacios, apóstrofes y guiones."
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="date_of_birth" className="form-label">
                        Fecha de nacimiento
                      </label>

                      <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        className="form-control register-input"
                        autoComplete="bday"
                        min="1920-01-01"
                        max={maxBirthDate}
                        title="Debés tener al menos 12 años para registrarte."
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="country" className="form-label">
                        País
                      </label>

                      <select
                        id="country"
                        name="country"
                        className="form-select register-input"
                        autoComplete="country-name"
                        defaultValue=""
                        required
                      >
                        <option value="" disabled>
                          Seleccioná un país
                        </option>

                        {countryOptions}
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>

                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control register-input"
                        placeholder="usuario@gmail.com"
                        autoComplete="email"
                        maxLength={120}
                        spellCheck={false}
                        inputMode="email"
                        title="Ingresá un correo electrónico válido."
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="phone_number" className="form-label">
                        Teléfono{' '}
                        <span className="register-optional">(opcional)</span>
                      </label>

                      <input
                        type="tel"
                        id="phone_number"
                        name="phone_number"
                        className="form-control register-input"
                        placeholder="+54 9 223 1234567"
                        autoComplete="tel"
                        inputMode="tel"
                        minLength={8}
                        maxLength={20}
                        pattern={String.raw`^[0-9+\s()\-\]+$`}
                        title="El teléfono solo puede contener números, espacios, paréntesis, guiones y el símbolo +."
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="profile_picture" className="form-label">
                        Foto de perfil{' '}
                        <span className="register-optional">(opcional)</span>
                      </label>

                      <input
                        type="file"
                        id="profile_picture"
                        name="profile_picture"
                        className="form-control register-input"
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        title="Seleccioná una imagen JPG, PNG o WEBP."
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>

                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control register-input"
                        placeholder="Creá una contraseña"
                        autoComplete="new-password"
                        minLength={8}
                        maxLength={12}
                        pattern={String.raw`^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,12}$`}
                        title="La contraseña debe tener entre 8 y 12 caracteres, incluyendo al menos una mayúscula, una minúscula y un número o símbolo."
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="confirm_password" className="form-label">
                        Confirmar contraseña
                      </label>

                      <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        className="form-control register-input"
                        placeholder="Repetí la contraseña"
                        autoComplete="new-password"
                        minLength={8}
                        maxLength={12}
                        required
                      />
                    </div>

                    <div className="col-12 pt-2">
                      <TurnstileCaptcha
                        siteKey={turnstileSiteKey}
                        onTokenChange={setCaptchaToken}
                      />
                    </div>

                    <div className="col-12 pt-2">
                      <button
                        type="submit"
                        className="btn register-btn w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};