export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  salary: number;
  avatar: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

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

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  basicSalary: number;
  deductions: number;
  bonus: number;
  netSalary: number;
  status: 'paid' | 'pending' | 'processing';
}

export const employees: Employee[] = [
  {
    id: 'EMP001',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@nueone.io',
    phone: '+1 (555) 101-2001',
    department: 'Engineering',
    position: 'Senior Frontend Engineer',
    status: 'active',
    joinDate: '2022-03-15',
    salary: 125000,
    avatar: 'SC',
  },
  {
    id: 'EMP002',
    firstName: 'Marcus',
    lastName: 'Johnson',
    email: 'marcus.johnson@nueone.io',
    phone: '+1 (555) 101-2002',
    department: 'Engineering',
    position: 'Backend Engineer',
    status: 'active',
    joinDate: '2022-07-01',
    salary: 118000,
    avatar: 'MJ',
  },
  {
    id: 'EMP003',
    firstName: 'Priya',
    lastName: 'Patel',
    email: 'priya.patel@nueone.io',
    phone: '+1 (555) 101-2003',
    department: 'Marketing',
    position: 'Marketing Manager',
    status: 'active',
    joinDate: '2021-11-20',
    salary: 98000,
    avatar: 'PP',
  },
  {
    id: 'EMP004',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@nueone.io',
    phone: '+1 (555) 101-2004',
    department: 'Sales',
    position: 'Sales Director',
    status: 'active',
    joinDate: '2020-06-10',
    salary: 135000,
    avatar: 'JW',
  },
  {
    id: 'EMP005',
    firstName: 'Aisha',
    lastName: 'Rahman',
    email: 'aisha.rahman@nueone.io',
    phone: '+1 (555) 101-2005',
    department: 'HR',
    position: 'HR Specialist',
    status: 'active',
    joinDate: '2023-01-09',
    salary: 78000,
    avatar: 'AR',
  },
  {
    id: 'EMP006',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@nueone.io',
    phone: '+1 (555) 101-2006',
    department: 'Finance',
    position: 'Financial Analyst',
    status: 'active',
    joinDate: '2022-09-05',
    salary: 92000,
    avatar: 'DK',
  },
  {
    id: 'EMP007',
    firstName: 'Elena',
    lastName: 'Rodriguez',
    email: 'elena.rodriguez@nueone.io',
    phone: '+1 (555) 101-2007',
    department: 'Operations',
    position: 'Operations Lead',
    status: 'on-leave',
    joinDate: '2021-04-22',
    salary: 105000,
    avatar: 'ER',
  },
  {
    id: 'EMP008',
    firstName: 'Tyler',
    lastName: 'Brooks',
    email: 'tyler.brooks@nueone.io',
    phone: '+1 (555) 101-2008',
    department: 'Engineering',
    position: 'DevOps Engineer',
    status: 'active',
    joinDate: '2023-03-15',
    salary: 115000,
    avatar: 'TB',
  },
  {
    id: 'EMP009',
    firstName: 'Mei',
    lastName: 'Zhang',
    email: 'mei.zhang@nueone.io',
    phone: '+1 (555) 101-2009',
    department: 'Engineering',
    position: 'Full Stack Developer',
    status: 'active',
    joinDate: '2022-11-01',
    salary: 110000,
    avatar: 'MZ',
  },
  {
    id: 'EMP010',
    firstName: 'Robert',
    lastName: 'Taylor',
    email: 'robert.taylor@nueone.io',
    phone: '+1 (555) 101-2010',
    department: 'Sales',
    position: 'Account Executive',
    status: 'inactive',
    joinDate: '2021-08-14',
    salary: 85000,
    avatar: 'RT',
  },
  {
    id: 'EMP011',
    firstName: 'Fatima',
    lastName: 'Al-Hassan',
    email: 'fatima.alhassan@nueone.io',
    phone: '+1 (555) 101-2011',
    department: 'Marketing',
    position: 'Content Strategist',
    status: 'active',
    joinDate: '2023-05-20',
    salary: 82000,
    avatar: 'FA',
  },
  {
    id: 'EMP012',
    firstName: 'Lucas',
    lastName: 'Anderson',
    email: 'lucas.anderson@nueone.io',
    phone: '+1 (555) 101-2012',
    department: 'Finance',
    position: 'Senior Accountant',
    status: 'active',
    joinDate: '2020-12-01',
    salary: 95000,
    avatar: 'LA',
  },
  {
    id: 'EMP013',
    firstName: 'Sofia',
    lastName: 'Martinez',
    email: 'sofia.martinez@nueone.io',
    phone: '+1 (555) 101-2013',
    department: 'HR',
    position: 'Recruitment Lead',
    status: 'active',
    joinDate: '2022-02-14',
    salary: 88000,
    avatar: 'SM',
  },
  {
    id: 'EMP014',
    firstName: 'Nathan',
    lastName: 'Clark',
    email: 'nathan.clark@nueone.io',
    phone: '+1 (555) 101-2014',
    department: 'Operations',
    position: 'Supply Chain Analyst',
    status: 'active',
    joinDate: '2023-07-10',
    salary: 79000,
    avatar: 'NC',
  },
  {
    id: 'EMP015',
    firstName: 'Yuki',
    lastName: 'Tanaka',
    email: 'yuki.tanaka@nueone.io',
    phone: '+1 (555) 101-2015',
    department: 'Engineering',
    position: 'QA Engineer',
    status: 'on-leave',
    joinDate: '2022-05-18',
    salary: 95000,
    avatar: 'YT',
  },
  {
    id: 'EMP016',
    firstName: 'Olivia',
    lastName: 'Brown',
    email: 'olivia.brown@nueone.io',
    phone: '+1 (555) 101-2016',
    department: 'Sales',
    position: 'Business Development Rep',
    status: 'active',
    joinDate: '2023-09-01',
    salary: 72000,
    avatar: 'OB',
  },
  {
    id: 'EMP017',
    firstName: 'Raj',
    lastName: 'Krishnan',
    email: 'raj.krishnan@nueone.io',
    phone: '+1 (555) 101-2017',
    department: 'Engineering',
    position: 'Data Engineer',
    status: 'active',
    joinDate: '2022-08-22',
    salary: 120000,
    avatar: 'RK',
  },
  {
    id: 'EMP018',
    firstName: 'Isabella',
    lastName: 'Costa',
    email: 'isabella.costa@nueone.io',
    phone: '+1 (555) 101-2018',
    department: 'Marketing',
    position: 'Brand Designer',
    status: 'active',
    joinDate: '2023-02-28',
    salary: 88000,
    avatar: 'IC',
  },
  {
    id: 'EMP019',
    firstName: 'Andrew',
    lastName: 'Thompson',
    email: 'andrew.thompson@nueone.io',
    phone: '+1 (555) 101-2019',
    department: 'Finance',
    position: 'CFO',
    status: 'active',
    joinDate: '2019-01-15',
    salary: 185000,
    avatar: 'AT',
  },
  {
    id: 'EMP020',
    firstName: 'Grace',
    lastName: 'Lee',
    email: 'grace.lee@nueone.io',
    phone: '+1 (555) 101-2020',
    department: 'Operations',
    position: 'Project Manager',
    status: 'active',
    joinDate: '2021-10-05',
    salary: 102000,
    avatar: 'GL',
  },
  {
    id: 'EMP021',
    firstName: 'Hassan',
    lastName: 'Ali',
    email: 'hassan.ali@nueone.io',
    phone: '+1 (555) 101-2021',
    department: 'Engineering',
    position: 'Mobile Developer',
    status: 'active',
    joinDate: '2023-06-12',
    salary: 108000,
    avatar: 'HA',
  },
  {
    id: 'EMP022',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma.davis@nueone.io',
    phone: '+1 (555) 101-2022',
    department: 'HR',
    position: 'People Operations',
    status: 'inactive',
    joinDate: '2022-04-01',
    salary: 75000,
    avatar: 'ED',
  },
  {
    id: 'EMP023',
    firstName: 'Carlos',
    lastName: 'Mendez',
    email: 'carlos.mendez@nueone.io',
    phone: '+1 (555) 101-2023',
    department: 'Sales',
    position: 'Regional Sales Manager',
    status: 'active',
    joinDate: '2021-01-20',
    salary: 112000,
    avatar: 'CM',
  },
  {
    id: 'EMP024',
    firstName: 'Lily',
    lastName: 'Nguyen',
    email: 'lily.nguyen@nueone.io',
    phone: '+1 (555) 101-2024',
    department: 'Marketing',
    position: 'SEO Specialist',
    status: 'active',
    joinDate: '2023-04-15',
    salary: 76000,
    avatar: 'LN',
  },
  {
    id: 'EMP025',
    firstName: 'Michael',
    lastName: 'O\'Brien',
    email: 'michael.obrien@nueone.io',
    phone: '+1 (555) 101-2025',
    department: 'Engineering',
    position: 'Engineering Manager',
    status: 'active',
    joinDate: '2020-09-01',
    salary: 155000,
    avatar: 'MO',
  },
];

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
  { id: 'ATT025', employeeId: 'EMP025', employeeName: 'Michael O\'Brien', date: '2025-02-24', checkIn: '08:30', checkOut: '17:00', status: 'present' },
];

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

