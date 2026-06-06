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
    const cantGiros = 360 * 5 + indicePremio * SECTOR + SECTOR / 2;
    rotacionRef.current += cantGiros;
    const nuevaRotacion = ROTACION_INICIAL + rotacionRef.current;

    if (premiumsCircleRef.current) premiumsCircleRef.current.style.transform = `rotate(${nuevaRotacion}deg)`;
    if (ruletaImgRef.current) ruletaImgRef.current.style.transform = `rotate(${nuevaRotacion}deg)`;

    if (ruletaImgRef.current) {
      await esperarTransicion(ruletaImgRef.current);
    }
  };

  const realizarGiro = useCallback(async (cantidad: number): Promise<void> => {
    if (girosRestantes <= 0 || isGirarndo) return;

    setIsGirando(true);
    let girosDisponibles = girosRestantes;

    for (let i = 0; i < cantidad; i++) {
      if (girosDisponibles <= 0) break;

      let premioIndex = 0;
      let premioObtenido: any = null;

      if (isAutenticado) {
        try {
          const resultadoServer = await executeSecureSpin();
          premioIndex = resultadoServer.index_wheel; 
          girosDisponibles = resultadoServer.spins_remaining;
          
          premioObtenido = premios[premioIndex]; 
        } catch (error) {
          console.error("Giro rechazado por el servidor:", error);
          break; 
        }
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
    setIsGirando(false);
  }, [girosRestantes, isGirarndo, isAutenticado]);

  return {
    girosRestantes,
    premioGanado,
    isGirarndo,
    realizarGiro,
  };
};