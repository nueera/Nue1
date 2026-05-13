'use client';

import { useAuthStore } from '../store/auth.store';
import { useStoreHydrated } from './use-store-hydrated';
import type { Role } from '../types';

export function useAuth() {
  const { user, isAuthenticated, setUser, logout } = useAuthStore();
  const hydrated = useStoreHydrated();

  return {
    user: hydrated ? user : null,
    isAuthenticated: hydrated ? isAuthenticated : false,
    setUser,
    logout,
    hydrated,
  };
}

export function useRoleCheck(allowedRoles: Role[]) {
  const { user } = useAuth();
  return user ? allowedRoles.includes(user.role) : false;
}
