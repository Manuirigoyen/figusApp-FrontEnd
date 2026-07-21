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
  const isGirandoRef = useRef(false);


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


        // Fuerza un reflow y espera dos frames antes de aplicar el nuevo
        // transform. Sin esto, si se gira varias veces seguidas muy rápido
        // (x5/x10, o clicks encadenados), el navegador puede no llegar a
        // "confirmar" el estilo anterior y saltarse la transición CSS por
        // completo (la rueda salta directo al final en vez de animar).
        if (premiumsCircleRef.current) {
          // Leer una propiedad de layout fuerza el reflow.
          void premiumsCircleRef.current.offsetHeight;
        }

        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => resolve());
          });
        });


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
          isGirandoRef.current
        ) {

          return;

        }

        // Se marca de forma SINCRÓNICA (ref), no con setState, para cerrar
        // la ventana de carrera de un doble click/doble evento antes de que
        // React vuelva a renderizar y deshabilite el botón.
        isGirandoRef.current = true;
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

              const rawIndex =
                Number(
                  resultadoServer.index_wheel
                );

              // El backend puede tener MÁS combinaciones de premio configuradas
              // (ej: 15 filas en la tabla "prize") que segmentos visuales tiene
              // la rueda dibujada acá (12, fijos por CSS). Si no envolvemos el
              // índice, un valor como 12/13/14 cae fuera del array `premios` y
              // la animación se salteaba por completo (aunque el giro ya se
              // había descontado) — eso era el "tilde" intermitente.
              premioIndex =
                ((rawIndex % premios.length) + premios.length) %
                premios.length;

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
          isGirandoRef.current = false;
          setIsGirando(false);
        }
      },
      [
        isAutenticado,
        ejecutarAnimacionGiro,
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