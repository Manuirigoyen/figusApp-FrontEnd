import React from 'react';
import { TurnstileCaptcha } from '../captcha/TurnstileCaptcha';
import { useFormularioPago } from './hooks/useFormularioPago';
import '../login/login.css';

export const Pago: React.FC = () => {
  const {
    montoAPagar,
    isSubmitting,
    isCaptchaVisible,
    captchaKey,
    turnstileSiteKey,
    setCaptchaToken,
    enviarFormulario,
  } = useFormularioPago();

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
                <form className="login-form" onSubmit={enviarFormulario}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Titular de la tarjeta</label>
                      <input type="text" className="form-control login-input" placeholder="Nombre completo" required disabled={isSubmitting} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">DNI del titular</label>
                      <input type="text" className="form-control login-input" placeholder="Número de documento" required disabled={isSubmitting} />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Número de tarjeta</label>
                      <input type="text" className="form-control login-input" maxLength={16} placeholder="0000 0000 0000 0000" required disabled={isSubmitting} />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Vencimiento</label>
                      <div className="d-flex gap-2">
                        <input type="text" className="form-control login-input text-center" maxLength={2} placeholder="Mes" required disabled={isSubmitting} />
                        <input type="text" className="form-control login-input text-center" maxLength={2} placeholder="Año" required disabled={isSubmitting} />
                      </div>
                    </div>
                    <div className="col-6">
                      <label className="form-label">CVV</label>
                      <input type="text" className="form-control login-input" maxLength={3} placeholder="123" required disabled={isSubmitting} />
                    </div>

                    {isCaptchaVisible && (
                      <div className="col-12 pt-2">
                        <TurnstileCaptcha key={captchaKey} siteKey={turnstileSiteKey} onTokenChange={setCaptchaToken} />
                      </div>
                    )}

                    <div className="col-12 pt-2">
                      <button type="submit" className="btn login-btn w-100" disabled={isSubmitting}>
                        {isSubmitting ? 'Procesando Pago...' : isCaptchaVisible ? `Pagar ARS ${montoAPagar.toFixed(2)}` : 'Verificar Pago'}
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