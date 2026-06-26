import nadaImg from '../../../assets/img/icons/ruleta/nada.png';
import giroGratisImg from '../../../assets/img/icons/ruleta/giroGratis.png';
import sobreBronceImg from '../../../assets/img/icons/ruleta/sobreBronce.png';
import jugadorSorpresaImg from '../../../assets/img/icons/ruleta/jugadorSorpresa.png';
import sobrePlateadoImg from '../../../assets/img/icons/ruleta/sobrePlateado.png';
import sobreDoradoImg from '../../../assets/img/icons/ruleta/sobreDorado.png';

export interface Premio {
  nombre: string;
  img: string;
}

export const premios: Premio[] = [
  { nombre: "Nada", img: nadaImg },
  { nombre: "Giro Gratis", img: giroGratisImg },
  { nombre: "Nada", img: nadaImg },
  { nombre: "Sobre Bronce", img: sobreBronceImg },
  { nombre: "Nada", img: nadaImg },
  { nombre: "Figurita Aleatoria", img: jugadorSorpresaImg },
  { nombre: "Nada", img: nadaImg },
  { nombre: "Sobre Plateado", img: sobrePlateadoImg },
  { nombre: "Sobre Dorado", img: sobreDoradoImg },
  { nombre: "Nada", img: nadaImg },
  { nombre: "Giro Gratis", img: giroGratisImg },
  { nombre: "Nada", img: nadaImg },
];