import { apiClient } from './api-client';
import type { User, TokenPair, ApiResponse } from '../types';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  tokens: TokenPair;
}

export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<ApiResponse<LoginResponse>>('/auth/login', payload),

  logout: () =>
    apiClient.post<ApiResponse<void>>('/auth/logout'),

  refreshToken: (refreshToken: string) =>
    apiClient.post<ApiResponse<TokenPair>>('/auth/refresh', { refreshToken }),

  getProfile: () =>
    apiClient.get<ApiResponse<User>>('/auth/profile'),
};
