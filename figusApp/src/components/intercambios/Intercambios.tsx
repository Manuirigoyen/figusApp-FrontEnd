import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { StickerWalletItem } from '../billetera/services/stickersWalletService';
import {
  acceptOffer,
  createOffer,
  getMyStickersWallet,
  getPendingOffers,
  getStickers,
  rejectOffer,
  type ExchangeOffer,
  type StickerOption,
} from './services/offersService';
import './intercambios.css';

const API_ORIGIN = 'http://localhost:3000';

const getImageSrc = (imagePath?: string) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_ORIGIN}${imagePath}`;
};

interface LocationState {
  offeredWalletItem?: StickerWalletItem;
}

export const Intercambios: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [stickers, setStickers] = useState<StickerOption[]>([]);
  const [myWallet, setMyWallet] = useState<StickerWalletItem[]>([]);
  const [offers, setOffers] = useState<ExchangeOffer[]>([]);

  const [offerWalletId, setOfferWalletId] = useState('');
  const [offeredQuantity, setOfferedQuantity] = useState(1);

  const [requestStickerId, setRequestStickerId] = useState('');
  const [requestQuantity, setRequestQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const offeredWalletItem = useMemo(
    () => myWallet.find((item) => item.id === Number(offerWalletId)),
    [myWallet, offerWalletId],
  );

  const requestSticker = useMemo(
    () => stickers.find((sticker) => sticker.id === Number(requestStickerId)),
    [stickers, requestStickerId],
  );

  const loadData = async () => {
    const [stickersData, offersData, walletData] = await Promise.all([
      getStickers(),
      getPendingOffers(),
      getMyStickersWallet(),
    ]);

    setStickers(stickersData);
    setOffers(offersData);
    setMyWallet(walletData);

    if (state?.offeredWalletItem?.id) {
      setOfferWalletId(String(state.offeredWalletItem.id));
    }
  };

  useEffect(() => {
    loadData()
      .catch((error) => setMessage(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleChangeOfferedSticker = (walletId: string) => {
    setOfferWalletId(walletId);
    setOfferedQuantity(1);
  };

  const handleCreateOffer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    if (!offeredWalletItem) {
      setMessage('Elegí la figurita que querés ofrecer.');
      return;
    }

    if (offeredQuantity < 1 || offeredQuantity > offeredWalletItem.stock) {
      setMessage(`Solo tenés ${offeredWalletItem.stock} unidades disponibles.`);
      return;
    }

    if (!requestStickerId || requestQuantity < 1) {
      setMessage('Completá la figurita y cantidad que querés recibir.');
      return;
    }

    try {
      await createOffer({
        offer_wallet_id: offeredWalletItem.id,
        offered_quantity: offeredQuantity,
        request_sticker_id: Number(requestStickerId),
        request_quantity: requestQuantity,
      });

      setMessage('Oferta publicada correctamente.');
      setOfferWalletId('');
      setOfferedQuantity(1);
      setRequestStickerId('');
      setRequestQuantity(1);

      await loadData();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'No se pudo publicar la oferta.',
      );
    }
  };

  const handleAccept = async (offerId: number) => {
    try {
      await acceptOffer(offerId);
      setMessage('Intercambio aceptado correctamente.');
      await loadData();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'No se pudo aceptar la oferta.',
      );
    }
  };

  const handleReject = async (offerId: number) => {
    try {
      await rejectOffer(offerId);
      setOffers((current) => current.filter((offer) => offer.id !== offerId));
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'No se pudo rechazar la oferta.',
      );
    }
  };

  return (
    <main className="intercambios-page">
      <section className="intercambios-panel">
        <h2>Ofertas!</h2>

        <p className="intercambios-subtitle">
          Publicá tus figuritas repetidas y negociá con otros usuarios.
        </p>

        <form className="intercambios-form" onSubmit={handleCreateOffer}>
          <div className="trade-side trade-side-offer">
            <div className="trade-fields">
              <label>
                Figurita que ofrezco
                <select
                  value={offerWalletId}
                  onChange={(event) =>
                    handleChangeOfferedSticker(event.target.value)
                  }
                >
                  <option value="">Seleccionar figurita</option>
                  {myWallet.map((item) => (
                  <option key={item.id} value={item.id}>
                  {item.sticker.name} - {item.sticker.class} - x{item.stock}
                  </option>
                  ))}
                </select>
              </label>

              <label>
                Unidades que ofrezco
                <input
                  type="number"
                  min={1}
                  max={offeredWalletItem?.stock || 1}
                  value={offeredQuantity}
                  onChange={(event) =>
                    setOfferedQuantity(Number(event.target.value))
                  }
                  disabled={!offeredWalletItem}
                />
              </label>
            </div>

            {offeredWalletItem && (
              <div className="trade-sticker-preview">
                <img
                  src={getImageSrc(offeredWalletItem.sticker.cover_image)}
                  alt={offeredWalletItem.sticker.name}
                />
                <strong>{offeredWalletItem.sticker.name}</strong>
              </div>
            )}
          </div>

          <div className="trade-side trade-side-request">
            <div className="trade-fields">
              <label>
                Figurita que quiero
                <select
                  value={requestStickerId}
                  onChange={(event) => setRequestStickerId(event.target.value)}
                >
                  <option value="">Seleccionar figurita</option>
                  {stickers.map((sticker) => (
                    <option key={sticker.id} value={sticker.id}>
                      {sticker.name} - {sticker.class}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Unidades que quiero
                <input
                  type="number"
                  min={1}
                  value={requestQuantity}
                  onChange={(event) =>
                    setRequestQuantity(Number(event.target.value))
                  }
                />
              </label>
            </div>

            {requestSticker && (
              <div className="trade-sticker-preview">
                <img
                  src={getImageSrc(requestSticker.cover_image)}
                  alt={requestSticker.name}
                />
                <strong>{requestSticker.name}</strong>
              </div>
            )}
          </div>

          <button type="submit">Publicar oferta</button>
        </form>

        {message && <p className="intercambios-message">{message}</p>}

        <div className="offers-table-wrapper">
          {loading ? (
            <p>Cargando ofertas...</p>
          ) : (
            <table className="offers-table">
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Usuario</th>
                  <th>Oferta</th>
                  <th>Unidades</th>
                  <th>Demanda</th>
                  <th>Unidades</th>
                  <th>Estado</th>
                  <th>Aceptar</th>
                  <th>Rechazar</th>
                </tr>
              </thead>

              <tbody>
                {offers.length === 0 ? (
                  <tr>
                    <td colSpan={9}>No hay ofertas activas.</td>
                  </tr>
                ) : (
                  offers.map((offer, index) => (
                    <tr key={offer.id}>
                      <td>{index + 1}</td>
                      <td>
                        {offer.offererUser.first_name} {offer.offererUser.id}
                      </td>

                      <td>
                        <img
                          className="offer-sticker-img"
                          src={getImageSrc(offer.offerWallet.sticker.cover_image)}
                          alt={offer.offerWallet.sticker.name}
                        />
                      </td>

                      <td>{offer.offered_quantity}</td>

                      <td>
                        <img
                          className="offer-sticker-img"
                          src={getImageSrc(offer.requestSticker.cover_image)}
                          alt={offer.requestSticker.name}
                        />
                      </td>

                      <td>{offer.request_quantity}</td>

                      <td>
                        {offer.status === 'pending' ? 'Activa' : offer.status}
                      </td>

                      <td>
                        <button
                          className="accept-btn"
                          onClick={() => handleAccept(offer.id)}
                        >
                          ✔
                        </button>
                      </td>

                      <td>
                        <button
                          className="reject-btn"
                          onClick={() => handleReject(offer.id)}
                        >
                          ✖
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
};