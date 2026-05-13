// Employee
export type EmployeeStatus = 'active' | 'inactive' | 'on-leave' | 'onboarding' | 'notice' | 'terminated';
export type EmploymentType = 'full-time' | 'part-time' | 'contract' | 'intern';
export type Gender = 'male' | 'female' | 'other';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: EmployeeStatus;
  employmentType: EmploymentType;
  joinDate: string;
  salary: number;
  avatar: string;
  gender?: Gender;
  dateOfBirth?: string;
  address?: Address;
  emergencyContacts?: EmergencyContact[];
  bankDetails?: BankDetail;
  reportingManager?: string;
}

export interface Address {
  present: string;
  permanent: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface BankDetail {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
}

export interface Document {
  id: string;
  employeeId: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Compensation {
  id: string;
  employeeId: string;
  ctc: number;
  basicSalary: number;
  hra: number;
  da: number;
  specialAllowance: number;
  effectiveDate: string;
}

// Attendance
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half-day';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: AttendanceStatus;
}

export interface SwipeLog {
  id: string;
  attendanceId: string;
  timestamp: string;
  direction: 'in' | 'out';
  source: 'biometric' | 'mobile' | 'web';
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  graceMinutes: number;
}

export interface RegularizationRequest {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Leaves
export type LeaveType = 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'unpaid';
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  reason: string;
  approvedBy?: string;
  comments?: string;
}

export interface LeaveBalance {
  employeeId: string;
  leaveType: LeaveType;
  total: number;
  used: number;
  pending: number;
  available: number;
}

export interface LeavePolicy {
  id: string;
  leaveType: LeaveType;
  totalDays: number;
  carryForward: boolean;
  maxCarryForward: number;
  accrualFrequency: 'monthly' | 'quarterly' | 'yearly';
  probationPeriod: number;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'public' | 'company' | 'optional';
}

// Payroll
export type PayrollStatus = 'paid' | 'pending' | 'processing';

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  basicSalary: number;
  deductions: number;
  bonus: number;
  netSalary: number;
  status: PayrollStatus;
}

export interface PayrollRun {
  id: string;
  month: string;
  status: 'draft' | 'processing' | 'completed' | 'approved';
  totalEmployees: number;
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  processedAt?: string;
  approvedAt?: string;
}

export interface SalaryStructure {
  id: string;
  employeeId: string;
  ctc: number;
  basic: number;
  hra: number;
  da: number;
  specialAllowance: number;
  pf: number;
  esi: number;
  tax: number;
}

export interface Payslip {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  earnings: Array<{ label: string; amount: number }>;
  deductions: Array<{ label: string; amount: number }>;
  grossEarnings: number;
  totalDeductions: number;
  netPay: number;
}

export interface LoanAdvance {
  id: string;
  employeeId: string;
  type: 'loan' | 'advance';
  amount: number;
  emi: number;
  remainingAmount: number;
  status: 'active' | 'completed' | 'defaulted';
}

// Performance
export type ReviewStatus = 'draft' | 'in-progress' | 'completed';

export interface ReviewCycle {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: ReviewStatus;
  reviewers: string[];
}

export interface Goal {
  id: string;
  employeeId: string;
  cycleId: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'overdue';
}

export interface Review {
  id: string;
  cycleId: string;
  employeeId: string;
  reviewerId: string;
  type: 'self' | 'manager' | 'peer';
  rating: number;
  comments: string;
  status: ReviewStatus;
  submittedAt?: string;
}

