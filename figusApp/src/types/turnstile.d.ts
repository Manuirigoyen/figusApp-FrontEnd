import type { TurnstileRenderOptions } from '../components/captcha/services/TurnstileService';

export {};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: TurnstileRenderOptions
      ) => string;
      remove: (widgetId: string) => void;
    };
  }
}