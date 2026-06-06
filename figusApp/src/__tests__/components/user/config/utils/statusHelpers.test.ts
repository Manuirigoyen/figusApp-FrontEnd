import { afterEach, describe, expect, it, vi } from 'vitest';

import { getErrorMessage, withAutoClear } from '../../../../../components/user/config/utils/statusHelpers';

describe('statusHelpers', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('getErrorMessage', () => {
    it('devuelve el mensaje de Error', () => {
      expect(getErrorMessage(new Error('Falló'))).toBe('Falló');
    });

    it('devuelve fallback cuando no recibe un Error', () => {
      expect(getErrorMessage('error desconocido', 'Mensaje default')).toBe('Mensaje default');
    });
  });

  describe('withAutoClear', () => {
    it('ejecuta el callback luego del timeout indicado', () => {
      vi.useFakeTimers();
      const callback = vi.fn();

      const timerId = withAutoClear(callback, 1000);

      expect(timerId).toBeTruthy();
      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1000);

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});