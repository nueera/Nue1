import type { LeaveRequest } from '../data/mock/leaves.mock';
import { leaveRequests, getLeavesByEmployeeId } from '../data/mock/leaves.mock';

export const leaveApi = {
  getAll: async (): Promise<LeaveRequest[]> => leaveRequests,
  getByEmployeeId: async (employeeId: string): Promise<LeaveRequest[]> => getLeavesByEmployeeId(employeeId),
};
