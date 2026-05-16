import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse } from '../../../types';
import type { Item, ItemGroup } from './types';

export const itemService = {
  getAll: (params?: Record<string, string | number | boolean | undefined>) =>
    financeApiClient.get<PaginatedResponse<Item>>('/books/items', params),
  getById: (id: string) =>
    financeApiClient.get<ApiResponse<Item>>(`/books/items/${id}`),
  create: (data: Partial<Item>) =>
    financeApiClient.post<ApiResponse<Item>>('/books/items', data),
  update: (id: string, data: Partial<Item>) =>
    financeApiClient.put<ApiResponse<Item>>(`/books/items/${id}`, data),
  delete: (id: string) =>
    financeApiClient.delete<ApiResponse<void>>(`/books/items/${id}`),
  search: (query: string) =>
    financeApiClient.get<ApiResponse<Item[]>>('/books/items/search', { q: query }),
  getGroups: () =>
    financeApiClient.get<ApiResponse<ItemGroup[]>>('/books/items/groups'),
  bulkDelete: (ids: string[]) =>
    financeApiClient.post<ApiResponse<void>>('/books/items/bulk-delete', { ids }),
};
