// Attachments Hooks — Cross-product
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attachmentsService } from './service';
import { attachmentsKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Attachment } from './types';

export function useAttachmentsList(params?: PaginatedRequest) {
  return useQuery({ queryKey: attachmentsKeys.list((params || {}) as Record<string, unknown>), queryFn: () => attachmentsService.getAll(params) });
}

export function useDeleteAttachment() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: attachmentsService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: attachmentsKeys.all }); } });
}

