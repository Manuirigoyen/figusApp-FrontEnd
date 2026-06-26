import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLoadingFields } from '../../../../../components/user/config/hooks/useLoadingFields'; // Ajusta la ruta según tu estructura
import type { ConfigDataField } from '../../../../../components/user/config/types/ConfigDataField';

describe('useLoadingFields', () => {
  // Truco con 'as' para evitar errores de tipado en el test
  const fakeField = 'anyField' as ConfigDataField;

  it('debería inicializarse con un mapa de cargas vacío', () => {
    const { result } = renderHook(() => useLoadingFields());
    
    expect(result.current.loadingFields).toEqual({});
  });

  it('debería activar el estado de carga (true) al llamar a startLoading', () => {
    const { result } = renderHook(() => useLoadingFields());

    act(() => {
      result.current.startLoading(fakeField);
    });

    expect(result.current.loadingFields).toEqual({
      [fakeField]: true,
    });
  });

  it('debería desactivar el estado de carga (false) al llamar a stopLoading', () => {
    const { result } = renderHook(() => useLoadingFields());

    // 1. Primero lo encendemos
    act(() => {
      result.current.startLoading(fakeField);
    });
    expect(result.current.loadingFields[fakeField]).toBe(true);

    // 2. Luego lo apagamos
    act(() => {
      result.current.stopLoading(fakeField);
    });

    expect(result.current.loadingFields).toEqual({
      [fakeField]: false,
    });
  });

  it('debería manejar múltiples campos de forma independiente', () => {
    const { result } = renderHook(() => useLoadingFields());
    const fieldA = 'fieldA' as ConfigDataField;
    const fieldB = 'fieldB' as ConfigDataField;

    // Activar carga en el campo A
    act(() => {
      result.current.startLoading(fieldA);
    });

    // Activar carga en el campo B
    act(() => {
      result.current.startLoading(fieldB);
    });

    expect(result.current.loadingFields).toEqual({
      [fieldA]: true,
      [fieldB]: true,
    });

    // Apagar solo el campo A
    act(() => {
      result.current.stopLoading(fieldA);
    });

    // El campo A debe ser false, pero el B debe mantenerse en true
    expect(result.current.loadingFields).toEqual({
      [fieldA]: false,
      [fieldB]: true,
    });
  });
});