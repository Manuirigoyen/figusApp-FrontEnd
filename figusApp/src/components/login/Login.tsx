// src/components/login/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Turnstile } from '@marsidev/react-turnstile';
import './Login.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileVerified, setTurnstileVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Estados para "Olvidé mi contraseña"
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [sentToEmail, setSentToEmail] = useState('');

  const validEmails = ['manuirigoyen@hotmail.com', 'alexmartin9c@gmail.com'];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setMessage('');

    if (!email ||!password) {
      setError('Por favor, ingresa tu email y contraseña.');
      return;
    }

    if (!email.includes('@')) {
      setError('Por favor, ingresa un email válido.');
      return;
    }

    if (!turnstileToken) {
      setError('Completá la verificación para continuar');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const response = await fetch('http://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          captcha_token: turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Email o contraseña incorrectos.');
      }

      // Guardás el token JWT
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setMessage('¡Inicio de sesión exitoso!');

      // Redirigís al user o admin segun el rol
      setTimeout(() => {
        navigate('/user');
      }, 1000);

      setEmail('');
      setPassword('');
      setTurnstileToken(null);
      setTurnstileVerified(false);

    } catch (err) {
      setError(err instanceof Error? err.message : 'Error al iniciar sesión');
      setTurnstileToken(null);
      setTurnstileVerified(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForgotModal(true);
    setForgotError('');
    setForgotEmail(email);
  };

  const handleSendResetEmail = () => {
    setForgotError('');

    if (!forgotEmail ||!forgotEmail.includes('@')) {
      setForgotError('Ingresá un email válido.');
      return;
    }

    if (validEmails.includes(forgotEmail.toLowerCase())) {
      setSentToEmail(forgotEmail);
      setShowForgotModal(false);
      setShowSuccessModal(true);
    } else {
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

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img
            src="src/assets/img/icons/logo.png"
            alt="FigusApp Logo"
          />
        </div>
        <h2 className="login-title">Inicia Sesión</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <div className="turnstile-container">
            <label>Verificación</label>
            <Turnstile
              siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
              onSuccess={(token) => {
                setTurnstileToken(token);
                setTurnstileVerified(true);
                setError('');
              }}
              onError={() => {
                setTurnstileToken(null);
                setTurnstileVerified(false);
                setError('Error en la verificación. Recargá la página.');
              }}
              onExpire={() => {
                setTurnstileToken(null);
                setTurnstileVerified(false);
              }}
              options={{
                size: 'flexible',
                theme: 'light'
              }}
            />
            {turnstileVerified? (
              <p className="turnstile-status success">Verificación completada</p>
            ) : (
              <p className="turnstile-status">Completá la verificación para continuar</p>
            )}
          </div>

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          <p className="forgot-password-link">
            <a href="#" onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</a>
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
    </div>
  );
};