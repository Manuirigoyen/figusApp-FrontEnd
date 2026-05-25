import { useEffect, useState } from 'react';
import { getUserProfile } from '../services/getUserProfile';
import type { UserProfile } from '../interfaces/UserProfile';

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error? err.message : 'Error');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  return { user, setUser, isLoading, error };
};