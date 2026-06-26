import { useState, useCallback } from 'react';
import { getUserSpinsWallet } from '../service/walletService';
import type { SpinsWallet } from '../types/SpinsWallet';

interface UseUserSpinsReturn {
  spins: number;
  loadingSpins: boolean;
  loadSpins: (userId: number) => Promise<void>;
  setSpins: React.Dispatch<React.SetStateAction<number>>;
}

export const useUserSpins = (): UseUserSpinsReturn => {
  const [spins, setSpins] = useState<number>(0);
  const [loadingSpins, setLoadingSpins] = useState<boolean>(false);

  const loadSpins = useCallback(async (userId: number) => {
    setLoadingSpins(true);
    try {
      const wallet: SpinsWallet | null = await getUserSpinsWallet(userId);
      if (wallet) {
        setSpins(wallet.stock ?? 0);
      }
    } catch (error) {
      console.error(error);
      setSpins(0);
    } finally {
      setLoadingSpins(false);
    }
  }, []);

  return { spins, loadSpins, loadingSpins, setSpins };
};