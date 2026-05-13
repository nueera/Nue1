import type { AttendanceRecord } from '../data/mock/attendance.mock';
import { attendanceRecords, getAttendanceByEmployeeId } from '../data/mock/attendance.mock';

export const attendanceApi = {
  getAll: async (): Promise<AttendanceRecord[]> => attendanceRecords,
  getByEmployeeId: async (employeeId: string): Promise<AttendanceRecord[]> => getAttendanceByEmployeeId(employeeId),
};
