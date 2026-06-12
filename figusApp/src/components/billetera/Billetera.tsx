import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './billetera.css';
import {
  decrementStickerWalletItem,
  getMyStickersWallet,
  type StickerWalletItem,
} from './services/stickersWalletService';

export const Billetera: React.FC = () => {
  const [billetera, setBilletera] = useState<StickerWalletItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);

  const navigate = useNavigate();

  const cargarBilletera = async (mostrarLoading = true) => {
    try {
      if (mostrarLoading) {
        setLoading(true);
      }

      const data = await getMyStickersWallet();
      setBilletera(data);
    } catch (error) {
      console.error('Error al cargar la billetera:', error);
    } finally {
      if (mostrarLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    cargarBilletera();
  }, []);

  const handleEliminarFigurita = async (
    walletItemId: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    if (isDeletingId === walletItemId) return;

    try {
      setIsDeletingId(walletItemId);
      await decrementStickerWalletItem(walletItemId);
      await cargarBilletera(false);
    } catch (error) {
      console.error('Error al eliminar figurita:', error);
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleIntercambiarFigurita = (
  item: StickerWalletItem,
  event: React.MouseEvent<HTMLButtonElement>,
) => {
  event.stopPropagation();
  navigate('/intercambios', { state: { offeredWalletItem: item } });
};

  const API_ORIGIN = 'http://localhost:3000';

  const getImageSrc = (imagePath: string) => {
    if (!imagePath) return '';

    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    return `${API_ORIGIN}${imagePath}`;
  };

  const getDivAnuncio = (src: string, url: string) => (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img src={src} alt="Publicidad" className="ad-unit-image-billetera" />
    </a>
  );

  return (
    <main className="billetera-page position-relative">
      <div className="ad-left-billetera">
        {getDivAnuncio(
          'src/assets/img/add/billetera/jugadores.png',
          'https://www.dymatize.com',
        )}
      </div>

      <div className="ad-right-billetera">
        {getDivAnuncio(
          'src/assets/img/add/billetera/argentina.png',
          'https://www.conmebol.com/eliminatorias-sudamericanas-mundial-2026/',
        )}
      </div>

      <section className="billetera-section">
        <h2>Mi billetera de figuritas repetidas</h2>
        <h3>¡Intercambialas con amigos!</h3>

        <div className="figus-repetidas" id="billetera-contenedor">
          {loading ? (
            <p className="empty-billetera">Cargando billetera...</p>
          ) : billetera.length === 0 ? (
            <p className="empty-billetera">
              Tu billetera está vacía. ¡Consigue más figuritas para repetir!
            </p>
          ) : (
            billetera.map((item) => (
              <div key={item.id} className="billetera-item-wrapper">
                <div className="figurita-billetera-card">
                  <img
                    src={getImageSrc(item.sticker.cover_image)}
                    alt={item.sticker.name}
                    className="figurita-billetera-img"
                  />

                  <h4>{item.sticker.name}</h4>
                  <p>{item.sticker.nationality}</p>
                  <p>{item.sticker.class}</p>

                  <div className="contador">x{item.stock}</div>

                  <div className="botones-billetera">
                    <button
                      className="btn-eliminar"
                      disabled={isDeletingId === item.id}
                      onClick={(event) =>
                        handleEliminarFigurita(item.id, event)
                      }
                    >
                      {isDeletingId === item.id ? 'Eliminando...' : 'Eliminar'}
                    </button>

                    <button
                    className="btn-intercambiar"
                    onClick={(event) => handleIntercambiarFigurita(item, event)}
                    >
                    Intercambiar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Billetera;