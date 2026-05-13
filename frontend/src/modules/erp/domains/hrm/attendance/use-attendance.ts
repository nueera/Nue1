import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceService } from './attendance.service';
import { attendanceKeys } from './query-keys';

export function useAttendanceDaily(date: string) {
  return useQuery({
    queryKey: attendanceKeys.daily(date),
    queryFn: () => attendanceService.getDaily(date),
    enabled: !!date,
  });
}

export function useAttendanceMonthly(month: string) {
  return useQuery({
    queryKey: attendanceKeys.monthly(month),
    queryFn: () => attendanceService.getMonthly(month),
    enabled: !!month,
  });
}

export function useAttendanceSummary() {
  return useQuery({
    queryKey: attendanceKeys.summary(),
    queryFn: () => attendanceService.getSummary(),
  });
}

export function useCreateRegularization() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { date: string; checkIn: string; checkOut: string; reason: string }) =>
      attendanceService.createRegularization?.(data) ?? Promise.resolve(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: attendanceKeys.all });
    },
  });
}
