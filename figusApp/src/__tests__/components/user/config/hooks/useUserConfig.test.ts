import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserConfig } from '../../../../../components/user/config/hooks/useUserConfig'; // Ajusta la ruta
import { getCurrentUser, updateUser, deleteUser } from '../../../../../components/user/services/userService';
import { useFieldStatus } from '../../../../../components/user/config/hooks/useFieldStatus';
import { useLoadingFields } from '../../../../../components/user/config/hooks/useLoadingFields';
import type { ConfigDataField } from '../../../../../components/user/config/types/ConfigDataField';

// 1. Mockear las dependencias externas y hooks satélite
vi.mock('../../services/userService', () => ({
  getCurrentUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
}));

vi.mock('./useFieldStatus', () => ({
  useFieldStatus: vi.fn(),
}));

vi.mock('./useLoadingFields', () => ({
  useLoadingFields: vi.fn(),
}));

describe('useUserConfig', () => {
  // Datos simulados (Mock Data) que cumplen la interfaz UserConfig
  const mockInitialUser = {
    id: 99,
    first_name: 'Jane',
    last_name: 'Doe',
    date_of_birth: '1995-05-10',
    nationality: 'AR',
    email: 'jane@doe.com',
    phone_number: '12345678',
    profile_picture: null,
    role: 'user',
  };

  // Espías de los hooks internos
  const mockShowSuccess = vi.fn();
  const mockShowError = vi.fn();
  const mockClearStatus = vi.fn();
  const mockStartLoading = vi.fn();
  const mockStopLoading = vi.fn();

  // Guardar referencia original del location para restaurarlo tras los tests
  const originalLocation = window.location;

 // 1. Ya no necesitamos almacenar el objeto location completo, solo limpiar los mocks de Vitest.
  // Borra la línea: const originalLocation = window.location;

  beforeEach(() => {
    vi.clearAllMocks();

    // Inyectar mocks para los sub-hooks de estado y loaders
    vi.mocked(useFieldStatus).mockReturnValue({
      fieldStatus: {},
      showSuccess: mockShowSuccess,
      showError: mockShowError,
      clearStatus: mockClearStatus,
    });

    vi.mocked(useLoadingFields).mockReturnValue({
      loadingFields: {},
      startLoading: mockStartLoading,
      stopLoading: mockStopLoading,
    });

    // Configurar por defecto que la carga inicial del usuario sea exitosa
    vi.mocked(getCurrentUser).mockResolvedValue(mockInitialUser as any);

    // Mockear window.confirm por defecto
    window.confirm = vi.fn().mockReturnValue(true);

    // 🛠️ SOLUCIÓN: Mockear la propiedad .href de forma segura mediante descriptores
    // Esto redefine la propiedad permitiéndonos escribir en ella y leerla en los tests sin romper tipos.
    let hrefValue = '';
    Object.defineProperty(window.location, 'href', {
      writable: true,
      configurable: true,
      get: () => hrefValue,
      set: (newValue) => { hrefValue = newValue; },
    });
    window.location.href = ''; // Inicializamos limpia la URL ficticia
  });

  afterEach(() => {
    // 🛠️ SOLUCIÓN: Ya no hay peligro de tipos porque nunca destruimos window.location.
    // Solo restauramos los espías y mocks de Vitest.
    vi.restoreAllMocks();
  });

  afterEach(() => {
    // Restaurar el objeto window original
    window.location as any = originalLocation;
  });

  // ==========================================
  // TESTS: CARGA INICIAL (useEffect)
  // ==========================================

  it('debería cargar los datos del usuario al inicializarse', async () => {
    const { result } = renderHook(() => useUserConfig());

    // Esperar a que se resuelva la microtarea del useEffect asíncrono
    await act(async () => {});

    expect(getCurrentUser).toHaveBeenCalledTimes(1);
    expect(result.current.user).toEqual(mockInitialUser);
    expect(result.current.isLoading).toBe(false);
  });

  it('debería manejar el error si falla la carga inicial del usuario', async () => {
    const apiError = new Error('No autorizado');
    vi.mocked(getCurrentUser).mockRejectedValue(apiError);

    const { result } = renderHook(() => useUserConfig());

    await act(async () => {});

    expect(mockShowError).toHaveBeenCalledWith('delete_account', apiError);
    expect(result.current.isLoading).toBe(false);
  });

  // ==========================================
  // TESTS: ACTUALIZACIÓN DE CAMPOS (updateField)
  // ==========================================

  it('debería actualizar un campo aplicando normalización de strings (email)', async () => {
    const updatedUserMock = { ...mockInitialUser, email: 'clean@email.com' };
   vi.mocked(updateUser).mockResolvedValue(updatedUserMock as any);

    const { result } = renderHook(() => useUserConfig());
    await act(async () => {}); // Esperar carga inicial

    const field = 'email' as ConfigDataField;
    // Pasamos un email desordenado para comprobar la normalización interna (.trim().toLowerCase())
    const inputDirtyValue = '  CLEAN@email.com   ';

    await act(async () => {
      await result.current.updateField(field, inputDirtyValue);
    });

    expect(mockStartLoading).toHaveBeenCalledWith(field);
    expect(mockClearStatus).toHaveBeenCalledWith(field);
    
    // Validar que la API recibió el valor ya limpio
    expect(updateUser).toHaveBeenCalledWith(mockInitialUser.id, { email: 'clean@email.com' });
    expect(result.current.user).toEqual(updatedUserMock);
    expect(mockShowSuccess).toHaveBeenCalledWith(field, '✓ Actualizado');
    expect(mockStopLoading).toHaveBeenCalledWith(field);
  });

  it('debería actualizar un campo aplicando normalización de strings (nationality)', async () => {
    const updatedUserMock = { ...mockInitialUser, nationality: 'ES' };
    vi.mocked(updateUser).mockResolvedValue(updatedUserMock as any);

    const { result } = renderHook(() => useUserConfig());
    await act(async () => {});

    const field = 'nationality' as ConfigDataField;

    await act(async () => {
      await result.current.updateField(field, '  es  '); // Debe pasar a 'ES'
    });

    expect(updateUser).toHaveBeenCalledWith(mockInitialUser.id, { nationality: 'ES' });
  });

  it('debería capturar el error si falla la actualización del campo', async () => {
    const apiError = new Error('Formato inválido');
    vi.mocked(updateUser).mockRejectedValue(apiError);

    const { result } = renderHook(() => useUserConfig());
    await act(async () => {});

    const field = 'phone_number' as ConfigDataField;

    await act(async () => {
      await result.current.updateField(field, '5551234');
    });

    expect(mockShowError).toHaveBeenCalledWith(field, apiError);
    expect(mockStopLoading).toHaveBeenCalledWith(field);
  });

  // ==========================================
  // TESTS: ELIMINACIÓN DE CUENTA (removeAccount)
  // ==========================================

  it('debería abortar la eliminación de la cuenta si el usuario cancela la confirmación', async () => {
    window.confirm = vi.fn().mockReturnValue(false); // Usuario presiona "Cancelar"

    const { result } = renderHook(() => useUserConfig());
    await act(async () => {});

    await act(async () => {
      await result.current.removeAccount();
    });

    expect(deleteUser).not.toHaveBeenCalled();
    expect(mockStartLoading).not.toHaveBeenCalled();
  });

  it('debería eliminar el usuario y redirigir a /register tras confirmación exitosa', async () => {
    vi.mocked(deleteUser).mockResolvedValue({} as any);

    const { result } = renderHook(() => useUserConfig());
    await act(async () => {});

    await act(async () => {
      await result.current.removeAccount();
    });

    expect(window.confirm).toHaveBeenCalled();
    expect(mockStartLoading).toHaveBeenCalledWith('delete_account');
    expect(mockClearStatus).toHaveBeenCalledWith('delete_account');
    
    expect(deleteUser).toHaveBeenCalledWith(mockInitialUser.id);
    // Verificar que la redirección nativa ocurrió
    expect(window.location.href).toBe('/register');
    expect(mockStopLoading).toHaveBeenCalledWith('delete_account');
  });
});