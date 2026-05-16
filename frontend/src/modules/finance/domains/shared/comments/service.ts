// Comments Service — Cross-product
import { financeApiClient } from '../../../api/client';
import type { ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';
import type { Comment } from './types';

export const commentsService = {
  getAll: (params?: PaginatedRequest) => {
    return financeApiClient.get<PaginatedResponse<Comment>>('/shared/comments', params as Record<string, string | number | boolean | undefined>);
  },
  getById: (id: string) => {
    return financeApiClient.get<ApiResponse<Comment>>('/shared/comments/' + id);
  },
  create: (data: Partial<Comment>) => {
    return financeApiClient.post<ApiResponse<Comment>>('/shared/comments', data);
  },
  update: (id: string, data: Partial<Comment>) => {
    return financeApiClient.put<ApiResponse<Comment>>('/shared/comments/' + id, data);
  },
  delete: (id: string) => {
    return financeApiClient.delete<ApiResponse<void>>('/shared/comments/' + id);
  },
  addReaction: (id: string, emoji: string) => {
    // TODO: Implement addReaction
    return Promise.resolve({ success: true, data: {} as never });
  },
  removeReaction: (id: string, emoji: string) => {
    // TODO: Implement removeReaction
    return Promise.resolve({ success: true, data: {} as never });
  },
  getByEntity: (entityType: string, entityId: string) => {
    // TODO: Implement getByEntity
    return Promise.resolve({ success: true, data: {} as never });
  },
};
