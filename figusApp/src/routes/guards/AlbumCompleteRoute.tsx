/**
 * Guard de ruta que valida si el usuario completó los álbumes requeridos.
 *
 * Controla el acceso a rutas específicas verificando el progreso del usuario.
 * Si no cumple la condición, redirige al apartado del álbum.
 */

import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import {
  getAllAlbums,
  getAlbumProgress,
} from "../../components/album/services/albumService";

import { ROUTES } from "../constants/routes.constants";

/**
 * Información básica de un álbum.
 */
interface AlbumData {
  id: number;
  name: string;
}

/**
 * Información del progreso de un álbum.
 */
interface AlbumProgressData {
  album: AlbumData;
  stickers: Array<{ obtained: boolean }>;
}

/**
 * Verifica que los álbumes requeridos estén completos
 * antes de permitir el acceso a una ruta protegida.
 */
export function AlbumCompleteRoute() {
  const [isComplete, setIsComplete] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Consulta el progreso del usuario y determina
   * si puede continuar a la siguiente sección.
   */
  useEffect(() => {
    const checkAlbumCompletion = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setIsComplete(false);
          setLoading(false);
          return;
        }

        const tokenData = JSON.parse(atob(token.split(".")[1]));
        const userId =
          tokenData.user_id ||
          tokenData.userId ||
          tokenData.sub ||
          tokenData.id;

        if (!userId) {
          console.error("No userId found in token", tokenData);
          setIsComplete(false);
          setLoading(false);
          return;
        }

        const albums = await getAllAlbums();

        const albumProgress = await Promise.all(
          albums.map((album: AlbumData) =>
            getAlbumProgress(album.id, userId)
          )
        );

        const requiredSections = ["argentina", "brasil", "francia"];

        /**
         * Obtiene la sección asociada a un álbum según su nombre.
         */
        const getAlbumKey = (album: AlbumData) => {
          const name = album.name.toLowerCase();

          if (name.includes("argentina")) return "argentina";
          if (name.includes("brasil")) return "brasil";
          if (name.includes("franc")) return "francia";

          return "argentina";
        };

        const albumsWithProgress = albumProgress.map((progress) => ({
          key: getAlbumKey(progress.album),
          progress: progress as AlbumProgressData,
        }));

        const allComplete = requiredSections.every((section) => {
          const album = albumsWithProgress.find(
            (item) => item.key === section
          );

          if (!album) return false;

          const stickers = album.progress.stickers;

          return (
            stickers.length > 0 &&
            stickers.every((sticker) => sticker.obtained)
          );
        });

        setIsComplete(allComplete);
      } catch (error) {
        console.error("Error checking album completion:", error);
        setIsComplete(false);
      } finally {
        setLoading(false);
      }
    };

    void checkAlbumCompletion();
  }, []);

  if (loading) return null;

  /**
   * Si el usuario no completó los álbumes,
   * se redirige a la sección correspondiente.
   */
  if (!isComplete) {
    return <Navigate to={ROUTES.ALBUM} replace />;
  }

  return <Outlet />;
}