import type { FooterContactPayload } from '../utils/buildContactPayload';

/**
 * Envía el formulario de contacto al backend.
 * 
 * @param payload - Datos del formulario a enviar.
 * @returns La respuesta del servidor o null.
 * @throws Error si la respuesta no es exitosa.
 */
export const sendContactForm = async (
  payload: FooterContactPayload,
) => {
  const baseUrl = import.meta.env.VITE_API_BASE;
  const endpoint = `${baseUrl}/contact`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || 'Error enviando formulario');
  }

  return text ? JSON.parse(text) : null;
};