import { describe, expect, it } from 'vitest';

import {
  validateDate,
  validateEmail,
  validateName,
  validateNationality,
  validatePasswordPair,
  validatePhone,
} from '../../../../../components/user/config/utils/validateConfigField';

describe('validateConfigField', () => {
  it('valida nombres con al menos dos caracteres útiles', () => {
    expect(validateName('Ma')).toBe(true);
    expect(validateName(' M ')).toBe(false);
  });

  it('valida formato de email', () => {
    expect(validateEmail(' TEST@MAIL.COM ')).toBe(true);
    expect(validateEmail('mail-invalido')).toBe(false);
  });

  it('valida teléfonos básicos', () => {
    expect(validatePhone('+54 223-1234567')).toBe(true);
    expect(validatePhone('abc123')).toBe(false);
  });

  it('valida fechas parseables', () => {
    expect(validateDate('2000-01-01')).toBe(true);
    expect(validateDate('')).toBe(false);
    expect(validateDate('no-es-fecha')).toBe(false);
  });

  it('valida nacionalidad por código existente', () => {
    expect(validateNationality('AR')).toBe(true);
    expect(validateNationality('XX')).toBe(false);
  });

  it('valida contraseña con largo, mayúscula, número y confirmación', () => {
    expect(validatePasswordPair('Password1', 'Password1')).toBe(true);
    expect(validatePasswordPair('password1', 'password1')).toBe(false);
    expect(validatePasswordPair('Password', 'Password')).toBe(false);
    expect(validatePasswordPair('Password1', 'Password2')).toBe(false);
  });
});