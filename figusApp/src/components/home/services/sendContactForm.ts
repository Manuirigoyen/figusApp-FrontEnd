import type { FooterContactPayload } from '../utils/buildContactPayload';

const parseResponseError = async (response: Response) => {
  const contentType = response.headers.get('content-type');

  const raw = contentType?.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!raw) return 'No fue posible enviar la consulta, disculpe las molestias.';

  if (typeof raw === 'string') return raw;

  return raw.message || 'No fue posible enviar la consulta, disculpe las molestias.';
};

export const sendContactForm = async (
  payload: FooterContactPayload,
  endpoint: string,
) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await parseResponseError(response);
    throw new Error(message);
  }

  return response.json();
};