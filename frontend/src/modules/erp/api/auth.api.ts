import { apiClient } from './client';
import type { ApiResponse } from './types';

interface LoginPayload {
  email: string;
  password: string;
}

export const authApi = {
  login: (payload: LoginPayload) =>
    apiClient.post<ApiResponse<{ accessToken: string }>>('/auth/login', payload),
  logout: () =>
    apiClient.post<ApiResponse<void>>('/auth/logout'),
  getProfile: () =>
    apiClient.get<ApiResponse<{ name: string; email: string }>>('/auth/profile'),
};
