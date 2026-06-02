import { afterEach, describe, expect, it, vi } from 'vitest';

const TURNSTILE_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

declare global {
  interface Window {
    turnstile?: {
      render: ReturnType<typeof vi.fn>;
      remove: ReturnType<typeof vi.fn>;
    };
  }
}

describe('TurnstileService', () => {
  afterEach(() => {
    vi.resetModules();
    document.head.innerHTML = '';
    delete window.turnstile;
  });

  it('load resuelve inmediatamente si turnstile ya está disponible', async () => {
    window.turnstile = {
      render: vi.fn(),
      remove: vi.fn(),
    };

    const { TurnstileService } = await import('./TurnstileService');

    await expect(TurnstileService.load()).resolves.toBeUndefined();
    expect(document.querySelector(`script[src="${TURNSTILE_SRC}"]`)).toBeNull();
  });

  it('load agrega el script oficial cuando no existe', async () => {
    const { TurnstileService } = await import('./TurnstileService');

    const promise = TurnstileService.load();
    const script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);

    expect(script).not.toBeNull();
    expect(script?.async).toBe(true);
    expect(script?.defer).toBe(true);

    script?.dispatchEvent(new Event('load'));

    await expect(promise).resolves.toBeUndefined();
  });

  it('render carga el servicio y delega en window.turnstile.render', async () => {
    window.turnstile = {
      render: vi.fn(() => 'widget-id'),
      remove: vi.fn(),
    };

    const { TurnstileService } = await import('./TurnstileService');
    const container = document.createElement('div');
    const options = { sitekey: 'site-key' };

    await expect(TurnstileService.render(container, options)).resolves.toBe('widget-id');
    expect(window.turnstile.render).toHaveBeenCalledWith(container, options);
  });

  it('render lanza error si Turnstile no queda disponible', async () => {
    const { TurnstileService } = await import('./TurnstileService');

    const promise = TurnstileService.render(document.createElement('div'), { sitekey: 'site-key' });
    document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`)?.dispatchEvent(new Event('load'));

    await expect(promise).rejects.toThrow('Turnstile no disponible');
  });

  it('remove delega en window.turnstile.remove', async () => {
    window.turnstile = {
      render: vi.fn(),
      remove: vi.fn(),
    };

    const { TurnstileService } = await import('./TurnstileService');

    TurnstileService.remove('widget-id');

    expect(window.turnstile.remove).toHaveBeenCalledWith('widget-id');
  });
});
