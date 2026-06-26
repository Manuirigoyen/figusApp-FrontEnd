import type { authUser } from '../../utils/authUser';

export interface AuthContextType {
  user: authUser | null;
  loading: boolean;
  spins: number;
  refreshUser: () => Promise<void>;
  refreshSpins: () => Promise<void>;
  logout: () => void;
}