import { useState, type SyntheticEvent } from 'react';
import './footer.css';

import { TurnstileCaptcha } from '../captcha/TurnstileCaptcha';
import { buildContactPayload } from './utils/buildContactPayload';
import { sendContactForm } from './services/sendContactForm';

import { legalLinks } from './constants/legalLinks';
import { socialLinks } from './constants/socialLinks';
import { paymentMethods } from './constants/paymentMethods';
import { techLinks } from './constants/techLinks';

export const Footer = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isCaptchaVisible, setIsCaptchaVisible] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isCaptchaVisible) {
      setIsCaptchaVisible(true);
      return;
    }

    setErrorMessage('');
    setSuccessMessage('');

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!captchaToken) {
      setErrorMessage('Completá la verificación CAPTCHA para enviar la consulta.');
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData(form);
      const payload = buildContactPayload(formData, captchaToken);

      await sendContactForm(payload);

      setSuccessMessage('Consulta enviada correctamente.');
      form.reset();
      setCaptchaToken('');
      setCaptchaKey((current) => current + 1);
      setIsCaptchaVisible(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Ocurrió un error inesperado, por favor inténtalo nuevamente más tarde.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="footer" className="footer-section text-white pb-4 mt-0">
      <div className="container">
        <div className="row gy-4 justify-content-between">
          <div className="col-lg-4 col-md-6">
            <h6 className="footer-heading app-heading">Legal</h6>
            <ul className="list-unstyled mt-2 footer-list">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="footer-link" aria-label={item.ariaLabel}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <h6 className="footer-heading app-heading mt-4">Contáctanos</h6>
            <p className="mb-1">
              📞 <a href="https://wa.me/5492983546783" className="footer-link" target="_blank" rel="noopener noreferrer">+54 9 2983 546783</a>
            </p>
            <p className="mb-3">
              📧 <a href="mailto:figusApp@gmail.com?subject=Consulta%20desde%20FigusApp" className="footer-link">figusApp@gmail.com</a>
            </p>

            <h6 className="footer-heading app-heading mt-4">Redes Sociales</h6>
            <div className="footer-socials">
              {socialLinks.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} title={item.title}>
                  <i className={item.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <form className="w-100 text-center footer-form" aria-labelledby="consultas-title" onSubmit={handleSubmit}>
              <h6 id="consultas-title" className="footer-heading app-heading text-center mb-3">Consultas</h6>

              {errorMessage && <p className="footer-feedback footer-feedback--error" aria-live="polite">{errorMessage}</p>}
              {successMessage && <p className="footer-feedback footer-feedback--success" aria-live="polite">{successMessage}</p>}

              <select name="contact_reason" className="form-select footer-control mb-2 w-100" required defaultValue="">
                <option value="" disabled>Motivo de la consulta</option>
                <option value="soporte">Soporte</option>
                <option value="compras">Problemas con compras</option>
                <option value="sugerencias">Sugerencias</option>
              </select>

              <input type="email" name="contact_email" className="form-control footer-control mb-2 w-100" placeholder="Tu correo" required autoComplete="email" />

              <textarea name="contact_message" className="form-control footer-control mb-2 w-100" rows={3} placeholder="Escribe tu consulta..." required minLength={10} maxLength={1000} />

              {isCaptchaVisible && (
                <div className="captcha-wrapper mx-auto">
                  <TurnstileCaptcha key={captchaKey} siteKey={turnstileSiteKey} onTokenChange={setCaptchaToken} label="" />
                </div>
              )}

              <button className="btn btn-light w-100 fw-bold mt-1 footer-submit-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : isCaptchaVisible ? 'Enviar' : 'Validar consulta'}
              </button>
            </form>
          </div>

          <div className="col-lg-4 col-md-12 footer-right">
            <div className="text-end footer-block">
              <h6 className="footer-heading app-heading">Métodos de Pago</h6>
              <div className="footer-payments mt-4">
                {paymentMethods.map((method) => (
                  <div key={method.alt} className="p-1">
                    <a href={method.link} target="_blank" rel="noopener noreferrer" aria-label={`Pagar con ${method.alt}`} className="payment-item">
                      <img src={method.img} alt={method.alt} width="45" height="30" className="img-fluid" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-end footer-block">
              <h6 className="footer-heading app-heading">Tecnologías utilizadas</h6>
              <div className="tech-icons mt-4">
                {techLinks.map((tech) => (
                  <a key={tech.href} href={tech.href} target="_blank" rel="noopener noreferrer" aria-label={tech.label} title={tech.label}>
                    <img src={tech.img} alt={tech.alt} width="32" height="32" />
                  </a>
                ))}
              </div>
              <p className="footer-copyright">© 2025 - Actualidad | FigusApp</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};