export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'ATT001', employeeId: 'EMP001', employeeName: 'Sarah Chen', date: '2025-02-24', checkIn: '08:55', checkOut: '17:30', status: 'present' },
  { id: 'ATT002', employeeId: 'EMP002', employeeName: 'Marcus Johnson', date: '2025-02-24', checkIn: '09:15', checkOut: '17:45', status: 'late' },
  { id: 'ATT003', employeeId: 'EMP003', employeeName: 'Priya Patel', date: '2025-02-24', checkIn: '08:45', checkOut: '17:15', status: 'present' },
  { id: 'ATT004', employeeId: 'EMP004', employeeName: 'James Wilson', date: '2025-02-24', checkIn: '08:30', checkOut: '17:00', status: 'present' },
  { id: 'ATT005', employeeId: 'EMP005', employeeName: 'Aisha Rahman', date: '2025-02-24', checkIn: '09:00', checkOut: '13:00', status: 'half-day' },
  { id: 'ATT006', employeeId: 'EMP006', employeeName: 'David Kim', date: '2025-02-24', checkIn: '08:50', checkOut: '17:20', status: 'present' },
  { id: 'ATT007', employeeId: 'EMP007', employeeName: 'Elena Rodriguez', date: '2025-02-24', checkIn: '-', checkOut: '-', status: 'absent' },
  { id: 'ATT008', employeeId: 'EMP008', employeeName: 'Tyler Brooks', date: '2025-02-24', checkIn: '08:40', checkOut: '17:35', status: 'present' },
  { id: 'ATT009', employeeId: 'EMP009', employeeName: 'Mei Zhang', date: '2025-02-24', checkIn: '09:05', checkOut: '17:10', status: 'late' },
  { id: 'ATT010', employeeId: 'EMP010', employeeName: 'Robert Taylor', date: '2025-02-24', checkIn: '-', checkOut: '-', status: 'absent' },
  { id: 'ATT011', employeeId: 'EMP001', employeeName: 'Sarah Chen', date: '2025-02-23', checkIn: '08:50', checkOut: '17:25', status: 'present' },
  { id: 'ATT012', employeeId: 'EMP002', employeeName: 'Marcus Johnson', date: '2025-02-23', checkIn: '08:45', checkOut: '17:30', status: 'present' },
  { id: 'ATT013', employeeId: 'EMP003', employeeName: 'Priya Patel', date: '2025-02-23', checkIn: '09:20', checkOut: '17:45', status: 'late' },
  { id: 'ATT014', employeeId: 'EMP004', employeeName: 'James Wilson', date: '2025-02-23', checkIn: '08:30', checkOut: '17:00', status: 'present' },
  { id: 'ATT015', employeeId: 'EMP005', employeeName: 'Aisha Rahman', date: '2025-02-23', checkIn: '08:55', checkOut: '17:20', status: 'present' },
  { id: 'ATT016', employeeId: 'EMP006', employeeName: 'David Kim', date: '2025-02-23', checkIn: '08:40', checkOut: '17:10', status: 'present' },
  { id: 'ATT017', employeeId: 'EMP008', employeeName: 'Tyler Brooks', date: '2025-02-23', checkIn: '09:10', checkOut: '17:30', status: 'late' },
  { id: 'ATT018', employeeId: 'EMP009', employeeName: 'Mei Zhang', date: '2025-02-23', checkIn: '08:50', checkOut: '13:00', status: 'half-day' },
  { id: 'ATT019', employeeId: 'EMP011', employeeName: 'Fatima Al-Hassan', date: '2025-02-24', checkIn: '08:55', checkOut: '17:20', status: 'present' },
  { id: 'ATT020', employeeId: 'EMP012', employeeName: 'Lucas Anderson', date: '2025-02-24', checkIn: '08:35', checkOut: '17:15', status: 'present' },
  { id: 'ATT021', employeeId: 'EMP013', employeeName: 'Sofia Martinez', date: '2025-02-24', checkIn: '09:25', checkOut: '17:40', status: 'late' },
  { id: 'ATT022', employeeId: 'EMP014', employeeName: 'Nathan Clark', date: '2025-02-24', checkIn: '08:45', checkOut: '17:10', status: 'present' },
  { id: 'ATT023', employeeId: 'EMP017', employeeName: 'Raj Krishnan', date: '2025-02-24', checkIn: '08:50', checkOut: '17:25', status: 'present' },
  { id: 'ATT024', employeeId: 'EMP020', employeeName: 'Grace Lee', date: '2025-02-24', checkIn: '08:40', checkOut: '17:20', status: 'present' },
  { id: 'ATT025', employeeId: 'EMP025', employeeName: "Michael O'Brien", date: '2025-02-24', checkIn: '08:30', checkOut: '17:00', status: 'present' },
];

export function getAttendanceByEmployeeId(employeeId: string): AttendanceRecord[] {
  return attendanceRecords.filter((a) => a.employeeId === employeeId);
}
