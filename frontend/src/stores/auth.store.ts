// ============================================================================
// Auth Store — JWT-based authentication with Zustand
// ============================================================================
// Connects to FastAPI backend /api/v1/auth endpoints
// Stores JWT token in localStorage for persistence across page reloads
// ============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient, tokenStorage, API_ENDPOINTS } from '@/lib/api';

// ── Types ──────────────────────────────────────────────────────────────────

interface User {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  role: string;
  created_at: string;
  updated_at: string;
  // Computed helpers for UI components (avatar initials, display name)
  name: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, full_name: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
  clearError: () => void;
  initialize: () => Promise<void>;
}

// ── Store ──────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Call FastAPI backend login endpoint
          const response = await apiClient.post<{ access_token: string }>(
            API_ENDPOINTS.AUTH.LOGIN,
            { email, password },
            { skipAuth: true } as any // skipAuth for login
          );

          const { access_token } = response;

          // Store token in both localStorage (for API client) and Zustand
          tokenStorage.setAccessToken(access_token);
          set({ accessToken: access_token, isAuthenticated: true });

          // Fetch user profile with the new token
          await get().fetchProfile();
        } catch (error: any) {
          const message =
            error?.message || 'Login failed. Please check your credentials.';
          set({ error: message, isAuthenticated: false, accessToken: null });
          tokenStorage.clearAll();
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (email: string, password: string, full_name: string) => {
        set({ isLoading: true, error: null });
        try {
          // Call FastAPI backend register endpoint
          const user = await apiClient.post<User>(
            API_ENDPOINTS.AUTH.REGISTER,
            { email, password, full_name },
            { skipAuth: true } as any
          );

          // After registration, auto-login
          await get().login(email, password);
        } catch (error: any) {
          const message =
            error?.message || 'Registration failed. Please try again.';
          set({ error: message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        tokenStorage.clearAll();
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          error: null,
        });
        // Redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      },

      fetchProfile: async () => {
        try {
          const profile = await apiClient.get<Record<string, unknown>>(API_ENDPOINTS.AUTH.ME);
          // Map backend fields to include computed helpers for UI
          const user: User = {
            id: profile.id as number,
            email: profile.email as string,
            full_name: profile.full_name as string,
            is_active: profile.is_active as boolean,
            role: profile.role as string,
            created_at: profile.created_at as string,
            updated_at: profile.updated_at as string,
            // Computed: use full_name as display name, initials as avatar
            name: (profile.full_name as string) || (profile.email as string).split('@')[0],
            avatar: ((profile.full_name as string) || (profile.email as string))
              .split(' ')
              .map((w: string) => w[0])
              .join('')
              .toUpperCase()
              .slice(0, 2),
          };
          set({ user, isAuthenticated: true });
        } catch (error: any) {
          // If profile fetch fails, token might be invalid
          set({ user: null, isAuthenticated: false, accessToken: null });
          tokenStorage.clearAll();
        }
      },

      clearError: () => set({ error: null }),

      initialize: async () => {
        // Check if we have a stored token
        const token = tokenStorage.getAccessToken();
        if (token) {
          set({ accessToken: token, isAuthenticated: true });
          await get().fetchProfile();
        } else {
          set({ user: null, accessToken: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'nueone-auth-store',
      // Only persist these fields (not isLoading, error, etc.)
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
