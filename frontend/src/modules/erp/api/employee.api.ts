import type { Employee } from '../data/mock/employees.mock';
import { employees, getEmployeeById } from '../data/mock/employees.mock';

export const employeeApi = {
  getAll: async (): Promise<Employee[]> => employees,
  getById: async (id: string): Promise<Employee | undefined> => getEmployeeById(id),
  create: async (data: Partial<Employee>): Promise<Employee> => {
    const newEmployee: Employee = {
      id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
      department: data.department || '',
      position: data.position || '',
      status: data.status || 'active',
      joinDate: data.joinDate || new Date().toISOString().split('T')[0],
      salary: data.salary || 0,
      avatar: `${(data.firstName || '')[0] || ''}${(data.lastName || '')[0] || ''}`,
    };
    return newEmployee;
  },
};
