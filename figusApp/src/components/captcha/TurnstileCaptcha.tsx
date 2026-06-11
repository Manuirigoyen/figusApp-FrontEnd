import { useEffect, useRef, useState } from 'react';

import { TurnstileService } from './services/TurnstileService';

export interface TurnstileCaptchaProps {
  siteKey: string;
  onTokenChange?: (token: string) => void;
  className?: string;
  label?: string;
}

/**
 * Reusable Cloudflare Turnstile CAPTCHA component.
 * Handles CAPTCHA rendering and token management with automatic cleanup.
 *
 * @param {TurnstileCaptchaProps} props - Component props.
 * @param {string} props.siteKey - The Turnstile site key.
 * @param {function} [props.onTokenChange] - Callback fired when token changes or expires.
 * @param {string} [props.className] - Custom CSS class for the wrapper.
 * @param {string} [props.label="Verificación"] - Label text for the CAPTCHA.
 * @returns {JSX.Element} The Turnstile CAPTCHA component.
 */
export const TurnstileCaptcha = ({
  siteKey,
  onTokenChange,
  className,
  label = 'Verificación',
}: TurnstileCaptchaProps) => {
  const captchaRef =
    useRef<HTMLDivElement | null>(null);

  const widgetIdRef =
    useRef<string | null>(null);

  const onTokenChangeRef =
    useRef(onTokenChange);

  const [status, setStatus] = useState<
    'idle' | 'ok' | 'error'
  >('idle');

  useEffect(() => {
    onTokenChangeRef.current =
      onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    let cancelled = false;

    const mount = async () => {
      try {
        if (
          !captchaRef.current ||
          widgetIdRef.current ||
          captchaRef.current
            .childElementCount > 0
        ) {
          return;
        }

        const widgetId =
          await TurnstileService.render(
            captchaRef.current,
            {
              sitekey: siteKey,
              theme: 'light',
              size: 'normal',

              callback: (
                token: string,
              ) => {
                if (cancelled) {
                  return;
                }

                setStatus('ok');

                onTokenChangeRef.current?.(
                  token,
                );
              },

              'expired-callback':
                () => {
                  if (cancelled) {
                    return;
                  }

                  setStatus('idle');

                  onTokenChangeRef.current?.(
                    '',
                  );
                },

              'error-callback':
                () => {
                  if (cancelled) {
                    return;
                  }

                  setStatus('error');

                  onTokenChangeRef.current?.(
                    '',
                  );
                },
            },
          );

        widgetIdRef.current = widgetId;
      } catch {
        if (cancelled) {
          return;
        }

        setStatus('error');
      }
    };

    mount();

    return () => {
      cancelled = true;

      if (widgetIdRef.current) {
        TurnstileService.remove(
          widgetIdRef.current,
        );

        widgetIdRef.current = null;
      }
    };
  }, [siteKey]);

  return (
    <div
      className={
        className ??
        'register-captcha-wrap'
      }
    >
      <label className="form-label mb-2">
        {label}
      </label>

      <div
        ref={captchaRef}
        className="register-captcha-host"
      />

      <p
        className={`register-captcha-status ${
          status === 'ok'
            ? 'is-ok'
            : status === 'error'
              ? 'is-error'
              : ''
        }`}
      >
        {status === 'ok'
          ? 'Verificación completada'
          : status === 'error'
            ? 'No se pudo cargar la verificación'
            : 'Completá la verificación para continuar'}
      </p>
    </div>
  );
};