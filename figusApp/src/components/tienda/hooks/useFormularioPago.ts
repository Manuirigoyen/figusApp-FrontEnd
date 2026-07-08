import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTienda } from './useTienda';
import { useAuth } from '../../../routes/hooks/useAuth';
import { ROUTES } from '../../../routes/constants/routes.constants';
import { purchasesService } from '../services/purchasesService';
import { acreditarGiros } from '../services/spinsWalletService';
import type { ItemCarrito } from '../types/productos.data';

export const useFormularioPago = () => {
  const navigate = useNavigate();
  const { user, refreshSpins } = useAuth();

  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [isCaptchaVisible, setIsCaptchaVisible] = useState<boolean>(false);
  const [captchaKey, setCaptchaKey] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    carrito,
    compraInmediata,
    vaciarCarrito,
    totalCarrito,
    calcularPrecioFinal,
    verificarDescuentoActivo
  } = useTienda();

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

  const montoAPagar = compraInmediata
    ? calcularPrecioFinal(compraInmediata.producto) * compraInmediata.cantidad
    : totalCarrito;

  useEffect(() => {
    if (!compraInmediata && carrito.length === 0) {
      navigate(ROUTES.TIENDA);
    }
  }, [compraInmediata, carrito, navigate]);

  const enviarFormulario = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!isCaptchaVisible) {
      setIsCaptchaVisible(true);
      return;
    }

    if (!captchaToken) {
      alert("Por favor, completa la verificación CAPTCHA");
      return;
    }

    if (!user?.id) {
      alert("No se pudo identificar al usuario autenticado. Reintenta iniciar sesión.");
      return;
    }

    setIsSubmitting(true);

    try {
      const productosAComprar: ItemCarrito[] = compraInmediata
        ? [compraInmediata]
        : carrito;

      await purchasesService.registrarCompras(productosAComprar, user.id, verificarDescuentoActivo);

      for (const item of productosAComprar) {
        if (item.producto.product_type === 'combo' && item.producto.comboItems) {
          const totalGirosCombo = item.producto.comboItems.reduce(
            (acc, combo) => acc + (combo.spin_quantity || 0), 0
          );

          if (totalGirosCombo > 0) {
            await acreditarGiros({
              user_id: user.id,
              spins: totalGirosCombo * item.cantidad
            });
          }
        }
        else if (item.producto.product_type === 'spin') {
          await acreditarGiros({
            user_id: user.id,
            spins: 1 * item.cantidad
          });
        }
      }

      await refreshSpins();

      alert("Pago procesado con éxito y giros acreditados.");
      vaciarCarrito();
      setCaptchaToken('');
      setCaptchaKey((current) => current + 1);
      setIsCaptchaVisible(false);
      navigate(ROUTES.BILLETERA);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Hubo un problema al procesar tu pago.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    montoAPagar,
    isSubmitting,
    isCaptchaVisible,
    captchaKey,
    turnstileSiteKey,
    setCaptchaToken,
    enviarFormulario,
  };
};