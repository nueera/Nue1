export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'annual' | 'sick' | 'personal' | 'maternity';
  startDate: string;
  endDate: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

export const leaveRequests: LeaveRequest[] = [
  { id: 'LV001', employeeId: 'EMP007', employeeName: 'Elena Rodriguez', type: 'annual', startDate: '2025-02-20', endDate: '2025-02-28', days: 7, status: 'approved', reason: 'Family vacation to Spain' },
  { id: 'LV002', employeeId: 'EMP015', employeeName: 'Yuki Tanaka', type: 'sick', startDate: '2025-02-22', endDate: '2025-02-25', days: 4, status: 'approved', reason: 'Flu and recovery' },
  { id: 'LV003', employeeId: 'EMP003', employeeName: 'Priya Patel', type: 'personal', startDate: '2025-03-10', endDate: '2025-03-11', days: 2, status: 'pending', reason: 'Moving to a new apartment' },
  { id: 'LV004', employeeId: 'EMP001', employeeName: 'Sarah Chen', type: 'annual', startDate: '2025-04-01', endDate: '2025-04-05', days: 5, status: 'pending', reason: 'Spring break trip' },
  { id: 'LV005', employeeId: 'EMP012', employeeName: 'Lucas Anderson', type: 'personal', startDate: '2025-03-15', endDate: '2025-03-15', days: 1, status: 'approved', reason: 'Doctor appointment' },
  { id: 'LV006', employeeId: 'EMP009', employeeName: 'Mei Zhang', type: 'annual', startDate: '2025-03-20', endDate: '2025-03-25', days: 6, status: 'pending', reason: 'Visiting family overseas' },
  { id: 'LV007', employeeId: 'EMP004', employeeName: 'James Wilson', type: 'sick', startDate: '2025-02-10', endDate: '2025-02-11', days: 2, status: 'approved', reason: 'Migraine' },
  { id: 'LV008', employeeId: 'EMP018', employeeName: 'Isabella Costa', type: 'personal', startDate: '2025-03-05', endDate: '2025-03-07', days: 3, status: 'rejected', reason: 'Personal errands' },
  { id: 'LV009', employeeId: 'EMP021', employeeName: 'Hassan Ali', type: 'annual', startDate: '2025-04-14', endDate: '2025-04-18', days: 5, status: 'pending', reason: 'Honeymoon' },
  { id: 'LV010', employeeId: 'EMP024', employeeName: 'Lily Nguyen', type: 'sick', startDate: '2025-02-18', endDate: '2025-02-19', days: 2, status: 'approved', reason: 'Dental surgery' },
  { id: 'LV011', employeeId: 'EMP008', employeeName: 'Tyler Brooks', type: 'personal', startDate: '2025-03-22', endDate: '2025-03-22', days: 1, status: 'pending', reason: 'Car inspection' },
  { id: 'LV012', employeeId: 'EMP005', employeeName: 'Aisha Rahman', type: 'maternity', startDate: '2025-05-01', endDate: '2025-07-24', days: 60, status: 'pending', reason: 'Maternity leave' },
];

export function getLeavesByEmployeeId(employeeId: string): LeaveRequest[] {
  return leaveRequests.filter((l) => l.employeeId === employeeId);
}
