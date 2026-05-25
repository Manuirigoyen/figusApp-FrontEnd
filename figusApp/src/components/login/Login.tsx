// src/components/login/Login.tsx
import { useCallback, useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { TurnstileCaptcha } from '../captcha/TurnstileCaptcha';
import { buildLoginPayload } from './utils/buildLoginPayload';
import { loginUser } from './services/LoginUser';
import { useUserProfile } from '../user/hooks/useUserProfile'; // <- Import nuevo

import './Login.css';

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
  const { user, isLoading } = useUserProfile(); // <- Hook nuevo

  // Redirigir si ya está logueado
  useEffect(() => {
    if (!isLoading && user) {
      navigate(user.role === 'admin' ? '/admin' : '/user');
    }
  }, [user, isLoading, navigate]);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
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

        setSuccessMessage('¡Inicio de sesión exitoso!');

        setTimeout(() => {
          navigate(data.user.role === 'admin' ? '/admin' : '/user');
        }, 1000);

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

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForgotModal(true);
    setForgotError('');
  };

  const handleSendResetEmail = async () => {
    setForgotError('');

    if (!forgotEmail || !forgotEmail.includes('@')) {
      setForgotError('Ingresá un email válido.');
      return;
    }

    try {
      setSentToEmail(forgotEmail);
      setShowForgotModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      setForgotError('No encontramos una cuenta con ese email.');
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSentToEmail('');
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setForgotError('');
    setForgotEmail('');
  };

  // Evitar flash del form si ya está logueado
  if (isLoading) return <div className="text-center p-5">Cargando...</div>;
  if (user) return null;

  return (
    <main className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img
            src={new URL('../../assets/img/icons/logo.png', import.meta.url).href}
            alt="FigusApp Logo"
          />
        </div>
        <h2 className="login-title">Inicia Sesión</h2>

        {errorMessage && (
          <p className="error-message">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="tu@email.com"
              autoComplete="email"
              maxLength={120}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Contraseña"
              autoComplete="current-password"
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

          <button 
            type="submit" 
            className="login-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          <p className="forgot-password-link">
            <a href="#" onClick={handleForgotPassword}>
              ¿Olvidaste tu contraseña?
            </a>
          </p>
        </form>

        <div className="register-section">
          <p>
            ¿No tenes una cuenta?{' '}
            <Link to="/register" className="create-account-link">
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>

      {showForgotModal && (
        <div className="modal-overlay" onClick={closeForgotModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeForgotModal}>×</button>
            <h3>Restablecer contraseña</h3>
            <p>Ingresá el email de tu cuenta y te enviaremos un enlace para restablecer tu contraseña.</p>
            <div className="form-group">
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="tu@email.com"
                autoFocus
              />
              {forgotError && <p className="error-message">{forgotError}</p>}
            </div>
            <button onClick={handleSendResetEmail} className="modal-button">
              Enviar enlace
            </button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay" onClick={handleCloseSuccessModal}>
          <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseSuccessModal}>×</button>
            <h3>Email sent</h3>
            <p>
              Hemos enviado un correo electrónico a <strong>{sentToEmail}</strong> con un enlace para que recuperes el acceso a tu cuenta.
            </p>
            <button onClick={handleCloseSuccessModal} className="modal-button">
              Aceptar
            </button>
          </div>
        </div>
      )}
    </main>
  );
};