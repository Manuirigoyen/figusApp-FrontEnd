// src/utils/albumUtils.ts
// Funciones utilitarias para calcular progreso y estado del álbum

/**
 * Calcula el porcentaje de progreso basado en figuritas completas
 * @param totalCards - Número total de figuritas
 * @param completadas - Número de figuritas completadas
 * @returns Porcentaje redondeado
 */
export const calculateProgress = (totalCards: number, completadas: number): number => {
  return totalCards > 0 ? Math.round((completadas / totalCards) * 100) : 0;
};

/**
 * Determina el color de la barra de progreso según el porcentaje
 * @param porcentaje - Porcentaje de progreso (0-100)
 * @returns Color hexadecimal
 */
export const getProgressBarColor = (porcentaje: number): string => {
  if (porcentaje > 66) return "#43a047"; // Verde
  if (porcentaje > 33) return "#fdd835"; // Amarillo
  return "#e53935"; // Rojo
};

/**
 * Verifica si un equipo está completo
 * @param completadas - Número de figuritas completadas
 * @param totalCards - Número total de figuritas
 * @returns true si todas las figuritas están completas
 */
export const isTeamComplete = (completadas: number, totalCards: number): boolean => {
  return completadas === totalCards && totalCards > 0;
};