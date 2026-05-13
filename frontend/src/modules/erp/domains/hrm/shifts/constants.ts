export const SHIFT_LABELS: Record<string, string> = {
  general: 'General Shift',
  morning: 'Morning Shift',
  evening: 'Evening Shift',
  night: 'Night Shift',
  rotating: 'Rotating Shift',
  flexible: 'Flexible Shift',
};

export const SHIFT_TIMING_PRESETS = [
  { name: 'General (09:00 - 18:00)', startTime: '09:00', endTime: '18:00', graceMinutes: 15 },
  { name: 'Morning (06:00 - 14:00)', startTime: '06:00', endTime: '14:00', graceMinutes: 10 },
  { name: 'Evening (14:00 - 22:00)', startTime: '14:00', endTime: '22:00', graceMinutes: 10 },
  { name: 'Night (22:00 - 06:00)', startTime: '22:00', endTime: '06:00', graceMinutes: 10 },
  { name: 'Mid (10:00 - 19:00)', startTime: '10:00', endTime: '19:00', graceMinutes: 15 },
] as const;

export const SHIFT_REQUEST_STATUSES = ['All', 'pending', 'approved', 'rejected'] as const;

export const SHIFT_REQUEST_REASONS = [
  'Medical',
  'Personal',
  'Transport',
  'Childcare',
  'Education',
  'Other',
] as const;