export interface Feedback {
  id: string;
  fromEmployeeId: string;
  toEmployeeId: string;
  content: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface SkillRating {
  skill: string;
  rating: number;
  maxRating: number;
}

// Onboarding
export type OnboardingStage = 'pre-boarding' | 'day-one' | 'week-one' | 'month-one' | 'completed';

export interface OnboardingTask {
  id: string;
  templateId: string;
  title: string;
  description: string;
  category: 'it-setup' | 'hr' | 'team' | 'training' | 'documentation';
  assignee: 'hr' | 'manager' | 'it' | 'employee';
  dueOffsetDays: number;
  completed: boolean;
  completedAt?: string;
}

export interface OnboardingTemplate {
  id: string;
  name: string;
  department: string;
  tasks: OnboardingTask[];
}

export interface NewHire {
  id: string;
  employeeId: string;
  templateId: string;
  startDate: string;
  stage: OnboardingStage;
  tasks: OnboardingTask[];
  completionPct: number;
  buddy?: string;
  manager?: string;
}

export interface ExitInterview {
  id: string;
  employeeId: string;
  resignationDate: string;
  lastWorkingDate: string;
  reason: string;
  feedback: string;
  status: 'scheduled' | 'completed';
}

export interface FnFSettlement {
  id: string;
  employeeId: string;
  lastWorkingDate: string;
  noticePeriodDays: number;
  daysServed: number;
  basicSalary: number;
  leaveEncashment: number;
  deductions: number;
  totalAmount: number;
  status: 'pending' | 'processing' | 'paid';
}

// Shifts
export interface ShiftTiming {
  startTime: string;
  endTime: string;
  graceMinutes: number;
}

export interface ShiftType {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  graceMinutes: number;
  isNightShift: boolean;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShiftRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  requestedShiftId: string;
  requestedShiftName: string;
  currentShiftId: string;
  currentShiftName: string;
  reason: string;
  startDate: string;
  endDate?: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
}

export interface ShiftAssignment {
  id: string;
  employeeId: string;
  employeeName: string;
  shiftTypeId: string;
  shiftTypeName: string;
  startDate: string;
  endDate?: string;
  isRotating: boolean;
  rotationFrequency?: 'weekly' | 'bi-weekly' | 'monthly';
  createdAt: string;
  updatedAt: string;
}

// Expenses
export type ExpenseStatus = 'draft' | 'pending' | 'approved' | 'rejected' | 'paid';

export interface ExpenseCategory {
  id: string;
  name: string;
  description?: string;
  requiresReceipt: boolean;
  maxAmount?: number;
}

export interface ExpenseClaim {
  id: string;
  employeeId: string;
  employeeName: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  receiptUrl?: string;
  projectId?: string;
  isBillable: boolean;
  mileageKm?: number;
  travelFrom?: string;
  travelTo?: string;
  status: ExpenseStatus;
  approvedBy?: string;
  approvedAt?: string;
  rejectedReason?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeAdvance {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  reason: string;
  expectedSettlementDate: string;
  projectId?: string;
  status: 'pending' | 'approved' | 'disbursed' | 'settled';
  settledAmount?: number;
  settledAt?: string;
  approvedBy?: string;
  createdAt: string;
}

export interface TravelRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  purpose: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelMode: 'Flight' | 'Train' | 'Bus' | 'Car' | 'Other';
  estimatedCost: number;
  accommodationRequired: boolean;
  advanceRequired: boolean;
  advanceAmount?: number;
  notes?: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  approvedBy?: string;
  createdAt: string;
}

// Recruitment
export type JobOpeningStatus = 'draft' | 'open' | 'on-hold' | 'closed' | 'filled';
export type ApplicationStage = 'applied' | 'screening' | 'phone-screen' | 'technical' | 'managerial' | 'hr-round' | 'offer' | 'hired' | 'rejected';

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  position: string;
  employmentType: string;
  experienceLevel: string;
  minExperience: number;
  maxExperience: number;
  salaryMin: number;
  salaryMax: number;
  description: string;
  requirements: string;
  positions: number;
  filledPositions: number;
  deadline: string;
  location?: string;
  skills: string[];
  status: JobOpeningStatus;
  postedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  linkedInUrl?: string;
  currentCompany?: string;
  currentRole?: string;
  experience: number;
  skills: string[];
  source: string;
  createdAt: string;
}

export interface Application {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobId: string;
  jobTitle: string;
  stage: ApplicationStage;
  rating?: number;
  appliedAt: string;
  lastUpdatedAt: string;
  notes?: string;
  referredBy?: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  referrerName: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  jobId: string;
  jobTitle: string;
  relationship: string;
  notes?: string;
  resumeUrl?: string;
  status: 'pending' | 'contacted' | 'interviewed' | 'hired' | 'rejected';
  bonusAmount?: number;
  bonusPaid: boolean;
  createdAt: string;
}

export type InterviewStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';

export interface Interview {
  id: string;
  applicationId: string;
  candidateId: string;
  candidateName: string;
  jobId: string;
  jobTitle: string;
  interviewerIds: string[];
  interviewerNames: string[];
  type: 'phone' | 'video' | 'onsite' | 'panel';
  scheduledAt: string;
  duration: number;
  location?: string;
  notes?: string;
  feedback?: string;
  rating?: number;
  status: InterviewStatus;
  createdAt: string;
}

