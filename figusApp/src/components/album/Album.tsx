// src/components/Album.tsx
// Componente principal que muestra el álbum de figuritas organizado por equipos
import { useEffect, useState, useCallback, useMemo } from 'react';


import FiguritaCard from './FiguritaCard';
import './album.css';
import './FiguritaCard.css';
import { ALL_FIGURITAS } from './data/figuritasData';
import type { Figurita } from './data/figuritasData';
import { TEAMS_INFO } from './data/teamsData';
import { calculateProgress, getProgressBarColor, isTeamComplete } from './utils/albumUtils';
import type { Billetera, BilleteraItem } from './types/index';
import { useLocalStorage } from './hooks/useLocalStorage';
import { STORAGE_KEYS } from './constants/storageKeys';

/**
 * Componente Album - Muestra todas las figuritas organizadas por equipos
 *
 * Funcionalidades:
 * - Muestra figuritas agrupadas por equipo (Argentina, Brasil, Francia)
 * - Permite hacer click en figuritas para completarlas o agregar repetidas
 * - Muestra barra de progreso por equipo
 * - Guarda estado en localStorage
 *
 * @returns Componente React con el álbum completo
 */
function Album() {
  const [figuritas, setFiguritas] = useState<Figurita[]>([]);
  const [figuritasCompletas, setFiguritasCompletas] = useLocalStorage<string[]>(STORAGE_KEYS.FIGURITAS_COMPLETAS, []);
  const [billetera, setBilletera] = useLocalStorage<Billetera>(STORAGE_KEYS.BILLETERA, {});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const figuritasWithState = ALL_FIGURITAS.map(fig => ({
        ...fig,
        isComplete: figuritasCompletas.includes(fig.id)
      }));
      setFiguritas(figuritasWithState);
      setIsLoading(false);
    } catch (e) {
      console.error("Error al cargar el álbum:", e);
      setError("No se pudo cargar el álbum.");
    }
  }, [figuritasCompletas]);

  const handleFiguritaClick = useCallback((clickedFiguritaId: string) => {
    const figurita = figuritas.find(fig => fig.id === clickedFiguritaId);

    if (!figurita) return;

    if (!figurita.isComplete) {
      // Primer click: marcar como completa
      setFiguritasCompletas(prev => [...prev, clickedFiguritaId]);
      setFiguritas(prev =>
        prev.map(fig =>
          fig.id === clickedFiguritaId ? { ...fig, isComplete: true } : fig
        )
      );
    } else {
      // Segundo o más clicks: agregar a billetera como repetida
      setBilletera(prevBilletera => {
        const newCount = (prevBilletera[clickedFiguritaId]?.count || 0) + 1;
        return {
          ...prevBilletera,
          [clickedFiguritaId]: { count: newCount }
        };
      });
    }
  }, [figuritas, setFiguritasCompletas, setBilletera]);

  const equiposAgrupados = useMemo(() => {
    const teamMap = new Map();

    figuritas.forEach(fig => {
      if (!teamMap.has(fig.teamId)) {
        const info = TEAMS_INFO[fig.teamId as keyof typeof TEAMS_INFO];
        teamMap.set(fig.teamId, { ...info, figuritas: [] });
      }
      teamMap.get(fig.teamId)?.figuritas.push(fig);
    });
    return Array.from(teamMap.values());
  }, [figuritas]);

  const allFiguritasComplete = useMemo(() => {
    return figuritas.length > 0 && figuritas.every(fig => fig.isComplete);
  }, [figuritas]);

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
      <h1 className="main-title">
        MIS ALBUMES
      </h1>

      {equiposAgrupados.map(team => {
        const totalCards = team.figuritas.length;
        const completadas = team.figuritas.filter((fig: Figurita) => fig.isComplete).length;
        const porcentaje = calculateProgress(totalCards, completadas);
        const progressBarColor = getProgressBarColor(porcentaje);
        const teamCompleted = isTeamComplete(completadas, totalCards);

        return (
          <div key={team.name} id={team.name.toLowerCase()} className="team">
            <h2 className="titulo-seleccion">
              {team.name}
              <img
                src={team.banderaIcono}
                alt={`Bandera ${team.name}`}
                className="icono-bandera"
              />
            </h2>
            <div className="album-layout">
              <div className="contenido-album">
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${porcentaje}%`, backgroundColor: progressBarColor }}
                  ></div>
                  <span className="progress-text">Progreso: {porcentaje}%</span>
                </div>
                <div className="cards">
                  {team.figuritas.map((fig: Figurita) => (
                    <FiguritaCard
                      key={fig.id}
                      figurita={fig}
                      onFiguritaClick={handleFiguritaClick}
                    />
                  ))}
                </div>
              </div>
              <div className="contenedor-band-desc">
                <p className="descripcion">{team.descripcion}</p>
                <img
                  src={team.banderaPrincipal}
                  alt={`Bandera ${team.name}`}
                  className={`bandera ${teamCompleted ? 'color' : ''}`}
                />
              </div>
            </div>
          </div>
        );
      })}

      <div id="promo-final" className="promo-final">
        <div id="mensaje-incompleto" className={`mensaje ${allFiguritasComplete ? 'oculto' : ''}`}>
          <h4>Completa el álbum</h4>
          <h3>y GANÁ</h3>
          <h2>PREMIOS INCREIBLES!!!!</h2>
          <p>Viajes a elección: Colombia, México o Brasil!!!</p>
        </div>
        <div id="mensaje-completo" className={`mensaje ${!allFiguritasComplete ? 'oculto' : ''}`}>
          <h2>FELICIDADES!!</h2>
          <h3>Completaste el álbum!</h3>
          <a href="#" className="boton-viaje">CLICK <br />AQUÍ</a>
        </div>
      </div>
    </div>
  );
}

export default Album;