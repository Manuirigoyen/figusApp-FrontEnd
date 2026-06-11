import { useState, useEffect, useCallback, useRef } from 'react';
import { premios } from '../data/premiosRuleta';
import { getAuthenticatedUser } from '../../user/services/authService';
import { useUserSpins } from './useUserSpins';
import { executeSecureSpin } from '../service/walletService';
import type { UserConfig } from '../../user/config/types/UserConfig';
import { ROTACION_INICIAL } from '../constant/ruleta.constants';

const SECTOR = 360 / premios.length;

export const useRuleta = (
  ruletaImgRef: React.RefObject<HTMLImageElement | null>,
  premiumsCircleRef: React.RefObject<HTMLDivElement | null>
) => {
  const [girosRestantes, setGirosRestantes] = useState<number>(10);
  const [premioGanado, setPremioGanado] = useState<any | null>(null);
  const [isGirarndo, setIsGirando] = useState<boolean>(false);
  const [isAutenticado, setIsAutenticado] = useState<boolean>(false);

  const { spins, loadSpins } = useUserSpins();
  const rotacionRef = useRef<number>(0);
  const girosRestantesRef = useRef<number>(10);

  useEffect(() => {
    girosRestantesRef.current = girosRestantes;
  }, [girosRestantes]);

  useEffect(() => {
    const verificarSesionYGiros = async () => {
      try {
        const user: UserConfig = await getAuthenticatedUser();
        if (user && user.id) {
          setIsAutenticado(true);
          await loadSpins(user.id);
        }
      } catch {
        setIsAutenticado(false);
        setGirosRestantes(10);
      }
    };
    verificarSesionYGiros();
  }, [loadSpins]);

  useEffect(() => {
    if (isAutenticado && spins >= 0) {
      setGirosRestantes(spins);
    }
  }, [spins, isAutenticado]);

  const esperarTransicion = (elemento: HTMLElement): Promise<void> => {
    return new Promise((resolve) => {
      const handler = () => {
        elemento.removeEventListener('transitionend', handler);
        resolve();
      };
      setTimeout(resolve, 3600);
      elemento.addEventListener('transitionend', handler);
    });
  };

  const ejecutarAnimacionGiro = async (indicePremio: number): Promise<void> => {
    // Calculamos el ángulo necesario para que el índice caiga en el marcador (arriba).
    // Usamos (360 - (indice * SECTOR)) para contrarrestar el giro horario
    const anguloParaPremio = 360 - (indicePremio * SECTOR);
    const vueltasExtras = 360 * 5; 
    
    // Sumamos al valor acumulado actual para que la ruleta no se reinicie
    const nuevaRotacion = rotacionRef.current + vueltasExtras + anguloParaPremio;
    rotacionRef.current = nuevaRotacion;
    
    const total = ROTACION_INICIAL + rotacionRef.current;

    if (premiumsCircleRef.current) premiumsCircleRef.current.style.transform = `rotate(${total}deg)`;
    if (ruletaImgRef.current) ruletaImgRef.current.style.transform = `rotate(${total}deg)`;

    if (ruletaImgRef.current) {
      await esperarTransicion(ruletaImgRef.current);
    }
  };

  const realizarGiro = useCallback(async (cantidad: number): Promise<void> => {
    if (girosRestantesRef.current <= 0 || isGirarndo) return;

    setIsGirando(true);
    let girosDisponibles = girosRestantesRef.current;

    try {
      for (let i = 0; i < cantidad; i++) {
        if (girosDisponibles <= 0) break;

        let premioIndex = 0;
        let premioObtenido: any = null;

        if (isAutenticado) {
          const resultadoServer = await executeSecureSpin();
          premioIndex = Number(resultadoServer.index_wheel);
          girosDisponibles = Number(resultadoServer.spins_remaining);
          premioObtenido = premios[premioIndex];
        } else {
          girosDisponibles -= 1;
          premioIndex = Math.floor(Math.random() * premios.length);
          premioObtenido = premios[premioIndex];
        }

        setGirosRestantes(girosDisponibles);
        await ejecutarAnimacionGiro(premioIndex);

        setPremioGanado(premioObtenido);
        await new Promise((r) => setTimeout(r, 2000));
        setPremioGanado(null);

        if (i < cantidad - 1 && girosDisponibles > 0) {
          await new Promise((r) => setTimeout(r, 400));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsGirando(false);
    }
  }, [isGirarndo, isAutenticado]);

  return {
    girosRestantes,
    premioGanado,
    isGirarndo,
    realizarGiro,
  };
};