import { describe, expect, it } from 'vitest';

import { normalizeValue } from './normalizeValue';

describe('normalizeValue', () => {
  it('normaliza email con trim y lowercase', () => {
    expect(normalizeValue('email', '  USER@MAIL.COM  ')).toBe('user@mail.com');
  });

  it('normaliza nationality con trim y uppercase', () => {
    expect(normalizeValue('nationality', ' ar ')).toBe('AR');
  });

  it('mantiene date_of_birth sin modificar', () => {
    expect(normalizeValue('date_of_birth', ' 2000-01-01 ')).toBe(' 2000-01-01 ');
  });

  it('aplica trim a los demás campos', () => {
    expect(normalizeValue('first_name', '  Manuel  ')).toBe('Manuel');
  });
});
