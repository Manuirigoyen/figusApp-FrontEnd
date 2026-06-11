import { useState, useCallback } from 'react';
import { getUserSpinsWallet } from '../service/walletService';

export const useUserSpins = () => {
  const [spins, setSpins] = useState<number>(0);
  const [loadingSpins, setLoadingSpins] = useState<boolean>(false);

  const loadSpins = useCallback(async (userId: number) => {
    setLoadingSpins(true);
    try {
      const wallet = await getUserSpinsWallet(userId);
      if (wallet) {
        setSpins(wallet.stock ?? 0);
      }
    } catch (error) {
      console.error("Error al cargar giros:", error);
      setSpins(0);
    } finally {
      setLoadingSpins(false);
    }
  }, []);

  return { spins, loadSpins, loadingSpins };
};