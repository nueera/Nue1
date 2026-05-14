// ============================================================================
// Smoke Test: Shared Components (src/components/shared/)
// ============================================================================

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from '@/components/shared/spinner';
import { StatCard } from '@/components/shared/stat-card';

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('applies custom size', () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByRole('status');
    expect(spinner.className).toContain('h-8 w-8');
  });

  it('applies custom className', () => {
    render(<Spinner className="text-blue-500" />);
    const spinner = screen.getByRole('status');
    expect(spinner.className).toContain('text-blue-500');
  });

  it('has animate-spin class', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner.className).toContain('animate-spin');
  });
});

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Revenue" value="$12,345" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$12,345')).toBeInTheDocument();
  });

  it('renders with change string', () => {
    render(<StatCard label="Users" value="1,234" change="+12% this month" />);
    expect(screen.getByText('1,234')).toBeInTheDocument();
    expect(screen.getByText('+12% this month')).toBeInTheDocument();
  });

  it('renders with trend object', () => {
    render(<StatCard label="Growth" value="56%" trend={{ value: 12.5, label: 'vs last month' }} />);
    expect(screen.getByText('56%')).toBeInTheDocument();
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('renders negative trend with minus sign', () => {
    render(<StatCard label="Churn" value="3.2%" trend={{ value: -2.1 }} />);
    expect(screen.getByText('-2.1%')).toBeInTheDocument();
  });
});
