import { useCallback, useState } from 'react';
import type { SubmitEvent } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { TurnstileCaptcha } from '../captcha/TurnstileCaptcha';

import { buildLoginPayload } from './utils/buildLoginPayload';
import { loginUser } from './services/LoginUser';

import './login.css';

export const Login = () => {
  const [captchaToken, setCaptchaToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sentToEmail, setSentToEmail] = useState('');

  const navigate = useNavigate();

  const turnstileSiteKey = import.meta.env
    .VITE_TURNSTILE_SITE_KEY as string;

  const handleSubmit = useCallback(
    async (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault();

      setErrorMessage('');
      setSuccessMessage('');

      const form = event.currentTarget;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (!captchaToken) {
        setErrorMessage('Completá la verificación CAPTCHA.');
        return;
      }

      try {
        setIsSubmitting(true);

        const formData = new FormData(form);
        const payload = buildLoginPayload(formData, captchaToken);

        const data = await loginUser(payload);

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        window.dispatchEvent(new Event('auth-change'));

        setSuccessMessage('¡Inicio de sesión exitoso!');

        const role = data.user?.role?.trim().toLowerCase();
        const redirectPath = role === 'admin' ? '/admin' : '/user';

        navigate(redirectPath, { replace: true });
      } catch (error) {
        console.error(error);

        setErrorMessage(
          error instanceof Error
            ? error.message
            : 'Error al iniciar sesión',
        );

        setCaptchaToken('');
      } finally {
        setIsSubmitting(false);
      }
    },
    [captchaToken, navigate],
  );

  return (
    <main id="mainContent" className="main-wrapper position-relative">
      <div className="login-overlay" />

      <section className="login-shell container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <div className="login-card shadow-lg">

              {/* HEADER (igual estilo Register) */}
              <div className="login-header text-center">
                <img
                  src={new URL('../../assets/img/icons/logo.png', import.meta.url).href}
                  alt="FigusApp"
                  className="login-logo img-fluid"
                />

                <h1 className="login-title mb-2">
                  Iniciar sesión
                </h1>

                <p className="login-subtitle mb-0">
                  Accedé a tu cuenta para seguir coleccionando, intercambiando y descubriendo figuritas.
                </p>

                {errorMessage && (
                  <p className="text-danger mt-3 mb-0">{errorMessage}</p>
                )}

                {successMessage && (
                  <p className="text-success mt-3 mb-0">{successMessage}</p>
                )}
              </div>

              {/* BODY */}
              <div className="login-body">
                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="row g-3">

                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>

                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control login-input"
                        placeholder="usuario@gmail.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>

                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control login-input"
                        placeholder="Tu contraseña"
                        autoComplete="current-password"
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
                        className="btn login-btn w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                      </button>
                    </div>

                    <div className="col-12 text-center pt-2">
                      <button
                        type="button"
                        className="btn btn-link login-link p-0"
                        onClick={() => setShowForgotModal(true)}
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>

                    <div className="col-12 text-center">
                      <p className="mb-0">
                        ¿No tenés una cuenta?{' '}
                        <Link to="/register" className="login-link">
                          Crear cuenta
                        </Link>
                      </p>
                    </div>

                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </section>

      {showForgotModal && (
        <div className="modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="login-card forgot-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              type="button"
              onClick={() => setShowForgotModal(false)}
            >
              ×
            </button>

            <h3 className="modal-title">Restablecer contraseña</h3>

            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              className="form-control login-input"
              placeholder="tu@email.com"
            />

            {forgotError && (
              <p className="error-message mt-2">{forgotError}</p>
            )}

            <button
              type="button"
              className="btn login-btn w-100 mt-3"
              onClick={() => {}}
            >
              Enviar enlace
            </button>
          </div>
        </div>
      )}
    </main>
  );
};