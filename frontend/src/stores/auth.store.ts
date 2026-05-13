import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  // actions
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

      setUser: (user) =>
        set({ user, isAuthenticated: !!user }),

      logout: () =>
        set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'nueone-auth-store',
    }
  )
);
