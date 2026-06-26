// src/constants/storageKeys.ts
// Claves constantes para localStorage

/**
 * Claves para almacenar datos en localStorage
 * Usar estas constantes evita errores de tipeo y centraliza la gestión
 */
export const STORAGE_KEYS = {
  /** Almacena las figuritas repetidas del usuario */
  BILLETERA: 'billetera',
  /** Almacena los IDs de figuritas que ya están completas */
  FIGURITAS_COMPLETAS: 'figuritasCompletas',
} as const;

/**
 * Equipo IDs válidos
 */
export const VALID_TEAM_IDS = ['argentina', 'brasil', 'francia'] as const;