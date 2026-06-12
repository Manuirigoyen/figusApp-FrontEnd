import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FiguritaCard from './FiguritaCard';
import './album.css';
import './FiguritaCard.css';
import jugadorSorpresa from '../../assets/img/icons/album/jugadorSorpresa.jpeg';
import pelotaPremio from "../../assets/img/fonts/pelotapremio.png";
import pelotaPremioCompleto from "../../assets/img/fonts/pelotaPremioGanador.png";
import { getAllAlbums, getAlbumProgress } from './services/albumService';
import { TEAMS_INFO } from './data/teamsData';
import { ROUTES } from '../../routes/constants/routes.constants';
import type { Figurita } from './data/figuritasData';
import {
  calculateProgress,
  getProgressBarColor,
  isTeamComplete,
} from './utils/albumUtils';

const API_BASE = import.meta.env.VITE_API_BASE;

type BackendSticker = {
  id: number;
  name: string;
  class: string;
  nationality: string;
  cover_image: string;
  album_id: number;
  obtained: boolean;
};

type AlbumData = {
  id: number;
  name: string;
  class: string;
  nationality: string;
  description: string;
  capacity: number;
  cover_image: string;
};

type AlbumProgress = {
  album: AlbumData;
  stickers: BackendSticker[];
};

function getUserFromToken() {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

function getAlbumKey(album: AlbumData) {
  const name = album.name.toLowerCase();

  if (name.includes('argentina')) return 'argentina';
  if (name.includes('brasil')) return 'brasil';
  if (name.includes('franc')) return 'francia';

  return 'argentina';
}

function resolveImageUrl(path: string) {
  if (!path) return '';

  if (path.startsWith('http')) {
    return path;
  }

  const uploadsIndex = path.indexOf('/uploads/');

  if (uploadsIndex !== -1) {
    return `${API_BASE.replace('/api/v1', '')}${path.substring(uploadsIndex)}`;
  }

  return path;
}

function Album() {
  const navigate = useNavigate();

  const [albumsProgress, setAlbumsProgress] = useState<AlbumProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tokenUser = getUserFromToken();

  const userId = Number(tokenUser?.sub || tokenUser?.id || tokenUser?.user_id);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        if (!userId) {
          setError('No se encontró el usuario logueado.');
          return;
        }

        const albums = await getAllAlbums();

        const progressResponses = await Promise.all(
          albums.map((album: AlbumData) => getAlbumProgress(album.id, userId)),
        );

        setAlbumsProgress(progressResponses);
      } catch (e) {
        console.error('Error al cargar los álbumes:', e);
        setError('No se pudieron cargar los álbumes.');
      } finally {
        setIsLoading(false);
      }
    };

    loadAlbums();
  }, [userId]);

  const seccionesRequeridas = ['argentina', 'brasil', 'francia'];
  const completaronTresSecciones = seccionesRequeridas.every((clave) => {
    const albumProgress = albumsProgress.find((ap) => getAlbumKey(ap.album) === clave);

    if (!albumProgress) return false;

    const total = albumProgress.stickers.length;
    const obtenidas = albumProgress.stickers.filter((sticker) => sticker.obtained).length;

    return total > 0 && total === obtenidas;
  });

  console.log('completaronTresSecciones:', completaronTresSecciones);
  console.log('albumsProgress detalles:', albumsProgress.map((ap) => ({
    nombre: ap.album.name,
    albumKey: getAlbumKey(ap.album),
    total: ap.stickers.length,
    obtenidas: ap.stickers.filter((s) => s.obtained).length,
  })));

  if (isLoading) {
    return (
      <div className="album-container">
        <h1 className="main-title">Cargando Álbum de Figuritas...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="album-container error-message">
        <h1 className="main-title">Error al cargar el Álbum</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="album" id="album-react">
      <h1 className="main-title">Mis álbumes</h1>

      {albumsProgress.map((albumProgress) => {
        const album = albumProgress.album;
        const stickers = albumProgress.stickers;

        const totalCards = stickers.length;
        const completadas = stickers.filter((sticker) => sticker.obtained).length;
        const porcentaje = calculateProgress(totalCards, completadas);
        const progressBarColor = getProgressBarColor(porcentaje);
        const albumCompleto = isTeamComplete(completadas, totalCards);

        const albumKey = getAlbumKey(album);
        const teamInfo = TEAMS_INFO[albumKey];

        const figuritasAdaptadas: Figurita[] = stickers.map((sticker) => {
          const imageUrl = resolveImageUrl(sticker.cover_image);
          const stickerName = sticker.name?.toLowerCase() || '';
          const isLegendaria =
            sticker.class === 'Legendaria' && !stickerName.includes('neymar');

          return {
            id: String(sticker.id),
            teamId: albumKey,
            isSpecial: isLegendaria,
            isComplete: sticker.obtained,
            backgroundImageUrl: isLegendaria ? jugadorSorpresa : imageUrl,
            specialImageUrl: imageUrl,
            specialImageAlt: sticker.name,
            dataJugador: sticker.name,
          };
        });

        return (
          <div key={album.id} id={albumKey} className="team">
            <h2 className="titulo-seleccion">
              {album.name}
              <img
                src={teamInfo.banderaIcono}
                alt={`Bandera ${album.name}`}
                className="icono-bandera"
              />
            </h2>

            <div className="album-layout">
              <div className="contenido-album">
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${porcentaje}%`,
                      backgroundColor: progressBarColor,
                    }}
                  ></div>

                  <span className="progress-text">Progreso: {porcentaje}%</span>
                </div>

                <div className="cards">
                  {figuritasAdaptadas.map((fig) => (
                    <FiguritaCard
                      key={fig.id}
                      figurita={fig}
                      onFiguritaClick={() => {}}
                      clickable={false}
                    />
                  ))}
                </div>
              </div>

              <div className="contenedor-band-desc">
                <p className="descripcion">
                  {album.description || teamInfo.descripcion}
                </p>

                <img
                  src={teamInfo.banderaPrincipal}
                  alt={`Bandera ${album.name}`}
                  className={`bandera ${albumCompleto ? 'color' : ''}`}
                />
              </div>
            </div>
          </div>
        );
      })}

      <div
        className={`promo-final ${completaronTresSecciones ? 'completo' : ''}`}
        role={completaronTresSecciones ? 'button' : undefined}
        tabIndex={completaronTresSecciones ? 0 : undefined}
        onClick={completaronTresSecciones ? () => navigate(ROUTES.SELECCIONAR_VIAJE) : undefined}
        onKeyDown={
          completaronTresSecciones
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') navigate(ROUTES.SELECCIONAR_VIAJE);
              }
            : undefined
        }
      >
        <img
          src={completaronTresSecciones ? pelotaPremioCompleto : pelotaPremio}
          alt={completaronTresSecciones ? 'Premio FigusApp completo' : 'Premios FigusApp'}
        />
      </div>

        </div>
    
  );
}

export default Album;