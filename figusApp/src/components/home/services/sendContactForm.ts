import type { FooterContactPayload } from '../utils/buildContactPayload';

export const sendContactForm = async (
  payload: FooterContactPayload,
  endpoint: string,
) => {
  console.log('ENDPOINT:', endpoint);
  console.log('PAYLOAD:', payload);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  console.log('STATUS:', response.status);

  const text = await response.text();

  console.log('RESPONSE:', text);

  if (!response.ok) {
    throw new Error(text || 'Error enviando formulario');
  }

  return text ? JSON.parse(text) : null;
};