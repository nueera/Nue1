// Storefront Hooks — Zoho Commerce
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { storefrontService } from './service';
import { storefrontKeys } from './query-keys';
import type { PaginatedRequest } from '../../../types/finance-common';
import type { Storefront } from './types';

export function useUpdateStorefront() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<Storefront> }) => storefrontService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: storefrontKeys.all }); } });
}

