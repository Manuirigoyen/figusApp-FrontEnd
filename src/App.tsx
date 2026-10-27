import React from 'react';
import { FiguritaCard } from './components/album/Figurita';
import type { SeccionAlbum } from './types/figurita';
import albumJson from './data/river-plate-2008.json';

const seccion3: SeccionAlbum = albumJson.paginas_album['3'];
const seccion4: SeccionAlbum = albumJson.paginas_album['4'];

export function App(): React.ReactElement {
  const figuritasPagina4 = seccion4.figuritas.slice(0, 6);
  const fila1Pag4 = figuritasPagina4.slice(0, 3);
  const fila2Pag4 = figuritasPagina4.slice(3, 6);

  return (
    <main className="min-h-screen flex justify-center items-center p-6">
      <div className="w-[920px] h-[700px] bg-[url('/albums/river-plate-2008/extras/fondo.png')] bg-[length:100%_100%] bg-center bg-no-repeat grid grid-cols-2 box-border relative shadow-2xl">
        <div className="w-full h-full flex flex-col justify-center items-center px-[45px] py-[40px] box-border relative">
          <div className="grid grid-cols-2 gap-0 w-full max-w-[280px] items-center justify-items-center">
            {seccion3.figuritas.map((figurita) => (
              <FiguritaCard
                key={figurita.imagen}
                figurita={figurita}
              />
            ))}
          </div>
        </div>

        <div className="w-full h-full flex flex-col justify-center items-center gap-8 px-[45px] py-[50px] box-border relative">

          <div className="grid grid-cols-3 gap-6 w-full items-center justify-items-center">
            {fila1Pag4.map((figurita, index) => (
              <div
                key={figurita.imagen}
                className={`transition-transform duration-300 ease-in-out ${index === 1 ? '-translate-y-[18px]' : 'translate-y-0'
                  }`}
              >
                <FiguritaCard figurita={figurita} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 w-full items-center justify-items-center">
            {fila2Pag4.map((figurita, index) => (
              <div
                key={figurita.imagen}
                className={`transition-transform duration-300 ease-in-out ${index === 1 ? 'translate-y-[18px]' : 'translate-y-0'
                  }`}
              >
                <FiguritaCard figurita={figurita} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}