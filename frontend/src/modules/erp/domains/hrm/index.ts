// ─── Shared Domain Exports ──────────────────────────────────────────────────
export * from './types';
export * from './constants';

// ─── Sub-module Namespace Exports (12 sub-modules) ─────────────────────────

// Core HR
export * as EmployeesModule from './employees';
export * as AttendanceModule from './attendance';
export * as LeavesModule from './leaves';
export * as PayrollModule from './payroll';
export * as PerformanceModule from './performance';
export * as OnboardingModule from './onboarding';

// Workforce & Operations
export * as ShiftsModule from './shifts';
export * as ExpensesModule from './expenses';
export * as RecruitmentModule from './recruitment';

// Financial & Development
export * as LoansModule from './loans';
export * as TrainingModule from './training';
export * as ReportsModule from './reports';

// ─── Re-export commonly used items for convenience ─────────────────────────

// Employee hooks & services
export { useEmployees, useEmployee, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from './employees';
export { employeeService } from './employees';
export { getFullName, getInitials, getYearsOfService, calcAge } from './employees';

// Attendance hooks & services
export { useAttendanceDaily, useAttendanceMonthly, useAttendanceSummary, useCreateRegularization } from './attendance';
export { attendanceService } from './attendance';
export { calcWorkHours, calcOvertime, isLate, fmtDuration } from './attendance';

// Leave hooks & services
export { useLeaves, useLeaveBalances, useApplyLeave, useApproveLeave, useRejectLeave } from './leaves';
export { leaveService } from './leaves';
export { calcWorkingDays, calcLeaveDuration, isHoliday, getNextWorkingDay } from './leaves';

// Payroll hooks & services
export { usePayrollRecords, usePayrollRuns, usePayslip, useRunPayroll } from './payroll';
export { payrollService } from './payroll';
export { calcGross, calcPF, calcESI, calcTax, calcNet, fmtCurrency } from './payroll';

// Performance hooks & services
export { useReviewCycles, useGoals, useReviews, useFeedback, useCreateCycle, useSetGoal, useSubmitReview } from './performance';
export { performanceService } from './performance';
export { calcAvgRating, getRatingColor, getGoalCompletionPct } from './performance';

// Onboarding hooks & services
export { useTemplates, useNewHires, useHireDetail, useCreateTemplate, useCreateHire, useUpdateTask } from './onboarding';
export { onboardingService } from './onboarding';
export { calcCompletionPct, getDaysSinceJoin, isOverdue } from './onboarding';

// Shift hooks & services
export { useShiftTypes, useShiftType, useShiftRequests, useShiftAssignments, useCreateShiftType, useCreateShiftRequest, useApproveShiftRequest, useRejectShiftRequest, useCreateShiftAssignment, useUpdateShiftAssignment, useDeleteShiftAssignment } from './shifts';
export { shiftService } from './shifts';
export { calcShiftHours, isNightShift, getShiftOverlap } from './shifts';

// Expense hooks & services
export { useExpenses, useExpenseClaim, useExpenseCategories, useAdvances, useTravelRequests, useCreateClaim, useApproveClaim, useRejectClaim, useRequestAdvance, useCreateTravelRequest } from './expenses';
export { expenseService } from './expenses';
export { calcMileage, calcPerDiem, fmtExpenseAmount, calcExpenseTotal, calcTravelDays } from './expenses';

// Recruitment hooks & services
export { useJobOpenings, useJobOpening, useCandidates, useApplications, useInterviews, useReferrals, useCreateJobOpening, useUpdateJobOpening, useReferCandidate, useScheduleInterview, useUpdateApplicationStage } from './recruitment';
export { recruitmentService } from './recruitment';
export { getStageColor, calcTimeToHire, getFitScore, getStageLabel, getOpeningStatusLabel } from './recruitment';

// Loan hooks & services
export { useLoanTypes, useLoanApplications, useLoanApplication, useActiveLoans, useRepaymentSchedule, useCreateLoanType, useApplyLoan, useApproveLoan, useRejectLoan } from './loans';
export { loanService } from './loans';
export { calcEMI, calcInterest, calcOutstandingBalance, generateRepaymentSchedule } from './loans';

// Training hooks & services
export { useTrainingPrograms, useTrainingProgram, useTrainingSessions, useEnrollments, useMyEnrollments, useTrainingFeedback, useCertificates, useCreateProgram, useEnrollTraining, useSubmitTrainingFeedback, useCancelEnrollment } from './training';
export { trainingService } from './training';
export { calcCompletionRate, getAvgFeedbackScore, getCertExpiry, isCertExpiringSoon, isCertExpired, calcTrainingHours } from './training';

// Reports hooks & services
export { useReportConfigs, useReportConfig, useReportData, useCustomReports, useCustomReport, useSavedReports, useScheduledReports, useCreateCustomReport, useUpdateCustomReport, useDeleteCustomReport, useScheduleReport, useSaveReport, useExportReport } from './reports';
export { reportService } from './reports';
export { aggregateData, calcPercentage, buildReportQuery } from './reports';

// ─── Shared Components ──────────────────────────────────────────────────────
export * from './components';
