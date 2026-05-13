'use client';

import { createContext, useContext } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useStoreHydrated } from '../hooks/use-store-hydrated';
import type { User, Role } from '../types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  role: Role | null;
  hydrated: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  role: null,
  hydrated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuthStore();
  const hydrated = useStoreHydrated();

  return (
    <AuthContext.Provider
      value={{
        user: hydrated ? user : null,
        isAuthenticated: hydrated ? isAuthenticated : false,
        role: hydrated && user ? user.role : null,
        hydrated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
