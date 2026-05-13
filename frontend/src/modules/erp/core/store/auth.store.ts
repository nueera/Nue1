import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: AuthState['user']) => void;
  logout: () => void;
}

const DEFAULT_USER: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@nueone.io',
  avatar: 'AU',
  role: 'admin',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      isAuthenticated: true,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'nueone-auth-store' }
  )
);
