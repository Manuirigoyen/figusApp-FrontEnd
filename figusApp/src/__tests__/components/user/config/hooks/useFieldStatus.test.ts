import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFieldStatus } from '../../../../../components/user/config/hooks/useFieldStatus';

import { getErrorMessage } from '../../../../../components/user/config/utils/statusHelpers';
import type { ConfigDataField } from '../../../../../components/user/config/types/ConfigDataField';

vi.mock('../../../../../components/user/config/utils/statusHelpers', () => ({
    getErrorMessage: vi.fn(),
    withAutoClear: vi.fn((cb) => window.setTimeout(cb, 2500)),
}));

describe('useFieldStatus', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
    });

    it('debería inicializarse con un estado vacío', () => {
        const { result } = renderHook(() => useFieldStatus());
        expect(result.current.fieldStatus).toEqual({});
    });

    it('debería asignar un mensaje de éxito y limpiarlo tras la duración establecida', () => {
        const { result } = renderHook(() => useFieldStatus());
        const field: ConfigDataField = 'email'; 
        const message = '¡Guardado con éxito!';

        act(() => {
            result.current.showSuccess(field, message, 3000);
        });

        expect(result.current.fieldStatus).toEqual({ [field]: message });

        act(() => {
            vi.advanceTimersByTime(1500);
        });
        expect(result.current.fieldStatus).toEqual({ [field]: message });

        act(() => {
            vi.advanceTimersByTime(1500);
        });

        expect(result.current.fieldStatus).toEqual({ [field]: '' });
    });

    it('debería usar la duración por defecto de 2500ms si no se especifica una', () => {
        const { result } = renderHook(() => useFieldStatus());
        const field: ConfigDataField = 'password';

        act(() => {
            result.current.showSuccess(field, 'Éxito por defecto');
        });

        act(() => {
            vi.advanceTimersByTime(2499);
        });
        expect(result.current.fieldStatus[field]).toBe('Éxito por defecto');

        act(() => {
            vi.advanceTimersByTime(1);
        });
        expect(result.current.fieldStatus[field]).toBe('');
    });

    it('debería asignar un mensaje de error usando getErrorMessage', () => {
        const mockedErrorMsg = 'Error de validación simulado';
        vi.mocked(getErrorMessage).mockReturnValue(mockedErrorMsg);

        const { result } = renderHook(() => useFieldStatus());
        const field: ConfigDataField = 'email';
        const fakeError = new Error('Oops');
        const fallback = 'Algo salió mal';

        act(() => {
            result.current.showError(field, fakeError, fallback);
        });

        expect(getErrorMessage).toHaveBeenCalledWith(fakeError, fallback);
        expect(result.current.fieldStatus).toEqual({ [field]: mockedErrorMsg });
    });

    it('debería limpiar el estado de un campo manualmente con clearStatus', () => {
        const { result } = renderHook(() => useFieldStatus());
        const field = 'phone' as ConfigDataField;

        act(() => {
            result.current.showSuccess(field, 'Temporal');
        });

        act(() => {
            result.current.clearStatus(field);
        });

        expect(result.current.fieldStatus).toEqual({ [field]: '' });
    });
});