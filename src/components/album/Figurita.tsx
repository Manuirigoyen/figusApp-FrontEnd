import type { FiguritaCardProps } from '../../types/figurita';
import { useFlipCard } from '../../hooks/useFlipCard';

export function FiguritaCard({ figurita, dorsoDefault }: FiguritaCardProps) {
  const { volteada, toggle, handleKeyDown } = useFlipCard();

  const isSquare = figurita.contenedor.includes('cuadrado');
  const dorsoImg = figurita.dorso || dorsoDefault;
  const codigoFigurita = figurita.imagen.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';

  return (
    <figure className={`m-0 flex flex-col items-center w-full ${isSquare ? 'max-w-[140px]' : 'max-w-[110px]'} self-center`}>
      <div
        className="relative w-full cursor-pointer select-none [perspective:1000px]"
        onDoubleClick={toggle}
        role="button"
        tabIndex={0}
        aria-pressed={volteada}
        aria-label={volteada ? 'Mostrar figurita' : 'Mostrar dorso'}
        onKeyDown={handleKeyDown}
      >
        <img
          className="w-full h-auto block opacity-0 pointer-events-none"
          src={figurita.contenedor}
          alt=""
          aria-hidden="true"
        />

        <div
          className={`absolute inset-0 w-full h-full [transform-style:preserve-3d] transition-transform duration-500 ease-in-out ${
            volteada ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
          }`}
        >
        
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <img
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
              src={figurita.contenedor}
              alt=""
              aria-hidden="true"
            />
            <img
              className={`absolute inset-0 w-full h-full object-contain ${isSquare ? 'py-[0%] px-[8%]' : 'py-[0%] px-[11%]' } box-border pointer-events-none`}
              src={figurita.imagen}
              alt={figurita.descripcion ? figurita.descripcion.replace(/\n/g, ' ') : 'Figurita del álbum'}
            />
          </div>

          {dorsoImg && (
            <div className="absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)]">
              <img
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                src={figurita.contenedor}
                alt=""
                aria-hidden="true"
              />
              <img
                className={`absolute inset-0 w-full h-full object-contain ${isSquare ? 'py-[9%] px-[3%]' : 'py-[0%] px-[3%]'} box-border pointer-events-none`}
                src={dorsoImg}
                alt="Dorso de la figurita"
              />
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isSquare ? (
                  <text
                    x="55%"
                    y="56%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="font-barlow font-bold fill-white text-[14px]"
                  >
                    {codigoFigurita}
                  </text>
                ) : (
                  <text
                    x="55%"
                    y="58%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="font-barlow font-bold fill-white text-[18px]"
                  >
                    {codigoFigurita}
                  </text>
                )}
              </svg>
            </div>
          )}
        </div>
      </div>

      {figurita.descripcion && (
        <figcaption className="mt-1.5 w-full text-center text-[0.8rem] font-barlow font-extrabold text-neutral-800 leading-[1.15] break-anywhere [text-shadow:_0_0_3px_rgba(255,255,255,0.9),_0_0_3px_rgba(255,255,255,0.9)]">
          {figurita.descripcion}
        </figcaption>
      )}
    </figure>
  );
}