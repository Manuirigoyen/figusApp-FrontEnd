import { useState, type SyntheticEvent } from 'react';
import './footer.css';

import { TurnstileCaptcha } from '../captcha/TurnstileCaptcha';
import { buildContactPayload } from './utils/buildContactPayload';
import { sendContactForm } from './services/sendContactForm';

/**
 * Componente Footer renderizado con información legal, contacto, formulario de consultas,
 * redes sociales y métodos de pago.
 */
export const Footer = () => {
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaKey, setCaptchaKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const turnstileSiteKey =
    import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

  const contactEndpoint =
    import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string;

  /**
   * Maneja el envío del formulario de consultas.
   */
  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!captchaToken) {
      setErrorMessage(
        'Completá la verificación CAPTCHA para enviar la consulta.',
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData(form);
      const payload = buildContactPayload(formData, captchaToken);

      await sendContactForm(payload, contactEndpoint);

      setSuccessMessage('Consulta enviada correctamente.');
      form.reset();
      setCaptchaToken('');
      setCaptchaKey((current) => current + 1);
    } catch (error) {
      console.error(error);

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
    <footer id="footer" className="bg-primary text-white p-4">
      <div className="container">
        <div className="row gy-4 justify-content-between">
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold mt-4">Legal</h6>
            {getDivLegales()}

            {getDivContacto()}

            <h6 className="fw-bold mt-4">Redes Sociales</h6>
            {getDivRedesSociales()}
          </div>

          <div className="col-lg-4 col-md-6">
            <form
              className="w-100 text-center"
              aria-labelledby="consultas-title"
              onSubmit={handleSubmit}
            >
              <h6 id="consultas-title" className="fw-bold text-center mb-3">
                Consultas
              </h6>

              {errorMessage && (
                <p className="text-warning mb-3" aria-live="polite">
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p className="text-success mb-3" aria-live="polite">
                  {successMessage}
                </p>
              )}

              <select
                name="contact_reason"
                className="form-select mb-2 w-100"
                required
                aria-label="Motivo de la consulta"
                defaultValue=""
              >
                <option value="" disabled>
                  Motivo de la consulta
                </option>
                <option value="soporte">Soporte</option>
                <option value="compras">Problemas con compras</option>
                <option value="sugerencias">Sugerencias</option>
              </select>

              <input
                type="email"
                name="contact_email"
                className="form-control mb-2 w-100"
                placeholder="Tu correo"
                required
                aria-label="Tu dirección de correo electrónico"
                autoComplete="email"
              />

              <textarea
                name="contact_message"
                className="form-control mb-2 w-100"
                rows={3}
                placeholder="Escribe tu consulta..."
                required
                aria-label="Escribe tu consulta aquí"
                minLength={10}
                maxLength={1000}
              />

              <div className="captcha-wrapper mx-auto">
                <TurnstileCaptcha
                  key={captchaKey}
                  siteKey={turnstileSiteKey}
                  onTokenChange={setCaptchaToken}
                  label="Verificación"
                />
              </div>

              <button
                className="btn btn-light w-100 fw-bold mt-1"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar'}
              </button>
            </form>
          </div>

          <div className="col-lg-4 col-md-12">
            {getMetodosDePago()}
            {getDivLenguages()}
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * Genera la lista de enlaces legales.
 */
const getDivLegales = () => (
  <ul className="list-unstyled mt-2">
    <li>
      <a
        href="https://en.wikipedia.org/wiki/Terms_of_service"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white text-decoration-none"
        aria-label="Términos de Servicio"
      >
        Términos de Servicio
      </a>
    </li>
    <li>
      <a
        href="https://es.wikipedia.org/wiki/Pol%C3%ADtica_de_privacidad"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white text-decoration-none"
        aria-label="Política de Privacidad"
      >
        Política de Privacidad
      </a>
    </li>
    <li>
      <a
        href="https://es.wikipedia.org/wiki/Cookie_(inform%C3%A1tica)"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white text-decoration-none"
        aria-label="Política de Cookies"
      >
        Política de Cookies
      </a>
    </li>
  </ul>
);

/**
 * Genera la sección de contacto.
 */
const getDivContacto = () => (
  <>
    <h6 className="fw-bold mt-4">Contáctanos</h6>
    <p className="mb-1">
      📞{' '}
      <a
        href="https://wa.me/5492983546783"
        className="text-white text-decoration-none"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp +54 9 2983 546783"
      >
        +54 9 2983 546783
      </a>
    </p>
    <p className="mb-3">
      📧{' '}
      <a
        href="mailto:figusApp@gmail.com?subject=Consulta%20desde%20FigusApp"
        className="text-white text-decoration-none"
        aria-label="Enviar email a FigusApp"
      >
        figusApp@gmail.com
      </a>
    </p>
  </>
);

/**
 * Genera los enlaces de redes sociales.
 */
const getDivRedesSociales = () => (
  <div className="d-flex gap-3 mt-3">
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white fs-4"
      aria-label="WhatsApp"
      title="WhatsApp"
    >
      <i className="bi bi-whatsapp" />
    </a>
    <a
      href="https://www.instagram.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white fs-4"
      aria-label="Instagram"
      title="Instagram"
    >
      <i className="bi bi-instagram" />
    </a>
    <a
      href="https://www.facebook.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white fs-4"
      aria-label="Facebook"
      title="Facebook"
    >
      <i className="bi bi-facebook" />
    </a>
    <a
      href="mailto:figusApp@gmail.com"
      className="text-white fs-4"
      aria-label="Email"
      title="Enviar email"
    >
      <i className="bi bi-envelope" />
    </a>
    <a
      href="https://www.linkedin.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white fs-4"
      aria-label="LinkedIn"
      title="LinkedIn"
    >
      <i className="bi bi-linkedin" />
    </a>
  </div>
);

/**
 * Genera la sección de métodos de pago.
 */
const getMetodosDePago = () => (
  <div className="text-end mt-4">
    <h6 className="fw-bold">Métodos de Pago</h6>

    <div className="row g-0 justify-content-end mt-4">
      {getPagoItem(
        'https://www.visa.com',
        new URL(
          '../../assets/img/icons/footer/visa.jpeg',
          import.meta.url,
        ).href,
        'Visa',
      )}
      {getPagoItem(
        'https://www.mastercard.com',
        new URL(
          '../../assets/img/icons/footer/master.jpeg',
          import.meta.url,
        ).href,
        'Mastercard',
      )}
      {getPagoItem(
        'https://www.pagofacil.com.ar/',
        new URL(
          '../../assets/img/icons/footer/pagoFacil.jpeg',
          import.meta.url,
        ).href,
        'Pago Fácil',
      )}
      {getPagoItem(
        'https://www.rapipago.com.ar',
        new URL(
          '../../assets/img/icons/footer/rapiPago.jpeg',
          import.meta.url,
        ).href,
        'Rapi Pago',
      )}
    </div>

    <div className="row g-0 justify-content-end">
      {getPagoItem(
        'https://www.naranja.com',
        new URL(
          '../../assets/img/icons/footer/naranja.jpeg',
          import.meta.url,
        ).href,
        'Naranja X',
      )}
      {getPagoItem(
        'https://www.diner.com.ar',
        new URL(
          '../../assets/img/icons/footer/diner.jpeg',
          import.meta.url,
        ).href,
        'Diner',
      )}
      {getPagoItem(
        'https://www.cenco.com.ar',
        new URL(
          '../../assets/img/icons/footer/cenco.jpeg',
          import.meta.url,
        ).href,
        'Cenco',
      )}
      {getPagoItem(
        'https://www.america.com.ar',
        new URL(
          '../../assets/img/icons/footer/america.jpeg',
          import.meta.url,
        ).href,
        'America',
      )}
    </div>
  </div>
);

/**
 * Genera un logo individual de método de pago.
 */
const getPagoItem = (
  link: string,
  img: string,
  alt: string,
) => (
  <div className="col-auto p-1">
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Pagar con ${alt}`}
    >
      <img
        src={img}
        alt={alt}
        width="45"
        height="30"
        className="img-fluid"
      />
    </a>
  </div>
);

/**
 * Genera la sección de tecnologías utilizadas.
 */
const getDivLenguages = () => (
  <div className="text-end pt-4">
    <div>
      <h6 className="fw-bold">Tecnologías utilizadas</h6>
    </div>

    <div className="d-flex gap-3 mt-4 justify-content-end">
      <a
        href="https://react.dev/reference/react"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Documentación React"
      >
        <img
          src={new URL(
            '../../assets/img/icons/footer/react.png',
            import.meta.url,
          ).href}
          alt="React"
          width="32"
          height="32"
        />
      </a>

      <a
        href="https://getbootstrap.com/docs/5.3/getting-started/introduction/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Documentación Bootstrap"
      >
        <img
          src={new URL(
            '../../assets/img/icons/footer/bootstrap.png',
            import.meta.url,
          ).href}
          alt="Bootstrap"
          width="32"
          height="32"
        />
      </a>

      <a
        href="https://docs.nestjs.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Documentación Nest JS"
      >
        <img
          src={new URL(
            '../../assets/img/icons/footer/nestJS.png',
            import.meta.url,
          ).href}
          alt="Nest JS"
          width="32"
          height="32"
        />
      </a>

      <a
        href="https://developers.cloudflare.com/turnstile/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Documentación Cloudflare Turnstile"
      >
        <img
          src={new URL(
            '../../assets/img/icons/footer/reCaptcha.png',
            import.meta.url,
          ).href}
          alt="Turnstile"
          width="32"
          height="32"
        />
      </a>
    </div>

    <p className="small mt-4 text-end">© 2025 - Actualidad | FigusApp</p>
  </div>
);