import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('usa initialValue cuando no existe valor guardado', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0));

    expect(result.current[0]).toBe(0);
  });

  it('lee el valor existente desde localStorage', () => {
    localStorage.setItem('counter', JSON.stringify(10));

    const { result } = renderHook(() => useLocalStorage('counter', 0));

    expect(result.current[0]).toBe(10);
  });

  it('actualiza estado y localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('counter', 0));

    act(() => {
      result.current[1](5);
    });

    expect(result.current[0]).toBe(5);
    expect(localStorage.getItem('counter')).toBe('5');
  });

  it('devuelve initialValue si localStorage contiene JSON inválido', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem('broken', '{');

    const { result } = renderHook(() => useLocalStorage('broken', 'default'));

    expect(result.current[0]).toBe('default');
    expect(errorSpy).toHaveBeenCalled();
  });
});
