// @ts-nocheck
// Import Hooks — Cross-product
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { importService } from './service';
import { importKeys } from './query-keys';

export function useGetImportTemplates(entityType: string) {
  return useQuery({
    queryKey: [...importKeys.all, 'templates', entityType],
    queryFn: () => importService.getTemplates(entityType),
    enabled: !!entityType,
  });
}

export function useUploadImportFile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ file, entityType }: { file: File; entityType: string }) => importService.uploadFile(file, entityType),
    onSuccess: () => { qc.invalidateQueries({ queryKey: importKeys.all }); },
  });
}

export function useGetImportStatus(jobId: string) {
  return useQuery({
    queryKey: [...importKeys.all, 'status', jobId],
    queryFn: () => importService.getImportStatus(jobId),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data as { data?: { status?: string } } | undefined;
      if (status?.data?.status === 'completed' || status?.data?.status === 'failed') return false;
      return 2000;
    },
  });
}

export function useStartImport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: importService.startImport,
    onSuccess: () => { qc.invalidateQueries({ queryKey: importKeys.all }); },
  });
}

export function useCancelImport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: importService.cancelImport,
    onSuccess: () => { qc.invalidateQueries({ queryKey: importKeys.all }); },
  });
}

export function useGetImportErrors(jobId: string) {
  return useQuery({
    queryKey: [...importKeys.all, 'errors', jobId],
    queryFn: () => importService.getErrors(jobId),
    enabled: !!jobId,
  });
}
