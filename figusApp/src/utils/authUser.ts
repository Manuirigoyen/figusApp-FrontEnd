export const API_BASE = import.meta.env.VITE_API_BASE;

export interface authUser {
  id: number;
  role: 'admin' | 'user';
}