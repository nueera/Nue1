import { z } from 'zod';

export const createTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required'),
  department: z.string().min(1, 'Department is required'),
  tasks: z.array(z.object({
    title: z.string().min(1, 'Task title is required'),
    description: z.string().min(1, 'Task description is required'),
    category: z.enum(['it-setup', 'hr', 'team', 'training', 'documentation'] as const, {
      message: 'Category is required',
    }),
    assignee: z.enum(['hr', 'manager', 'it', 'employee'] as const, {
      message: 'Assignee is required',
    }),
    dueOffsetDays: z.number().min(0, 'Due offset days must be non-negative'),
  })).min(1, 'At least one task is required'),
});

export const createNewHireSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  templateId: z.string().min(1, 'Template ID is required'),
  startDate: z.string().min(1, 'Start date is required'),
  buddy: z.string().optional(),
  manager: z.string().optional(),
});

export const updateTaskSchema = z.object({
  taskId: z.string().min(1, 'Task ID is required'),
  completed: z.boolean(),
  completedAt: z.string().optional(),
});

export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;
export type CreateNewHireInput = z.infer<typeof createNewHireSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
