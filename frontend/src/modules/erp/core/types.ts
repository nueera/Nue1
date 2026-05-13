// User & Auth
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
}

export type Role = 'admin' | 'manager' | 'employee' | 'hr';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

// API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface PaginatedRequest {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
