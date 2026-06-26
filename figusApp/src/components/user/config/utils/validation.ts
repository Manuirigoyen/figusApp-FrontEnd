/**
 * Comprueba si un `File` es una imagen por su tipo MIME.
 */
export const validateImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Verifica que las dos contraseñas coincidan exactamente.
 */
export const validatePasswordsMatch = (
  password: string,
  confirmPassword: string,
): boolean => {
  return password === confirmPassword;
};

/**
 * Comprueba que haya al menos un archivo seleccionado.
 */
export const validateRequiredFile = (
  files: FileList | null,
): files is FileList => {
  return !!files && files.length > 0;
};

/**
 * Valida un elemento de formulario (`input` o `select`) y muestra
 * mensajes de validación nativos si corresponde.
 */
export const validateInputElement = (
  input: HTMLInputElement | HTMLSelectElement | null,
): boolean => {
  if (!input) {
    return false;
  }

  if (!input.checkValidity()) {
    input.reportValidity();
    return false;
  }

  return true;
};