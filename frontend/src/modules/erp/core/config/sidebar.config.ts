import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  Banknote,
  FolderKanban,
  DollarSign,
  BarChart3,
  Settings,
  TrendingUp,
  UserPlus,
  ArrowLeftRight,
  Receipt,
  Target,
  Landmark,
  GraduationCap,
  FileBarChart,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  slug: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    title: 'Dashboard',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, slug: 'dashboard' },
    ],
  },
  {
    title: 'HRM',
    items: [
      { id: 'employees', label: 'Employees', icon: Users, slug: 'hrm/employees' },
      { id: 'attendance', label: 'Attendance', icon: Clock, slug: 'hrm/attendance' },
      { id: 'leaves', label: 'Leaves', icon: Calendar, slug: 'hrm/leaves' },
      { id: 'payroll', label: 'Payroll', icon: Banknote, slug: 'hrm/payroll' },
      { id: 'performance', label: 'Performance', icon: TrendingUp, slug: 'hrm/performance' },
      { id: 'onboarding', label: 'Onboarding', icon: UserPlus, slug: 'hrm/onboarding' },
      { id: 'shifts', label: 'Shifts', icon: ArrowLeftRight, slug: 'hrm/shifts' },
      { id: 'expenses', label: 'Expenses', icon: Receipt, slug: 'hrm/expenses' },
      { id: 'recruitment', label: 'Recruitment', icon: Target, slug: 'hrm/recruitment' },
      { id: 'loans', label: 'Loans', icon: Landmark, slug: 'hrm/loans' },
      { id: 'training', label: 'Training', icon: GraduationCap, slug: 'hrm/training' },
      { id: 'hrm-reports', label: 'Reports', icon: FileBarChart, slug: 'hrm/reports' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { id: 'projects', label: 'Projects', icon: FolderKanban, slug: 'projects' },
      { id: 'finance', label: 'Finance', icon: DollarSign, slug: 'finance' },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { id: 'reports', label: 'Reports', icon: BarChart3, slug: 'reports' },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings, slug: 'settings' },
    ],
  },
];

export const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  'hrm/employees': 'Employees',
  'hrm/attendance': 'Attendance',
  'hrm/leaves': 'Leaves',
  'hrm/payroll': 'Payroll',
  'hrm/performance': 'Performance',
  'hrm/onboarding': 'Onboarding',
  'hrm/shifts': 'Shifts',
  'hrm/expenses': 'Expenses',
  'hrm/recruitment': 'Recruitment',
  'hrm/loans': 'Loans',
  'hrm/training': 'Training',
  'hrm/reports': 'Reports',
  projects: 'Projects',
  finance: 'Finance',
  reports: 'Reports',
  settings: 'Settings',
};
