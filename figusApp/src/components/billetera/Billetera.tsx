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
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    if (!deleteError) return;
    const timer = setTimeout(() => setDeleteError(null), 4000);
    return () => clearTimeout(timer);
  }, [deleteError]);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const inicializar = async () => {
      try {
        const data = await getMyStickersWallet();
        if (isMounted) {
          setBilletera(data);
        }
      } catch (error) {
        console.error('Error al cargar la billetera:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    inicializar();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleEliminarFigurita = async (
    walletItemId: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    if (isDeletingId === walletItemId) return;

    try {
      setIsDeletingId(walletItemId);
      setDeleteError(null);
      await decrementStickerWalletItem(walletItemId);
      await cargarBilletera(false);
    } catch (error: any) {
      console.error('Error al eliminar figurita:', error);
      setDeleteError(error?.message || 'No se pudo eliminar la figurita.');
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

  const getImageSrc = (imagePath: string) => {
    if (!imagePath) return '';

    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    const apiBase = import.meta.env.VITE_API_BASE;
    const apiOrigin = apiBase.replace('/api/v1', '');

    return `${apiOrigin}${imagePath}`;
  };

  return (
    <main className="billetera-page position-relative">

      {deleteError && (
        <div className="billetera-toast-error">
          <span>{deleteError}</span>
          <button
            className="billetera-toast-close"
            onClick={() => setDeleteError(null)}
          >
            ✕
          </button>
        </div>
      )}

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