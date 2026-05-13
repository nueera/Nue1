// Simple mock handler registry - no MSW dependency
import { employees, getEmployeeById } from '../data/mock/employees.mock';
import { attendanceRecords } from '../data/mock/attendance.mock';
import { leaveRequests } from '../data/mock/leaves.mock';
import { payrollRecords, getPayrollByEmployeeId } from '../data/mock/payroll.mock';
import { reviewCycles, goals } from '../data/mock/performance.mock';
import { onboardingTemplates, newHires } from '../data/mock/onboarding.mock';
import { dashboardStats, recentActivities } from '../data/mock/dashboard.mock';
import { departments } from '../data/mock/departments.mock';
import { designations } from '../data/mock/designations.mock';
import { holidays } from '../data/mock/holidays.mock';
import { shifts } from '../data/mock/shifts.mock';
import { salaryStructures } from '../data/mock/salary-structures.mock';
import { notifications } from '../data/mock/notifications.mock';
import {
  expenseClaims,
  expenseCategories,
  employeeAdvances,
  travelRequests,
  getExpenseClaimById,
  getEmployeeAdvanceById,
  getTravelRequestById,
} from '../data/mock/expenses.mock';
import {
  jobOpenings,
  candidates,
  referrals,
  getJobOpeningById,
  getCandidateById,
  getReferralById,
} from '../data/mock/recruitment.mock';
import {
  loanTypes,
  loanApplications,
  getLoanApplicationById,
  getLoanTypeById,
  getRepaymentSchedule,
} from '../data/mock/loans.mock';
import {
  trainingPrograms,
  trainingEnrollments,
  trainingFeedbacks,
  getTrainingProgramById,
} from '../data/mock/training.mock';
import {
  reportConfigs,
  getReportConfigById,
  getReportDataByReportId,
} from '../data/mock/hrm-reports.mock';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Standard paginated wrapper */
function paginated<T>(data: T[], total?: number) {
  return { data, total: total ?? data.length, page: 1, pageSize: data.length };
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

const mockProfile = {
  id: 'EMP001',
  name: 'Sarah Chen',
  email: 'sarah.chen@nueone.com',
  role: 'admin',
  department: 'Engineering',
  avatar: '/avatars/sarah.jpg',
};

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

type MockHandler = (url: string) => unknown;

interface MockRoute {
  pattern: RegExp;
  method: string;
  handler: MockHandler;
}

const handlers: MockRoute[] = [
  // ── Auth ──────────────────────────────────────────────────────────────────
  { pattern: /\/auth\/login$/, method: 'POST', handler: () => ({ data: { accessToken: 'mock-jwt-token-xyz', user: mockProfile } }) },
  { pattern: /\/auth\/logout$/, method: 'POST', handler: () => ({ data: { success: true } }) },
  { pattern: /\/auth\/refresh$/, method: 'POST', handler: () => ({ data: { accessToken: 'mock-jwt-token-refreshed' } }) },
  { pattern: /\/auth\/profile$/, method: 'GET', handler: () => ({ data: mockProfile }) },

  // ── Employees ─────────────────────────────────────────────────────────────
  { pattern: /\/employees\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/employees\/([^/]+)$/);
    const id = match?.[1];
    const employee = id ? getEmployeeById(id) : null;
    return employee ? { data: employee } : null;
  }},
  { pattern: /\/employees$/, method: 'GET', handler: () => paginated(employees) },
  { pattern: /\/employees$/, method: 'POST', handler: () => {
    const newEmployee = {
      id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      status: 'onboarding',
      joinDate: new Date().toISOString().split('T')[0],
    };
    return { data: newEmployee };
  }},

  // ── Attendance ────────────────────────────────────────────────────────────
  { pattern: /\/attendance\/daily$/, method: 'GET', handler: () => paginated(attendanceRecords) },
  { pattern: /\/attendance\/monthly$/, method: 'GET', handler: () => paginated(attendanceRecords) },
  { pattern: /\/attendance\/summary$/, method: 'GET', handler: () => {
    const summary = {
      totalPresent: attendanceRecords.filter((a) => a.status === 'present').length,
      totalAbsent: attendanceRecords.filter((a) => a.status === 'absent').length,
      totalLate: attendanceRecords.filter((a) => a.status === 'late').length,
      totalHalfDay: attendanceRecords.filter((a) => a.status === 'half-day').length,
      averageWorkHours: 7.8,
    };
    return { data: summary };
  }},

  // ── Leaves ────────────────────────────────────────────────────────────────
  { pattern: /\/leaves\/balances\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/leaves\/balances\/([^/]+)$/);
    const userId = match?.[1] || '';
    const balances = [
      { leaveType: 'annual', total: 15, used: 5, pending: 1, available: 9 },
      { leaveType: 'sick', total: 10, used: 2, pending: 0, available: 8 },
      { leaveType: 'personal', total: 5, used: 1, pending: 0, available: 4 },
      { leaveType: 'maternity', total: 180, used: 0, pending: 0, available: 180 },
      { leaveType: 'paternity', total: 15, used: 0, pending: 0, available: 15 },
      { leaveType: 'unpaid', total: 30, used: 0, pending: 0, available: 30 },
    ];
    return { data: { employeeId: userId, balances } };
  }},
  { pattern: /\/leaves\/([^/]+)\/approve$/, method: 'POST', handler: (url) => {
    const match = url.match(/\/leaves\/([^/]+)\/approve$/);
    const id = match?.[1];
    const leave = leaveRequests.find((l) => l.id === id);
    return leave ? { data: { ...leave, status: 'approved' } } : null;
  }},
  { pattern: /\/leaves\/([^/]+)\/reject$/, method: 'POST', handler: (url) => {
    const match = url.match(/\/leaves\/([^/]+)\/reject$/);
    const id = match?.[1];
    const leave = leaveRequests.find((l) => l.id === id);
    return leave ? { data: { ...leave, status: 'rejected' } } : null;
  }},
  { pattern: /\/leaves$/, method: 'GET', handler: () => paginated(leaveRequests) },

  // ── Holidays ──────────────────────────────────────────────────────────────
  { pattern: /\/holidays$/, method: 'GET', handler: () => paginated(holidays) },

  // ── Payroll ───────────────────────────────────────────────────────────────
  { pattern: /\/payroll\/runs$/, method: 'GET', handler: () => {
    const runs = [
      {
        id: 'PR001', month: '2025-02', status: 'completed', totalEmployees: 25,
        totalGross: 312500, totalDeductions: 46875, totalNet: 265625,
        processedAt: '2025-02-28T10:00:00Z', approvedAt: '2025-02-28T14:00:00Z',
      },
      {
        id: 'PR002', month: '2025-03', status: 'draft', totalEmployees: 25,
        totalGross: 318750, totalDeductions: 47813, totalNet: 270937,
      },
    ];
    return paginated(runs);
  }},
  { pattern: /\/payroll\/payslip\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/payroll\/payslip\/([^/]+)$/);
    const id = match?.[1] || '';
    const record = getPayrollByEmployeeId(id);
    if (!record || record.length === 0) return null;
    const r = record[0];
    const payslip = {
      id: `PS-${r.id}`, employeeId: r.employeeId, employeeName: r.employeeName, month: r.month,
      earnings: [
        { label: 'Basic Salary', amount: r.basicSalary },
        { label: 'HRA', amount: Math.round(r.basicSalary * 0.4) },
        { label: 'Special Allowance', amount: Math.round(r.basicSalary * 0.3) },
      ],
      deductions: [
        { label: 'PF', amount: Math.round(r.basicSalary * 0.12) },
        { label: 'Tax', amount: r.deductions - Math.round(r.basicSalary * 0.12) },
      ],
      grossEarnings: r.basicSalary + Math.round(r.basicSalary * 0.4) + Math.round(r.basicSalary * 0.3),
      totalDeductions: r.deductions,
      netPay: r.netSalary,
    };
    return { data: payslip };
  }},
  { pattern: /\/payroll\/structures$/, method: 'GET', handler: () => paginated(salaryStructures) },
  { pattern: /\/payroll$/, method: 'GET', handler: () => paginated(payrollRecords) },

  // ── Performance ───────────────────────────────────────────────────────────
  { pattern: /\/performance\/cycles$/, method: 'GET', handler: () => paginated(reviewCycles) },
  { pattern: /\/performance\/goals\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/performance\/goals\/([^/]+)$/);
    const userId = match?.[1] || '';
    const userGoals = goals.filter((g) => g.employeeId === userId);
    return paginated(userGoals.length > 0 ? userGoals : goals);
  }},

  // ── Onboarding ────────────────────────────────────────────────────────────
  { pattern: /\/onboarding\/templates$/, method: 'GET', handler: () => paginated(onboardingTemplates) },
  { pattern: /\/onboarding\/new-hires$/, method: 'GET', handler: () => paginated(newHires) },
  { pattern: /\/onboarding\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/onboarding\/([^/]+)$/);
    const id = match?.[1];
    const hire = id ? newHires.find((h) => h.id === id || h.employeeId === id) : undefined;
    return hire ? { data: hire } : null;
  }},

  // ── Dashboard ─────────────────────────────────────────────────────────────
  { pattern: /\/dashboard\/stats$/, method: 'GET', handler: () => ({ data: dashboardStats }) },
  { pattern: /\/dashboard\/activity$/, method: 'GET', handler: () => paginated(recentActivities) },

  // ── Departments ───────────────────────────────────────────────────────────
  { pattern: /\/departments$/, method: 'GET', handler: () => paginated(departments) },

  // ── Designations ──────────────────────────────────────────────────────────
  { pattern: /\/designations$/, method: 'GET', handler: () => paginated(designations) },

  // ── Settings ──────────────────────────────────────────────────────────────
  { pattern: /\/settings$/, method: 'GET', handler: () => ({
    data: {
      companyName: 'NueOne Technologies',
      fiscalYearStart: 'April',
      leaveYearStart: 'January',
      workingHours: { start: '09:00', end: '18:00' },
      currency: 'USD',
      dateFormat: 'YYYY-MM-DD',
      timezone: 'America/New_York',
    },
  })},

  // ── Shifts ────────────────────────────────────────────────────────────────
  { pattern: /\/shifts\/types$/, method: 'GET', handler: () => {
    const shiftTypes = shifts.map((s) => ({
      ...s,
      isNightShift: s.name === 'Night',
      color: s.name === 'General' ? '#22c55e' : s.name === 'Morning' ? '#3b82f6' : s.name === 'Evening' ? '#f59e0b' : '#8b5cf6',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    }));
    return paginated(shiftTypes);
  }},
  { pattern: /\/shifts\/requests$/, method: 'GET', handler: () => {
    const shiftRequests = [
      {
        id: 'SR001', employeeId: 'EMP002', employeeName: 'Marcus Johnson',
        requestedShiftId: 'SHIFT003', requestedShiftName: 'Evening',
        currentShiftId: 'SHIFT001', currentShiftName: 'General',
        reason: 'Personal obligation - evening classes', startDate: '2025-03-15',
        status: 'pending', createdAt: '2025-03-01T09:00:00Z',
      },
      {
        id: 'SR002', employeeId: 'EMP006', employeeName: 'David Kim',
        requestedShiftId: 'SHIFT002', requestedShiftName: 'Morning',
        currentShiftId: 'SHIFT001', currentShiftName: 'General',
        reason: 'Prefers early schedule for commute', startDate: '2025-03-10',
        endDate: '2025-06-10', status: 'approved',
        approvedBy: 'EMP025', approvedAt: '2025-03-02T11:00:00Z',
        createdAt: '2025-03-01T14:30:00Z',
      },
    ];
    return paginated(shiftRequests);
  }},
  { pattern: /\/shifts\/assignments$/, method: 'GET', handler: () => {
    const shiftAssignments = [
      {
        id: 'SA001', employeeId: 'EMP001', employeeName: 'Sarah Chen',
        shiftTypeId: 'SHIFT001', shiftTypeName: 'General',
        startDate: '2025-01-01', isRotating: false,
        createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'SA002', employeeId: 'EMP006', employeeName: 'David Kim',
        shiftTypeId: 'SHIFT002', shiftTypeName: 'Morning',
        startDate: '2025-03-10', isRotating: false,
        createdAt: '2025-03-10T00:00:00Z', updatedAt: '2025-03-10T00:00:00Z',
      },
      {
        id: 'SA003', employeeId: 'EMP007', employeeName: 'Elena Rodriguez',
        shiftTypeId: 'SHIFT003', shiftTypeName: 'Evening',
        startDate: '2025-02-01', endDate: '2025-04-30',
        isRotating: true, rotationFrequency: 'monthly' as const,
        createdAt: '2025-02-01T00:00:00Z', updatedAt: '2025-02-01T00:00:00Z',
      },
    ];
    return paginated(shiftAssignments);
  }},
  { pattern: /\/shifts$/, method: 'GET', handler: () => paginated(shifts) },

  // ── Expenses ──────────────────────────────────────────────────────────────
  { pattern: /\/expenses\/claims\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/expenses\/claims\/([^/]+)$/);
    const claim = match?.[1] ? getExpenseClaimById(match[1]) : null;
    return claim ? { data: claim } : null;
  }},
  { pattern: /\/expenses\/categories$/, method: 'GET', handler: () => paginated(expenseCategories) },
  { pattern: /\/expenses\/advances\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/expenses\/advances\/([^/]+)$/);
    const advance = match?.[1] ? getEmployeeAdvanceById(match[1]) : null;
    return advance ? { data: advance } : null;
  }},
  { pattern: /\/expenses\/advances$/, method: 'GET', handler: () => paginated(employeeAdvances) },
  { pattern: /\/expenses\/travel\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/expenses\/travel\/([^/]+)$/);
    const travel = match?.[1] ? getTravelRequestById(match[1]) : null;
    return travel ? { data: travel } : null;
  }},
  { pattern: /\/expenses\/travel$/, method: 'GET', handler: () => paginated(travelRequests) },
  { pattern: /\/expenses\/claims$/, method: 'GET', handler: () => paginated(expenseClaims) },
  { pattern: /\/expenses$/, method: 'GET', handler: () => paginated([
    ...expenseClaims.map((c) => ({ ...c, type: 'claim' as const })),
    ...employeeAdvances.map((a) => ({ ...a, type: 'advance' as const })),
    ...travelRequests.map((t) => ({ ...t, type: 'travel' as const })),
  ])},

  // ── Recruitment ───────────────────────────────────────────────────────────
  { pattern: /\/recruitment$/, method: 'GET', handler: () => ({
    data: {
      openPositions: jobOpenings.filter((j) => j.status === 'open').length,
      totalApplicants: jobOpenings.reduce((sum, j) => sum + j.applicants, 0),
      interviewsScheduled: 4,
      offersPending: 1,
    },
  })},
  { pattern: /\/recruitment\/openings\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/recruitment\/openings\/([^/]+)$/);
    const opening = match?.[1] ? getJobOpeningById(match[1]) : null;
    return opening ? { data: opening } : null;
  }},
  { pattern: /\/recruitment\/openings$/, method: 'GET', handler: () => paginated(jobOpenings) },
  { pattern: /\/recruitment\/candidates\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/recruitment\/candidates\/([^/]+)$/);
    const candidate = match?.[1] ? getCandidateById(match[1]) : null;
    return candidate ? { data: candidate } : null;
  }},
  { pattern: /\/recruitment\/candidates$/, method: 'GET', handler: () => paginated(candidates) },
  { pattern: /\/recruitment\/referrals\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/recruitment\/referrals\/([^/]+)$/);
    const referral = match?.[1] ? getReferralById(match[1]) : null;
    return referral ? { data: referral } : null;
  }},
  { pattern: /\/recruitment\/referrals$/, method: 'GET', handler: () => paginated(referrals) },

  // ── Loans ─────────────────────────────────────────────────────────────────
  { pattern: /\/loans\/types$/, method: 'GET', handler: () => paginated(loanTypes) },
  { pattern: /\/loans\/applications\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/loans\/applications\/([^/]+)$/);
    const application = match?.[1] ? getLoanApplicationById(match[1]) : null;
    return application ? { data: application } : null;
  }},
  { pattern: /\/loans\/applications$/, method: 'GET', handler: () => paginated(loanApplications) },
  { pattern: /\/loans\/([^/]+)\/repayment$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/loans\/([^/]+)\/repayment$/);
    const schedule = match?.[1] ? getRepaymentSchedule(match[1]) : [];
    return paginated(schedule);
  }},
  { pattern: /\/loans$/, method: 'GET', handler: () => paginated(loanApplications) },

  // ── Training ──────────────────────────────────────────────────────────────
  { pattern: /\/training$/, method: 'GET', handler: () => ({
    data: {
      totalPrograms: trainingPrograms.length,
      activePrograms: trainingPrograms.filter((p) => p.status === 'in-progress').length,
      upcomingPrograms: trainingPrograms.filter((p) => p.status === 'upcoming').length,
      totalEnrollments: trainingEnrollments.length,
      completionRate: Math.round(
        (trainingEnrollments.filter((e) => e.status === 'completed').length /
          trainingEnrollments.length) *
          100
      ),
    },
  })},
  { pattern: /\/training\/programs\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/training\/programs\/([^/]+)$/);
    const program = match?.[1] ? getTrainingProgramById(match[1]) : null;
    return program ? { data: program } : null;
  }},
  { pattern: /\/training\/programs$/, method: 'GET', handler: () => paginated(trainingPrograms) },
  { pattern: /\/training\/enrollments$/, method: 'GET', handler: () => paginated(trainingEnrollments) },
  { pattern: /\/training\/feedback$/, method: 'GET', handler: () => paginated(trainingFeedbacks) },

  // ── HRM Reports ───────────────────────────────────────────────────────────
  { pattern: /\/hrm-reports\/([^/]+)$/, method: 'GET', handler: (url) => {
    const match = url.match(/\/hrm-reports\/([^/]+)$/);
    const id = match?.[1] || '';
    const config = getReportConfigById(id);
    if (!config) return null;
    const reportData = getReportDataByReportId(id);
    return { data: { config, reportData } };
  }},
  { pattern: /\/hrm-reports\/schedule$/, method: 'POST', handler: () => ({
    data: {
      id: `SCH${Date.now()}`,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  })},
  { pattern: /\/hrm-reports$/, method: 'GET', handler: () => paginated(reportConfigs) },

  // ── Notifications ─────────────────────────────────────────────────────────
  { pattern: /\/notifications$/, method: 'GET', handler: () => paginated(notifications) },
];

export function getMockResponse(url: string, method: string = 'GET'): unknown | null {
  for (const route of handlers) {
    if (route.pattern.test(url) && route.method === method.toUpperCase()) {
      return route.handler(url);
    }
  }
  return null;
}

export { handlers };
