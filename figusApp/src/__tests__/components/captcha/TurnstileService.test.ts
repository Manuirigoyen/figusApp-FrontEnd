import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TurnstileService } from './../../../components/captcha/services/TurnstileService'; // 🌟 Usa siempre la ruta relativa correcta

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

describe('TurnstileService', () => {
  beforeEach(() => {
    // Limpiamos el DOM antes de cada test
    document.head.innerHTML = '';
    delete window.turnstile;
  });

  afterEach(() => {
    vi.resetModules();
    // Forzamos la limpieza de la variable "loadPromise" reiniciando el estado del módulo alternativo si fuera necesario
    // Pero al usar vi.resetModules() y re-importar dinámicamente de forma limpia es más seguro:
  });

  it('load resuelve inmediatamente si turnstile ya está disponible', async () => {
    window.turnstile = {
      render: vi.fn(),
      remove: vi.fn(),
    };

    await expect(TurnstileService.load()).resolves.toBeUndefined();
    expect(document.querySelector(`script[src="${TURNSTILE_SRC}"]`)).toBeNull();
  });

  it('load agrega el script oficial cuando no existe', async () => {
    // Forzamos un módulo limpio para que 'loadPromise' sea nulo al inicio de este test específico
    const { TurnstileService: CleanService } = await import('./../../../components/captcha/services//TurnstileService');

    const promise = CleanService.load();
    const script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);

    expect(script).not.toBeNull();
    expect(script?.async).toBe(true);
    expect(script?.defer).toBe(true);

    // Simulamos la carga exitosa del script
    script?.dispatchEvent(new Event('load'));

    await expect(promise).resolves.toBeUndefined();
  });

  it('render carga el servicio y delega en window.turnstile.render', async () => {
    window.turnstile = {
      render: vi.fn(() => 'widget-id'),
      remove: vi.fn(),
    };

    const container = document.createElement('div');
    const options = { sitekey: 'site-key' };

    await expect(TurnstileService.render(container, options)).resolves.toBe('widget-id');
    expect(window.turnstile.render).toHaveBeenCalledWith(container, options);
  });

  it('render lanza error si Turnstile no queda disponible', async () => {
    const { TurnstileService: CleanService } = await import('./../../../components/captcha/services//TurnstileService');
    
    const promise = CleanService.render(document.createElement('div'), { sitekey: 'site-key' });
    
    // Al ejecutarse render(), éste llama a load() internamente creando el script en el DOM
    const script = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    
    // Provocamos la carga del script, pero dejamos window.turnstile como undefined adrede
    script?.dispatchEvent(new Event('load'));

    await expect(promise).rejects.toThrow('Turnstile no disponible');
  });

  it('remove delega en window.turnstile.remove', async () => {
    window.turnstile = {
      render: vi.fn(),
      remove: vi.fn(),
    };

    TurnstileService.remove('widget-id');

    expect(window.turnstile.remove).toHaveBeenCalledWith('widget-id');
  });
});