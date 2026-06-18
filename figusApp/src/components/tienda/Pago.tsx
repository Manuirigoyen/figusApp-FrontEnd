import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTienda } from './hooks/useTienda';
import { ROUTES } from '../../routes/constants/routes.constants';
import { TurnstileCaptcha } from '../captcha/TurnstileCaptcha';
import '../login/login.css'; 

export const Pago: React.FC = () => {
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState('');
  const { carrito, compraInmediata, vaciarCarrito, totalCarrito, calcularPrecioFinal } = useTienda();
  
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

  const montoAPagar = compraInmediata 
    ? calcularPrecioFinal(compraInmediata.producto) * compraInmediata.cantidad 
    : totalCarrito;

  useEffect(() => {
    if (!compraInmediata && carrito.length === 0) {
      navigate(ROUTES.TIENDA);
    }
  }, [compraInmediata, carrito, navigate]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captchaToken) {
      alert("Por favor, completa la verificación CAPTCHA");
      return;
    }
    alert("Pago procesado con éxito.");
    vaciarCarrito();
    navigate(ROUTES.BILLETERA);
  };

  return (
    <main id="mainContent" className="main-wrapper position-relative">
      <div className="login-overlay" />

      <section className="login-shell container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-11 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
            <div className="login-card shadow-lg">
              
              <div className="login-header text-center">
                <img src={new URL('../../assets/img/icons/logo.png', import.meta.url).href} alt="FigusApp" className="login-logo img-fluid" />
                <h1 className="login-title mb-2">Finalizar Pago</h1>
                <p className="login-subtitle">Completá tus datos para procesar la compra.</p>
              </div>

              <div className="login-body">
                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Titular de la tarjeta</label>
                      <input type="text" className="form-control login-input" placeholder="Nombre completo" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Número de tarjeta</label>
                      <input type="text" className="form-control login-input" maxLength={16} placeholder="0000 0000 0000 0000" required />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Vencimiento</label>
                      <input type="text" className="form-control login-input" placeholder="MM/AA" required />
                    </div>
                    <div className="col-6">
                      <label className="form-label">CVV</label>
                      <input type="text" className="form-control login-input" maxLength={3} placeholder="123" required />
                    </div>

                    <div className="col-12 pt-2">
                      <TurnstileCaptcha siteKey={turnstileSiteKey} onTokenChange={setCaptchaToken} />
                    </div>

                    <div className="col-12 pt-2">
                      <button type="submit" className="btn login-btn w-100">
                        Pagar USD {montoAPagar.toFixed(2)}
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