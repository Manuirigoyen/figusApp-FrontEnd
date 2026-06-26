import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProfilePicture } from '../../../../../components/user/config/hooks/useProfilePicture'; // Ajusta la ruta según tu proyecto
import { updateUserProfilePicture } from '../../../../../components/user/services/userService';
import { validateImageFile, validateRequiredFile } from '../../../../../components/user/config/utils/validation';
import { useFieldStatus } from '../../../../../components/user/config/hooks/useFieldStatus';
import { useLoadingFields } from '../../../../../components/user/config/hooks/useLoadingFields';

// 1. Mockear dependencias externas y utilidades
vi.mock('../../services/userService', () => ({
  updateUserProfilePicture: vi.fn(),
}));

vi.mock('../utils/validation', () => ({
  validateRequiredFile: vi.fn(),
  validateImageFile: vi.fn(),
}));

vi.mock('./useFieldStatus', () => ({
  useFieldStatus: vi.fn(),
}));

vi.mock('./useLoadingFields', () => ({
  useLoadingFields: vi.fn(),
}));

describe('useProfilePicture', () => {
  // 📜 VARIABLES GLOBALES DEL SUITE (Accesibles por todos los 'it')
  const mockUser = { id: 1, name: 'Test User', avatar: '' };
  const mockSetUser = vi.fn();
  const mockProps = { user: mockUser as any, setUser: mockSetUser };

  const mockShowSuccess = vi.fn();
  const mockShowError = vi.fn();
  const mockClearStatus = vi.fn();
  const mockStartLoading = vi.fn();
  const mockStopLoading = vi.fn();

  const fakeObjectUrl = 'blob:http://localhost:5173/fake-uuid';
  const mockFile = new File(['image-content'], 'avatar.png', { type: 'image/png' });

  beforeEach(() => {
    vi.clearAllMocks();

    // Configurar comportamiento por defecto de los sub-hooks
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

    // Mockear métodos estáticos de la Web API de URL usando window
    window.URL.createObjectURL = vi.fn().mockReturnValue(fakeObjectUrl);
    window.URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debería inicializarse con estado de preview nulo', () => {
    const { result } = renderHook(() => useProfilePicture(mockProps));
    expect(result.current.profilePictureRef.current).toBeNull();
  });

  it('debería fallar si no se seleccionó ningún archivo (validateRequiredFile false)', async () => {
    vi.mocked(validateRequiredFile).mockReturnValue(false);

    const { result } = renderHook(() => useProfilePicture(mockProps));
    
    Object.defineProperty(result.current.profilePictureRef, 'current', {
      value: { files: null } as unknown as HTMLInputElement,
    });

    await act(async () => {
      await result.current.handleProfilePictureUpdate();
    });

    expect(mockShowError).toHaveBeenCalledWith('profile_picture', null, 'Seleccioná una imagen');
    expect(updateUserProfilePicture).not.toHaveBeenCalled();
  });

  it('debería fallar si el archivo no es una imagen válida (validateImageFile false)', async () => {
    vi.mocked(validateRequiredFile).mockReturnValue(true);
    vi.mocked(validateImageFile).mockReturnValue(false);

    const { result } = renderHook(() => useProfilePicture(mockProps));
    
    Object.defineProperty(result.current.profilePictureRef, 'current', {
      value: { files: [mockFile] } as unknown as HTMLInputElement,
    });

    await act(async () => {
      await result.current.handleProfilePictureUpdate();
    });

    expect(mockShowError).toHaveBeenCalledWith('profile_picture', null, 'Archivo inválido');
    expect(updateUserProfilePicture).not.toHaveBeenCalled();
  });

  it('debería subir la foto correctamente, actualizar el usuario y generar el preview', async () => {
    const updatedUserMock = { ...mockUser, avatar: 'new-avatar-url.png' } as any;
    vi.mocked(validateRequiredFile).mockReturnValue(true);
    vi.mocked(validateImageFile).mockReturnValue(true);
    vi.mocked(updateUserProfilePicture).mockResolvedValue(updatedUserMock);

    const { result } = renderHook(() => useProfilePicture(mockProps));
    
    Object.defineProperty(result.current.profilePictureRef, 'current', {
      value: { files: [mockFile] } as unknown as HTMLInputElement,
    });

    await act(async () => {
      await result.current.handleProfilePictureUpdate();
    });

    expect(mockStartLoading).toHaveBeenCalledWith('profile_picture');
    expect(mockClearStatus).toHaveBeenCalledWith('profile_picture');
    
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockFile);

    expect(updateUserProfilePicture).toHaveBeenCalledWith(mockUser.id, mockFile);
    expect(mockSetUser).toHaveBeenCalledWith(updatedUserMock);
    
    expect(mockShowSuccess).toHaveBeenCalledWith('profile_picture', '✓ Foto actualizada');
    expect(mockStopLoading).toHaveBeenCalledWith('profile_picture');
  });

  it('debería manejar el error si la subida a la API falla', async () => {
    const apiError = new Error('Error de conexión con el servidor');
    vi.mocked(validateRequiredFile).mockReturnValue(true);
    vi.mocked(validateImageFile).mockReturnValue(true);
    vi.mocked(updateUserProfilePicture).mockRejectedValue(apiError);

    const { result } = renderHook(() => useProfilePicture(mockProps));
    
    Object.defineProperty(result.current.profilePictureRef, 'current', {
      value: { files: [mockFile] } as unknown as HTMLInputElement,
    });

    await act(async () => {
      await result.current.handleProfilePictureUpdate();
    });

    expect(mockShowError).toHaveBeenCalledWith('profile_picture', apiError, 'Error al actualizar foto');
    expect(mockStopLoading).toHaveBeenCalledWith('profile_picture');
  });

  it('debería liberar la URL del objeto (revokeObjectURL) al desmontar para evitar fugas de memoria', async () => {
    vi.mocked(validateRequiredFile).mockReturnValue(true);
    vi.mocked(validateImageFile).mockReturnValue(true);
    vi.mocked(updateUserProfilePicture).mockResolvedValue({} as any);

    const { result, unmount } = renderHook(() => useProfilePicture(mockProps));
    
    Object.defineProperty(result.current.profilePictureRef, 'current', {
      value: { files: [mockFile] } as unknown as HTMLInputElement,
    });

    // Ejecutar la actualización para que se genere el preview interno
    await act(async () => {
      await result.current.handleProfilePictureUpdate();
    });

    // Desmontar el hook para disparar el cleanup del useEffect
    unmount();

    expect(window.URL.revokeObjectURL).toHaveBeenCalledWith(fakeObjectUrl);
  });
});