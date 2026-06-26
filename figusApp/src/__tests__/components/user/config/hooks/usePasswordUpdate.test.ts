import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePasswordUpdate } from '../../../../../components/user/config/hooks/usePasswordUpdate'; // Ajusta la ruta
import { updateUser } from '../../../../../components/user/services/userService';
import { useFieldStatus } from '../../../../../components/user/config/hooks/useFieldStatus';
import { useLoadingFields } from '../../../../../components/user/config/hooks/useLoadingFields';

// 1. Mockear las dependencias externas y los sub-hooks
vi.mock('../../../../../components/user/services/userService', () => ({
    updateUser: vi.fn(),
}));

vi.mock('../../../../../components/user/config/hooks/useFieldStatus', () => ({
    useFieldStatus: vi.fn(),
}));

vi.mock('../../../../../components/user/config/hooks/useLoadingFields', () => ({
    useLoadingFields: vi.fn(),
}));

describe('usePasswordUpdate', () => {
    const mockUserId = 123;

    // Mocks para las funciones que retornan los hooks internos
    const mockShowSuccess = vi.fn();
    const mockShowError = vi.fn();
    const mockClearStatus = vi.fn();
    const mockStartLoading = vi.fn();
    const mockStopLoading = vi.fn();

    // Utilidad para crear elementos Input simulados que pasen o fallen validaciones nativas
    const createMockInput = (isValid: boolean) => ({
        setCustomValidity: vi.fn(),
        checkValidity: vi.fn().mockReturnValue(isValid),
        reportValidity: vi.fn(),
    } as unknown as HTMLInputElement);

    beforeEach(() => {
        vi.clearAllMocks();

        // Configurar el retorno por defecto de useFieldStatus
        vi.mocked(useFieldStatus).mockReturnValue({
            fieldStatus: {},
            showSuccess: mockShowSuccess,
            showError: mockShowError,
            clearStatus: mockClearStatus,
        });

        // Configurar el retorno por defecto de useLoadingFields
        vi.mocked(useLoadingFields).mockReturnValue({
            loadingFields: {},
            startLoading: mockStartLoading,
            stopLoading: mockStopLoading,
        });
    });

    it('debería inicializarse con estados vacíos', () => {
        const { result } = renderHook(() => usePasswordUpdate(mockUserId));

        expect(result.current.password).toBe('');
        expect(result.current.confirmPassword).toBe('');
        expect(result.current.newPasswordRef.current).toBeNull();
        expect(result.current.confirmPasswordRef.current).toBeNull();
    });

    it('debería validar nativamente si las contraseñas no coinciden mediante el useEffect', () => {
        const { result } = renderHook(() => usePasswordUpdate(mockUserId));

        // Simular que el input existe asignándolo a la ref
        const mockConfirmInput = createMockInput(true);
        Object.defineProperty(result.current.confirmPasswordRef, 'current', {
            value: mockConfirmInput,
        });

        // Cambiar las contraseñas para que sean distintas
        act(() => {
            result.current.setPassword('password123');
            result.current.setConfirmPassword('password456');
        });

        // Debe llamar al método nativo con el mensaje de error de discordancia
        expect(mockConfirmInput.setCustomValidity).toHaveBeenCalledWith('Las contraseñas no coinciden.');

        // Cambiar las contraseñas para que coincidan
        act(() => {
            result.current.setConfirmPassword('password123');
        });

        // Debe limpiar la validación nativa pasándole un string vacío
        expect(mockConfirmInput.setCustomValidity).toHaveBeenCalledWith('');
    });

    it('debería detener la ejecución si los inputs no pasan la validación nativa del navegador', async () => {
        const { result } = renderHook(() => usePasswordUpdate(mockUserId));

        // Forzamos que el primer input de contraseña sea inválido (ej: muy corto)
        const mockNewPassInput = createMockInput(false);
        const mockConfirmPassInput = createMockInput(true);

        Object.defineProperty(result.current.newPasswordRef, 'current', { value: mockNewPassInput });
        Object.defineProperty(result.current.confirmPasswordRef, 'current', { value: mockConfirmPassInput });

        await act(async () => {
            await result.current.handlePasswordUpdate();
        });

        // Debe reportar la invalidez al usuario y frenar ahí mismo
        expect(mockNewPassInput.reportValidity).toHaveBeenCalled();
        expect(updateUser).not.toHaveBeenCalled();
    });

    it('debería actualizar la contraseña con éxito si todo es válido', async () => {
        // Solución limpia: Simular que resuelve con un objeto válido (aunque esté vacío para el test)
        vi.mocked(updateUser).mockResolvedValue({} as any);

        const { result } = renderHook(() => usePasswordUpdate(mockUserId));

        const mockNewPassInput = createMockInput(true);
        const mockConfirmPassInput = createMockInput(true);
        Object.defineProperty(result.current.newPasswordRef, 'current', { value: mockNewPassInput });
        Object.defineProperty(result.current.confirmPasswordRef, 'current', { value: mockConfirmPassInput });

        act(() => {
            result.current.setPassword('securePass128');
            result.current.setConfirmPassword('securePass128');
        });

        await act(async () => {
            await result.current.handlePasswordUpdate();
        });

        // Flujo visual de carga y limpieza
        expect(mockStartLoading).toHaveBeenCalledWith('password');
        expect(mockClearStatus).toHaveBeenCalledWith('password');

        // Llamado a la API
        expect(updateUser).toHaveBeenCalledWith(mockUserId, { password: 'securePass128' });

        // Reseteo de inputs locales
        expect(result.current.password).toBe('');
        expect(result.current.confirmPassword).toBe('');

        // Notificaciones de éxito y finalización de carga
        expect(mockShowSuccess).toHaveBeenCalledWith('password', '✓ Contraseña actualizada');
        expect(mockStopLoading).toHaveBeenCalledWith('password');
    });

    it('debería manejar el error de la API correctamente', async () => {
        const apiError = new Error('Error de red o contraseña débil');
        vi.mocked(updateUser).mockRejectedValue(apiError); // Simular fallo de API

        const { result } = renderHook(() => usePasswordUpdate(mockUserId));

        const mockNewPassInput = createMockInput(true);
        const mockConfirmPassInput = createMockInput(true);
        Object.defineProperty(result.current.newPasswordRef, 'current', { value: mockNewPassInput });
        Object.defineProperty(result.current.confirmPasswordRef, 'current', { value: mockConfirmPassInput });

        await act(async () => {
            await result.current.handlePasswordUpdate();
        });

        // Validar que se capturó el error y se envió al hook de estados
        expect(mockShowError).toHaveBeenCalledWith('password', apiError);
        // Siempre debe apagar el loader, pase lo que pase
        expect(mockStopLoading).toHaveBeenCalledWith('password');
    });
});