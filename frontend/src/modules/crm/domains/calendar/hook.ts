import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { calendarService } from "./service";
import { calendarKeys } from "./query-keys";

export function useCalendarEvents(params?: Record<string, string | number | boolean | undefined>) {
  return useQuery({ queryKey: calendarKeys.list(params || {}), queryFn: () => calendarService.getAll(params) });
}

export function useCalendarEvent(id: string) {
  return useQuery({ queryKey: calendarKeys.detail(id), queryFn: () => calendarService.getById(id), enabled: !!id });
}

export function useCreateCalendarEvent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: calendarService.create, onSuccess: () => { qc.invalidateQueries({ queryKey: calendarKeys.all }); } });
}

export function useUpdateCalendarEvent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string; data: Partial<CalendarEvent> }) => calendarService.update(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: calendarKeys.all }); } });
}

export function useDeleteCalendarEvent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: calendarService.delete, onSuccess: () => { qc.invalidateQueries({ queryKey: calendarKeys.all }); } });
}