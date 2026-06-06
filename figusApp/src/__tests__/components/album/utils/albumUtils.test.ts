import { describe, expect, it } from 'vitest';

import { calculateProgress, getProgressBarColor, isTeamComplete } from './../../../../components/album/utils/albumUtils';

describe('albumUtils', () => {
  it('calcula progreso redondeado', () => {
    expect(calculateProgress(10, 5)).toBe(50);
    expect(calculateProgress(3, 1)).toBe(33);
  });

  it('devuelve 0 si totalCards no es positivo', () => {
    expect(calculateProgress(0, 5)).toBe(0);
    expect(calculateProgress(-1, 5)).toBe(0);
  });

  it('elige color según porcentaje', () => {
    expect(getProgressBarColor(67)).toBe('#43a047');
    expect(getProgressBarColor(34)).toBe('#fdd835');
    expect(getProgressBarColor(33)).toBe('#e53935');
  });

  it('detecta equipo completo solo cuando completadas iguala total y total es mayor a cero', () => {
    expect(isTeamComplete(10, 10)).toBe(true);
    expect(isTeamComplete(9, 10)).toBe(false);
    expect(isTeamComplete(0, 0)).toBe(false);
  });
});