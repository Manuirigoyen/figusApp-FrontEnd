/**
 * URL del script oficial de
 * Cloudflare Turnstile.
 */
const TURNSTILE_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

/**
 * Tema visual del widget Turnstile.
 */
export type TurnstileTheme =
  | 'light'
  | 'dark'
  | 'auto';

/**
 * Tamaño visual del widget Turnstile.
 */
export type TurnstileSize =
  | 'normal'
  | 'compact'
  | 'flexible';

/**
 * Opciones soportadas al renderizar
 * el widget Turnstile.
 */
export interface TurnstileRenderOptions {
  sitekey: string;
  theme?: TurnstileTheme;
  size?: TurnstileSize;
  callback?: (token: string) => void;

  'error-callback'?: (
    errorCode: string | number,
  ) => void;

  'expired-callback'?: () => void;
}

let loadPromise:
  | Promise<void>
  | null = null;

/**
 * Servicio encargado de cargar,
 * renderizar y limpiar Turnstile.
 */
export class TurnstileService {
  /**
   * Carga el script de Turnstile
   * una sola vez.
   */
  static load(): Promise<void> {
    if (window.turnstile) {
      return Promise.resolve();
    }

    if (loadPromise) {
      return loadPromise;
    }

    loadPromise = new Promise(
      (resolve, reject) => {
        const existing =
          document.querySelector<HTMLScriptElement>(
            `script[src="${TURNSTILE_SRC}"]`,
          );

        if (existing) {
          if (window.turnstile) {
            resolve();

            return;
          }

          existing.addEventListener(
            'load',
            () => resolve(),
            { once: true },
          );

          existing.addEventListener(
            'error',
            () =>
              reject(
                new Error(
                  'Turnstile script error',
                ),
              ),
            { once: true },
          );

          return;
        }

        const script =
          document.createElement(
            'script',
          );

        script.src = TURNSTILE_SRC;
        script.async = true;
        script.defer = true;

        script.onload = () =>
          resolve();

        script.onerror = () =>
          reject(
            new Error(
              'Turnstile script failed to load',
            ),
          );

        document.head.appendChild(
          script,
        );
      },
    );

    return loadPromise;
  }

  /**
   * Renderiza el widget dentro
   * del contenedor indicado.
   */
  static async render(
    container: HTMLElement,
    options: TurnstileRenderOptions,
  ): Promise<string> {
    await this.load();

    if (!window.turnstile) {
      throw new Error(
        'Turnstile no disponible',
      );
    }

    return window.turnstile.render(
      container,
      options,
    );
  }

  /**
   * Elimina el widget renderizado.
   */
  static remove(
    widgetId: string,
  ): void {
    window.turnstile?.remove(
      widgetId,
    );
  }
}