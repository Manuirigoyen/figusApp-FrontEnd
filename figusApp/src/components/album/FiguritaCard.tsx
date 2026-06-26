import './FiguritaCard.css';
import type { Figurita } from './data/figuritasData';

interface FiguritaCardProps {
  figurita: Figurita;
  onFiguritaClick: (figuritaId: string) => void;
  clickable?: boolean;
}

function FiguritaCard({
  figurita,
  onFiguritaClick,
  clickable = true,
}: FiguritaCardProps) {
  const handleClick = () => {
    onFiguritaClick(figurita.id);
  };

  let imageSrc = figurita.backgroundImageUrl;
  let altText = `Figurita ${figurita.id} de ${figurita.teamId}`;

  if (figurita.isSpecial && figurita.isComplete && figurita.specialImageUrl) {
    imageSrc = figurita.specialImageUrl;
    altText = figurita.specialImageAlt || altText;
  }

  return (
    <div
      className={`card ${figurita.isComplete ? 'completa' : ''} ${
        figurita.isSpecial ? 'especial' : ''
      }`}
      onClick={clickable ? handleClick : undefined}
      style={{ cursor: clickable ? 'pointer' : 'default' }}
      data-id={figurita.id}
    >
      <img src={imageSrc} alt={altText} />
    </div>
  );
}

export default FiguritaCard;