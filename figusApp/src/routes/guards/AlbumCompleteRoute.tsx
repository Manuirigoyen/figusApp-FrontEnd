import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAllAlbums, getAlbumProgress } from "../../components/album/services/albumService";
import { ROUTES } from "../routes.constants";

interface AlbumData {
  id: number;
  name: string;
}

interface AlbumProgressData {
  album: AlbumData;
  stickers: Array<{ obtained: boolean }>;
}

export function AlbumCompleteRoute() {
  const [isComplete, setIsComplete] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAlbumCompletion = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsComplete(false);
          setLoading(false);
          return;
        }

        // Extract userId from token - try multiple field names
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        const userId = tokenData.user_id || tokenData.userId || tokenData.sub || tokenData.id;

        if (!userId) {
          console.error("No userId found in token", tokenData);
          setIsComplete(false);
          setLoading(false);
          return;
        }

        // Get all albums
        const albums = await getAllAlbums();

        // Check if the three required sections exist and are complete
        const albumProgress = await Promise.all(
          albums.map((album: AlbumData) => getAlbumProgress(album.id, userId))
        );

        const requiredSections = ["argentina", "brasil", "francia"];

        const getAlbumKey = (album: AlbumData) => {
          const name = album.name.toLowerCase();
          if (name.includes('argentina')) return 'argentina';
          if (name.includes('brasil')) return 'brasil';
          if (name.includes('franc')) return 'francia';
          return 'argentina';
        };

        const albumsWithProgress = albumProgress.map((progress) => ({
          key: getAlbumKey(progress.album),
          progress: progress as AlbumProgressData,
        }));

        const allComplete = requiredSections.every((section) => {
          const album = albumsWithProgress.find((a) => a.key === section);
          if (!album) return false;

          const stickers = album.progress.stickers;
          return stickers.length > 0 && stickers.every((sticker) => sticker.obtained);
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

  if (!isComplete) {
    return <Navigate to={ROUTES.ALBUM} replace />;
  }

  return <Outlet />;
}