// Loans
export interface LoanType {
  id: string;
  name: string;
  description: string;
  interestRate: number;
  maxAmount: number;
  maxTenureMonths: number;
  repaymentFrequency: 'monthly' | 'quarterly';
  processingFee?: number;
  requiresGuarantor: boolean;
  maxLoanToSalaryRatio?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type LoanApplicationStatus = 'pending' | 'approved' | 'disbursed' | 'rejected' | 'closed' | 'in-repayment' | 'defaulted';

export interface LoanApplication {
  id: string;
  employeeId: string;
  employeeName: string;
  loanTypeId: string;
  loanTypeName: string;
  amount: number;
  approvedAmount?: number;
  tenureMonths: number;
  interestRate: number;
  purpose: string;
  guarantorId?: string;
  guarantorName?: string;
  supportingDocUrl?: string;
  status: LoanApplicationStatus;
  emi?: number;
  disbursalDate?: string;
  approvedBy?: string;
  approvedAt?: string;
  rejectedReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Loan {
  id: string;
  applicationId: string;
  employeeId: string;
  employeeName: string;
  loanTypeName: string;
  principal: number;
  outstandingBalance: number;
  interestRate: number;
  emi: number;
  tenureMonths: number;
  paidInstallments: number;
  nextDueDate: string;
  status: 'active' | 'completed' | 'defaulted';
  disbursalDate: string;
  maturityDate: string;
}

export interface RepaymentSchedule {
  month: number;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
  dueDate: string;
  isPaid: boolean;
  paidDate?: string;
}

// Training
export interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  category: string;
  deliveryMode: 'classroom' | 'online' | 'hybrid' | 'self-paced';
  startDate: string;
  endDate: string;
  durationHours: number;
  maxParticipants: number;
  enrolledCount: number;
  completedCount: number;
  trainer: string;
  location?: string;
  isMandatory: boolean;
  skills: string[];
  prerequisites: string[];
  status: 'draft' | 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface TrainingSession {
  id: string;
  programId: string;
  programTitle: string;
  sessionNumber: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  trainer: string;
  location?: string;
  attendanceCount?: number;
}

export type EnrollmentStatus = 'enrolled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';

export interface Enrollment {
  id: string;
  programId: string;
  programTitle: string;
  employeeId: string;
  employeeName: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  completedAt?: string;
  progress: number;
  durationHours: number;
  score?: number;
  certificateId?: string;
}

export interface TrainingFeedback {
  id: string;
  programId: string;
  programTitle: string;
  enrollmentId: string;
  employeeId: string;
  employeeName: string;
  rating: number;
  content: string;
  wouldRecommend?: boolean;
  trainerRating?: number;
  materialRating?: number;
  isAnonymous: boolean;
  createdAt: string;
}

export interface Certificate {
  id: string;
  enrollmentId: string;
  programId: string;
  programTitle: string;
  employeeId: string;
  employeeName: string;
  issueDate: string;
  expiryDate?: string;
  validityMonths: number;
  certificateUrl: string;
  certificateNumber: string;
  status: 'active' | 'expired' | 'expiring';
}

// Reports
export type ReportDataType = 'employee' | 'attendance' | 'leave' | 'payroll' | 'performance' | 'recruitment' | 'training' | 'expense' | 'shift' | 'loan';
export type ScheduleFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly';

export interface ReportConfig {
  id: string;
  name: string;
  category: string;
  description: string;
  fields: string[];
  defaultFilters: Array<{
    field: string;
    operator: string;
    value: unknown;
  }>;
  supportedChartTypes: string[];
  isBuiltIn: boolean;
}

export interface CustomReport {
  id: string;
  name: string;
  category: string;
  description: string;
  fields: string[];
  filters: Array<{
    field: string;
    operator: string;
    value: unknown;
  }>;
  groupBy: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  chartType?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedReport {
  id: string;
  customReportId?: string;
  reportConfigId?: string;
  name: string;
  category: string;
  parameters: Record<string, unknown>;
  resultData?: Record<string, unknown>[];
  format: 'pdf' | 'xlsx' | 'csv';
  scheduleFrequency?: ScheduleFrequency;
  scheduleRecipients: string[];
  scheduleIsActive: boolean;
  scheduleDayOfWeek?: number;
  scheduleDayOfMonth?: number;
  scheduleTime?: string;
  lastRunAt?: string;
  nextRunAt?: string;
  fileUrl?: string;
  createdBy: string;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
}
