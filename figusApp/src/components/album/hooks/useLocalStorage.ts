// src/hooks/useLocalStorage.ts
// Hook personalizado para sincronizar estado de React con localStorage

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * Hook personalizado que sincroniza el estado de React con localStorage
 * @template T - Tipo de dato a almacenar
 * @param key - Clave única para identificar el dato en localStorage
 * @param initialValue - Valor inicial si no existe dato guardado
 * @returns Tupla con [valor actual, función para actualizar valor]
 *
 * @example
 * const [count, setCount] = useLocalStorage('counter', 0);
 * // count se carga desde localStorage o usa 0 como inicial
 * // setCount actualiza tanto el estado como localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  // Cargar valor inicial desde localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error al cargar ${key} desde localStorage:`, error);
      return initialValue;
    }
  });

  // Guardar en localStorage cuando cambia el valor
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error al guardar ${key} en localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}