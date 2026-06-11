import { useCallback, useState } from 'react';
import type { SubmitEvent } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { TurnstileCaptcha } from '../captcha/TurnstileCaptcha';

import { buildLoginPayload } from './utils/buildLoginPayload';
import { loginUser } from './services/LoginUser';

import { useAuth } from '../../routes/AuthContext';

import './login.css';

export const Login = () => {
  const [captchaToken, setCaptchaToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [isForgotSubmitting, setIsForgotSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

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

        const loggedUser = data.user ?? data;

        localStorage.setItem('user', JSON.stringify(loggedUser));

        login({
          id: loggedUser.id,
          role: loggedUser.role,
        });

        setSuccessMessage('Inicio de sesión correcto');

        const role = loggedUser.role?.trim().toLowerCase();
        const redirectPath = role === 'admin' ? '/admin' : '/user';

        navigate(redirectPath, { replace: true });
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : 'Error al iniciar sesión',
        );
        setCaptchaToken('');
      } finally {
        setIsSubmitting(false);
      }
    },
    [captchaToken, login, navigate],
  );

  const handleForgotPassword = async () => {
    setForgotError('');

    if (!forgotEmail.trim()) {
      setForgotError('Ingresá un email válido');
      return;
    }

    try {
      setIsForgotSubmitting(true);

      await fetch(`${import.meta.env.VITE_API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      setShowForgotModal(false);
      setForgotEmail('');
    } catch {
      setForgotError('No se pudo enviar el enlace');
    } finally {
      setIsForgotSubmitting(false);
    }
  };

  return (
    <main id="mainContent" className="main-wrapper position-relative">
      <div className="login-overlay" />

      <section className="login-shell container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <div className="login-card shadow-lg">
              <div className="login-header text-center">
                <img
                  src={
                    new URL(
                      '../../assets/img/icons/logo.png',
                      import.meta.url,
                    ).href
                  }
                  alt="FigusApp"
                  className="login-logo img-fluid"
                />

                <h1 className="login-title mb-2">Iniciar sesión</h1>

                <p className="login-subtitle mb-0">
                  Accedé a tu cuenta para continuar.
                </p>

                {errorMessage && (
                  <p className="text-danger mt-3">{errorMessage}</p>
                )}

                {successMessage && (
                  <p className="text-success mt-3">{successMessage}</p>
                )}
              </div>

              <div className="login-body">
                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control login-input"
                        placeholder="usuario@gmail.com"
                        autoComplete="email"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Contraseña</label>
                      <input
                        type="password"
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
                        ¿No tenés cuenta?{' '}
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
        <div
          className="modal-overlay"
          onClick={() => setShowForgotModal(false)}
        >
          <div
            className="login-card forgot-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
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
              placeholder="user@email.com"
            />

            {forgotError && (
              <p className="error-message mt-2">{forgotError}</p>
            )}

            <button
              type="button"
              className="btn login-btn w-100 mt-3"
              onClick={handleForgotPassword}
              disabled={isForgotSubmitting}
            >
              Enviar enlace
            </button>
          </div>
        </div>
      )}
    </main>
  );
};