import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shiftService } from './shift.service';
import { shiftKeys } from './query-keys';

export function useShiftTypes(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: shiftKeys.types(),
    queryFn: () => shiftService.getShiftTypes(params),
  });
}

export function useShiftType(id: string) {
  return useQuery({
    queryKey: shiftKeys.type(id),
    queryFn: () => shiftService.getShiftType(id),
    enabled: !!id,
  });
}

export function useShiftRequests(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: shiftKeys.requests(params || {}),
    queryFn: () => shiftService.getRequests(params),
  });
}

export function useShiftAssignments(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({
    queryKey: shiftKeys.assignments(params || {}),
    queryFn: () => shiftService.getAssignments(params),
  });
}

export function useCreateShiftType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shiftService.createShiftType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shiftKeys.all });
    },
  });
}

export function useCreateShiftRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shiftService.createRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shiftKeys.all });
    },
  });
}

export function useApproveShiftRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => shiftService.approveRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shiftKeys.all });
    },
  });
}

export function useRejectShiftRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      shiftService.rejectRequest(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shiftKeys.all });
    },
  });
}

export function useCreateShiftAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shiftService.createAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shiftKeys.all });
    },
  });
}

export function useUpdateShiftAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, string | number | boolean | undefined> }) =>
      shiftService.updateAssignment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shiftKeys.all });
    },
  });
}

export function useDeleteShiftAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shiftService.deleteAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shiftKeys.all });
    },
  });
}
