export { employees, getEmployeeById } from './employees.mock';
export type { Employee } from './employees.mock';

export { attendanceRecords, getAttendanceByEmployeeId } from './attendance.mock';
export type { AttendanceRecord } from './attendance.mock';

export { leaveRequests, getLeavesByEmployeeId } from './leaves.mock';
export type { LeaveRequest } from './leaves.mock';

export { payrollRecords, getPayrollByEmployeeId } from './payroll.mock';
export type { PayrollRecord } from './payroll.mock';

export { reviewCycles, goals } from './performance.mock';
export { onboardingTemplates, newHires } from './onboarding.mock';
export { dashboardStats, recentActivities } from './dashboard.mock';
export { departments } from './departments.mock';
export { designations } from './designations.mock';
export { holidays } from './holidays.mock';
export { shifts } from './shifts.mock';
export { salaryStructures } from './salary-structures.mock';
export { notifications } from './notifications.mock';

export { expenseClaims, expenseCategories, employeeAdvances, travelRequests, getExpenseClaimById, getEmployeeAdvanceById, getTravelRequestById } from './expenses.mock';
export type { ExpenseClaim, ExpenseCategory, EmployeeAdvance, TravelRequest } from './expenses.mock';

export { jobOpenings, candidates, referrals, getJobOpeningById, getCandidatesByJobOpening, getCandidateById, getReferralById } from './recruitment.mock';
export type { JobOpening, Candidate, Referral } from './recruitment.mock';

export { loanTypes, loanApplications, repaymentSchedules, getLoanApplicationById, getLoanTypeById, getRepaymentSchedule } from './loans.mock';
export type { LoanType, LoanApplication, RepaymentSchedule } from './loans.mock';

export { trainingPrograms, trainingEnrollments, trainingFeedbacks, getTrainingProgramById, getEnrollmentsByProgramId, getEnrollmentsByEmployeeId, getFeedbackByProgramId } from './training.mock';
export type { TrainingProgram, TrainingEnrollment, TrainingFeedback } from './training.mock';

export { reportConfigs, reportDataSets, getReportConfigById, getReportDataByReportId } from './hrm-reports.mock';
export type { ReportConfig, ReportData } from './hrm-reports.mock';

export {
  mockCategories, mockSuppliers, mockWarehouses, mockProducts,
  mockInventory, mockLowStockAlerts, mockPurchaseOrders, mockSalesOrders,
  mockErpDashboard, getProductById, getSupplierById, getWarehouseById, getCategoryById,
} from './operations.mock';
export type {
  Category, Supplier, Warehouse, Product, InventoryItem,
  PurchaseOrder, SalesOrder, LowStockAlert, ErpDashboardData,
} from '../../types/erp-operations';
