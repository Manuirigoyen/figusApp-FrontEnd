import { afterEach, describe, expect, it, vi } from 'vitest';

describe('resolveImageUrl', () => {
  afterEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it('devuelve imagen default cuando no hay path', async () => {
    vi.stubEnv('VITE_API_BASE', 'http://localhost:3000/api/v1');
    const { resolveImageUrl } = await import('./resolveImageUrl');

    expect(resolveImageUrl()).toBe('/assets/img/db/users/fotoPerfilDefault.png');
    expect(resolveImageUrl(null)).toBe('/assets/img/db/users/fotoPerfilDefault.png');
  });

  it('devuelve URLs absolutas sin modificar', async () => {
    vi.stubEnv('VITE_API_BASE', 'http://localhost:3000/api/v1');
    const { resolveImageUrl } = await import('./resolveImageUrl');

    expect(resolveImageUrl('https://cdn.com/avatar.png')).toBe('https://cdn.com/avatar.png');
  });

  it('resuelve paths relativos contra la base de la API sin /api/v1', async () => {
    vi.stubEnv('VITE_API_BASE', 'http://localhost:3000/api/v1');
    const { resolveImageUrl } = await import('./resolveImageUrl');

    expect(resolveImageUrl('/uploads/user.png')).toBe('http://localhost:3000/uploads/user.png');
    expect(resolveImageUrl('uploads/user.png')).toBe('http://localhost:3000/uploads/user.png');
  });
});
