import { describe, expect, it, vi } from 'vitest';

import {
  validateImageFile,
  validateInputElement,
  validatePasswordsMatch,
  validateRequiredFile,
} from './validation';

describe('validation', () => {
  it('valida archivos de imagen por MIME type', () => {
    const image = new File(['avatar'], 'avatar.png', { type: 'image/png' });
    const pdf = new File(['doc'], 'doc.pdf', { type: 'application/pdf' });

    expect(validateImageFile(image)).toBe(true);
    expect(validateImageFile(pdf)).toBe(false);
  });

  it('valida coincidencia exacta de contraseñas', () => {
    expect(validatePasswordsMatch('abc123', 'abc123')).toBe(true);
    expect(validatePasswordsMatch('abc123', 'abc124')).toBe(false);
  });

  it('valida que haya archivos seleccionados', () => {
    const input = document.createElement('input');
    input.type = 'file';

    expect(validateRequiredFile(null)).toBe(false);
    expect(validateRequiredFile(input.files)).toBe(false);
  });

  it('valida input nativo y reporta cuando no es válido', () => {
    const input = document.createElement('input');
    input.checkValidity = vi.fn(() => false);
    input.reportValidity = vi.fn();

    expect(validateInputElement(null)).toBe(false);
    expect(validateInputElement(input)).toBe(false);
    expect(input.reportValidity).toHaveBeenCalledTimes(1);
  });

  it('devuelve true cuando el input nativo es válido', () => {
    const input = document.createElement('input');
    input.checkValidity = vi.fn(() => true);
    input.reportValidity = vi.fn();

    expect(validateInputElement(input)).toBe(true);
    expect(input.reportValidity).not.toHaveBeenCalled();
  });
});
