'use client';

import { useState } from 'react';
import type { OnboardingTemplate, OnboardingTask } from '../types';
import type { CreateTemplateInput } from '../onboarding.schema';
import { TASK_CATEGORIES } from '../constants';
import { Button } from '../../../../design-system/components/button';
import { FormField } from '../../../../design-system/components/form-field';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { FileText, Plus, Pencil, Trash2, ChevronDown, ChevronUp, Copy } from 'lucide-react';

interface OnboardingTemplateProps {
  templates: OnboardingTemplate[];
  isLoading?: boolean;
  onCreate?: (data: CreateTemplateInput) => void;
  onEdit?: (template: OnboardingTemplate) => void;
  onDelete?: (template: OnboardingTemplate) => void;
  onDuplicate?: (template: OnboardingTemplate) => void;
}

export function OnboardingTemplate({ templates, isLoading, onCreate, onEdit, onDelete, onDuplicate }: OnboardingTemplateProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [tasks, setTasks] = useState<Array<Omit<OnboardingTask, 'id' | 'templateId' | 'completed' | 'completedAt'>>>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'hr' as OnboardingTask['category'],
    assignee: 'hr' as OnboardingTask['assignee'],
    dueOffsetDays: 0,
  });

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks((prev) => [...prev, { ...newTask }]);
    setNewTask({ title: '', description: '', category: 'hr', assignee: 'hr', dueOffsetDays: 0 });
  };

  const removeTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (!name.trim() || !department.trim() || tasks.length === 0) return;
    onCreate?.({ name, department, tasks: tasks.map((t) => ({ ...t })) });
    setName('');
    setDepartment('');
    setTasks([]);
    setShowCreateForm(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-1/3 mb-3" />
            <div className="h-3 bg-white/10 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (templates.length === 0 && !showCreateForm) {
    return (
      <EmptyState
        icon={FileText}
        title="No templates"
        description="Create onboarding templates to streamline new hire onboarding."
        action={onCreate ? { label: 'Create Template', onClick: () => setShowCreateForm(true) } : undefined}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>Onboarding Templates</h3>
        {onCreate && !showCreateForm && (
          <Button size="sm" onClick={() => setShowCreateForm(true)}>
            <Plus className="h-3.5 w-3.5 mr-1" strokeWidth={1.8} /> New Template
          </Button>
        )}
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-5">
          <h4 className="font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>Create Template</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Template Name" required>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Engineering Onboarding"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </FormField>
            <FormField label="Department" required>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Engineering"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors"
                style={{ fontSize: 'var(--text-sm)' }}
              />
            </FormField>
          </div>

          {/* Task List */}
          {tasks.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium">Tasks ({tasks.length})</p>
              {tasks.map((task, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{TASK_CATEGORIES[task.category]} · {task.assignee} · Day +{task.dueOffsetDays}</p>
                  </div>
                  <button onClick={() => removeTask(i)} className="shrink-0 text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Task */}
          <div className="bg-white/5 rounded-xl p-3 space-y-3 border border-white/5">
            <p className="text-xs font-medium text-muted-foreground">Add Task</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask((p) => ({ ...p, title: e.target.value }))}
                placeholder="Task title"
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors"
              />
              <input
                type="text"
                value={newTask.description}
                onChange={(e) => setNewTask((p) => ({ ...p, description: e.target.value }))}
                placeholder="Description"
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors"
              />
              <select
                value={newTask.category}
                onChange={(e) => setNewTask((p) => ({ ...p, category: e.target.value as OnboardingTask['category'] }))}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground outline-none"
              >
                {Object.entries(TASK_CATEGORIES).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <select
                  value={newTask.assignee}
                  onChange={(e) => setNewTask((p) => ({ ...p, assignee: e.target.value as OnboardingTask['assignee'] }))}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground outline-none"
                >
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="it">IT</option>
                  <option value="employee">Employee</option>
                </select>
                <input
                  type="number"
                  value={newTask.dueOffsetDays}
                  onChange={(e) => setNewTask((p) => ({ ...p, dueOffsetDays: Number(e.target.value) }))}
                  placeholder="Day +"
                  min={0}
                  className="w-16 bg-white/5 border border-white/10 rounded-lg px-2 py-2 text-sm text-foreground outline-none"
                />
              </div>
            </div>
            <Button size="sm" type="button" onClick={addTask}>
              <Plus className="h-3.5 w-3.5 mr-1" strokeWidth={1.8} /> Add Task
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleCreate} disabled={!name.trim() || !department.trim() || tasks.length === 0}>Create Template</Button>
            <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Template List */}
      {templates.map((template) => {
        const isExpanded = expandedId === template.id;

        return (
          <div key={template.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => setExpandedId(isExpanded ? null : template.id)}
              className="flex items-center gap-3 w-full px-5 py-4 hover:bg-white/5 transition-colors duration-200 text-left"
            >
              <FileText className="h-4 w-4 text-module-erp shrink-0" strokeWidth={1.8} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{template.name}</p>
                <p className="text-xs text-muted-foreground">{template.department} · {template.tasks.length} tasks</p>
              </div>
              <div className="flex items-center gap-2">
                {onEdit && (
                  <button onClick={(e) => { e.stopPropagation(); onEdit(template); }} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" aria-label="Edit template">
                    <Pencil className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} />
                  </button>
                )}
                {onDuplicate && (
                  <button onClick={(e) => { e.stopPropagation(); onDuplicate(template); }} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors" aria-label="Duplicate template">
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.8} />
                  </button>
                )}
                {onDelete && (
                  <button onClick={(e) => { e.stopPropagation(); onDelete(template); }} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors" aria-label="Delete template">
                    <Trash2 className="h-3.5 w-3.5 text-red-400" strokeWidth={1.8} />
                  </button>
                )}
                {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} /> : <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />}
              </div>
            </button>

            {isExpanded && (
              <div className="px-5 pb-5 border-t border-white/5 pt-4">
                <div className="space-y-2">
                  {template.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/5">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                        {task.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{task.description}</p>}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{TASK_CATEGORIES[task.category]}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{task.assignee}</span>
                      <span className="text-xs text-muted-foreground shrink-0">Day +{task.dueOffsetDays}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
