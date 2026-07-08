import { useState, useEffect, useCallback, useRef } from 'react';
import { premios, type Premio } from '../data/premiosRuleta';
import { getAuthenticatedUser } from '../../user/services/authService';
import { useUserSpins } from './useUserSpins';
import { executeSecureSpin } from '../service/walletService';
import type { UserConfig } from '../../user/config/types/UserConfig';
import type { SpinResult } from '../types/SpingResult';
import { ROTACION_INICIAL } from '../constant/ruleta.constants';
import { useAuth } from '../../../routes/hooks/useAuth';

const SECTOR = 360 / premios.length;

export const useRuleta = (
  ruletaImgRef: React.RefObject<HTMLImageElement | null>,
  premiumsCircleRef: React.RefObject<HTMLDivElement | null>
) => {

  const [premioGanado, setPremioGanado] = useState<Premio | null>(null);
  const [isGirarndo, setIsGirando] = useState(false);
  const [isAutenticado, setIsAutenticado] = useState(false);
  const [girosInvitado, setGirosInvitado] = useState(10);

  const {
    spins,
    loadSpins,
    setSpins
  } = useUserSpins();

  const { refreshSpins } = useAuth();


  const rotacionRef = useRef(0);


  const girosRestantes =
    isAutenticado
      ? spins
      : girosInvitado;


  const girosRestantesRef =
    useRef(girosRestantes);



  useEffect(() => {

    girosRestantesRef.current =
      girosRestantes;

  }, [girosRestantes]);



  useEffect(() => {

    let activo = true;


    const verificarSesion = async () => {

      try {

        const user: UserConfig =
          await getAuthenticatedUser();


        if (user?.id && activo) {

          setIsAutenticado(true);

          await loadSpins(user.id);

        }


      } catch {

        if (activo) {

          setIsAutenticado(false);

        }

      }

    };


    verificarSesion();


    return () => {

      activo = false;

    };


  }, [loadSpins]);



  const ejecutarAnimacionGiro =
    useCallback(
      async (index: number) => {

        const anguloPremio =
          360 - (index * SECTOR);


        const vueltas =
          360 * 5;


        const nuevaRotacion =
          rotacionRef.current +
          vueltas +
          anguloPremio;


        rotacionRef.current =
          nuevaRotacion;


        const total =
          ROTACION_INICIAL +
          nuevaRotacion;



        if (premiumsCircleRef.current) {

          premiumsCircleRef.current.style.transform =
            `rotate(${total}deg)`;

        }



        if (ruletaImgRef.current) {

          ruletaImgRef.current.style.transform =
            `rotate(${total}deg)`;

        }


        await new Promise(resolve =>
          setTimeout(resolve, 3600)
        );


      },
      [
        premiumsCircleRef,
        ruletaImgRef
      ]
    );



  const realizarGiro =
    useCallback(
      async (cantidad: number) => {


        if (
          girosRestantesRef.current <= 0 ||
          isGirarndo
        ) {

          return;

        }

        setIsGirando(true);

        let disponibles =
          girosRestantesRef.current;

        try {

          for (
            let i = 0;
            i < cantidad;
            i++
          ) {

            if (disponibles <= 0) {

              break;

            }

            let premioIndex = 0;

            let premioObtenido:
              Premio | null = null;

            if (isAutenticado) {

              const resultadoServer:
                SpinResult =
                await executeSecureSpin();

              disponibles =
                Number(
                  resultadoServer.spins_remaining
                );

              girosRestantesRef.current =
                disponibles;

              setSpins(disponibles);
              refreshSpins();

              premioIndex =
                Number(
                  resultadoServer.index_wheel
                );

              premioObtenido =
                premios[premioIndex] ?? null;

            } else {
              disponibles--;

              girosRestantesRef.current =
                disponibles;

              setGirosInvitado(
                disponibles
              );

              premioIndex =
                Math.floor(
                  Math.random() *
                  premios.length
                );

              premioObtenido =
                premios[premioIndex] ?? null;

            }

            if (!premioObtenido) {
              continue;
            }

            await ejecutarAnimacionGiro(
              premioIndex
            );

            setPremioGanado(
              premioObtenido
            );

            await new Promise(resolve =>
              setTimeout(resolve, 2000)
            );
            setPremioGanado(null);

            if (
              i < cantidad - 1 &&
              disponibles > 0
            ) {
              await new Promise(resolve =>
                setTimeout(resolve, 400)
              );

            }
          }
        } catch (error) {
          console.error(
            "Error durante giro:",
            error
          );

        } finally {
          setIsGirando(false);
        }
      },
      [
        isAutenticado,
        ejecutarAnimacionGiro,
        isGirarndo,
        setSpins,
        refreshSpins,
      ]
    );

  return {
    girosRestantes,
    premioGanado,
    isGirarndo,
    realizarGiro

  };
};