export const payrollRecords: PayrollRecord[] = [
  { id: 'PAY001', employeeId: 'EMP001', employeeName: 'Sarah Chen', month: '2025-02', basicSalary: 10417, deductions: 2083, bonus: 500, netSalary: 8834, status: 'paid' },
  { id: 'PAY002', employeeId: 'EMP002', employeeName: 'Marcus Johnson', month: '2025-02', basicSalary: 9833, deductions: 1967, bonus: 0, netSalary: 7866, status: 'paid' },
  { id: 'PAY003', employeeId: 'EMP003', employeeName: 'Priya Patel', month: '2025-02', basicSalary: 8167, deductions: 1633, bonus: 300, netSalary: 6834, status: 'paid' },
  { id: 'PAY004', employeeId: 'EMP004', employeeName: 'James Wilson', month: '2025-02', basicSalary: 11250, deductions: 2250, bonus: 1000, netSalary: 10000, status: 'paid' },
  { id: 'PAY005', employeeId: 'EMP005', employeeName: 'Aisha Rahman', month: '2025-02', basicSalary: 6500, deductions: 1300, bonus: 0, netSalary: 5200, status: 'paid' },
  { id: 'PAY006', employeeId: 'EMP006', employeeName: 'David Kim', month: '2025-02', basicSalary: 7667, deductions: 1533, bonus: 200, netSalary: 6334, status: 'paid' },
  { id: 'PAY007', employeeId: 'EMP007', employeeName: 'Elena Rodriguez', month: '2025-02', basicSalary: 8750, deductions: 1750, bonus: 0, netSalary: 7000, status: 'processing' },
  { id: 'PAY008', employeeId: 'EMP008', employeeName: 'Tyler Brooks', month: '2025-02', basicSalary: 9583, deductions: 1917, bonus: 400, netSalary: 8066, status: 'paid' },
  { id: 'PAY009', employeeId: 'EMP009', employeeName: 'Mei Zhang', month: '2025-02', basicSalary: 9167, deductions: 1833, bonus: 0, netSalary: 7334, status: 'paid' },
  { id: 'PAY010', employeeId: 'EMP010', employeeName: 'Robert Taylor', month: '2025-02', basicSalary: 7083, deductions: 1417, bonus: 0, netSalary: 5666, status: 'pending' },
  { id: 'PAY011', employeeId: 'EMP011', employeeName: 'Fatima Al-Hassan', month: '2025-02', basicSalary: 6833, deductions: 1367, bonus: 150, netSalary: 5616, status: 'paid' },
  { id: 'PAY012', employeeId: 'EMP012', employeeName: 'Lucas Anderson', month: '2025-02', basicSalary: 7917, deductions: 1583, bonus: 300, netSalary: 6634, status: 'paid' },
  { id: 'PAY013', employeeId: 'EMP013', employeeName: 'Sofia Martinez', month: '2025-02', basicSalary: 7333, deductions: 1467, bonus: 0, netSalary: 5866, status: 'processing' },
  { id: 'PAY014', employeeId: 'EMP014', employeeName: 'Nathan Clark', month: '2025-02', basicSalary: 6583, deductions: 1317, bonus: 0, netSalary: 5266, status: 'paid' },
  { id: 'PAY015', employeeId: 'EMP015', employeeName: 'Yuki Tanaka', month: '2025-02', basicSalary: 7917, deductions: 1583, bonus: 0, netSalary: 6334, status: 'pending' },
  { id: 'PAY016', employeeId: 'EMP019', employeeName: 'Andrew Thompson', month: '2025-02', basicSalary: 15417, deductions: 3083, bonus: 2000, netSalary: 14334, status: 'paid' },
  { id: 'PAY017', employeeId: 'EMP025', employeeName: 'Michael O\'Brien', month: '2025-02', basicSalary: 12917, deductions: 2583, bonus: 1500, netSalary: 11834, status: 'paid' },
  { id: 'PAY018', employeeId: 'EMP001', employeeName: 'Sarah Chen', month: '2025-01', basicSalary: 10417, deductions: 2083, bonus: 750, netSalary: 9084, status: 'paid' },
  { id: 'PAY019', employeeId: 'EMP002', employeeName: 'Marcus Johnson', month: '2025-01', basicSalary: 9833, deductions: 1967, bonus: 200, netSalary: 8066, status: 'paid' },
  { id: 'PAY020', employeeId: 'EMP004', employeeName: 'James Wilson', month: '2025-01', basicSalary: 11250, deductions: 2250, bonus: 800, netSalary: 9800, status: 'paid' },
];

// Helper to get employee by ID
export function getEmployeeById(id: string): Employee | undefined {
  return employees.find((e) => e.id === id);
}

// Helper to get attendance for employee
export function getAttendanceByEmployeeId(employeeId: string): AttendanceRecord[] {
  return attendanceRecords.filter((a) => a.employeeId === employeeId);
}

// Helper to get leaves for employee
export function getLeavesByEmployeeId(employeeId: string): LeaveRequest[] {
  return leaveRequests.filter((l) => l.employeeId === employeeId);
}

// Helper to get payroll for employee
export function getPayrollByEmployeeId(employeeId: string): PayrollRecord[] {
  return payrollRecords.filter((p) => p.employeeId === employeeId);
}
