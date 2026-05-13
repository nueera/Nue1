export const ATTENDANCE_STATUSES = ['All', 'present', 'absent', 'late', 'half-day'] as const;

export const SHIFT_CONFIGS = {
  general: { startTime: '09:00', endTime: '18:00', graceMinutes: 15 },
  morning: { startTime: '06:00', endTime: '14:00', graceMinutes: 10 },
  evening: { startTime: '14:00', endTime: '22:00', graceMinutes: 10 },
  night: { startTime: '22:00', endTime: '06:00', graceMinutes: 10 },
} as const;
