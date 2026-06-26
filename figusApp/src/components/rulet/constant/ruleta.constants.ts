import jugadorSorpresaImg from '../../../assets/img/icons/ruleta/jugadorSorpresa.png';
import premioNadaImg from '../../../assets/img/icons/ruleta/nada.png';
import sobreBronceImg from '../../../assets/img/icons/ruleta/sobreBronce.png';
import sobreDoradoImg from '../../../assets/img/icons/ruleta/sobreDorado.png';
import sobrePlateadoImg from '../../../assets/img/icons/ruleta/sobrePlateado.png';
import giroGratisImg from '../../../assets/img/icons/ruleta/giroGratis.png';

/**
 * Diccionario estático para mapear los nombres de archivos de imágenes
 * obtenidos dinámicamente desde el backend/data hacia sus imports reales.
 */
export const MAPA_IMAGENES_PREMIOS: Record<string, string> = {
  'premioNada.png': premioNadaImg,
  'jugadorSorpresa.png': jugadorSorpresaImg,
  'giroGratis.png': giroGratisImg,
  'figurita_aleatoria.png': jugadorSorpresaImg,             
  'sobreBronce.png': sobreBronceImg, 
  'sobreDorado.png': sobreDoradoImg, 
  'sobrePlateado.png': sobrePlateadoImg,
};

export const ROTACION_INICIAL = 20;

/**
 * Helper puro para extraer el nombre de archivo base desde una ruta URI completa
 * y devolver el asset binario empaquetado correspondiente.
 */
export const obtenerImagenSegura = (rutaOriginal: string): string => {
  const nombreArchivo = rutaOriginal.split('/').pop() || '';
  return MAPA_IMAGENES_PREMIOS[nombreArchivo] || premioNadaImg;
};