import { useCallback, useState } from 'react';
import type { KeyboardEvent } from 'react';

/**
 * Maneja el estado de volteo de una figurita (frente/dorso).
 *
 * @returns `volteada` (estado actual), `toggle` (invierte el estado)
 *          y `handleKeyDown` (accesibilidad por teclado).
 */
export function useFlipCard() {
  const [volteada, setVolteada] = useState(false);

  const toggle = useCallback(() => setVolteada((v) => !v), []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  return { volteada, toggle, handleKeyDown };
}