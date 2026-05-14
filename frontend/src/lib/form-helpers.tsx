'use client';

// ============================================================================
// Accessible Form Field
// Replaces the common pattern of bare <label> + <input> without htmlFor/id.
//
// BEFORE (inaccessible):
//   <label className="...">Customer *</label>
//   <input {...register('customerId')} className="..." />
//
// AFTER (accessible):
//   <AccessibleField label="Customer" required>
//     <input {...register('customerId')} className="..." />
//   </AccessibleField>
// ============================================================================

import { useId } from 'react';
import { cn } from '@/lib/utils';

interface AccessibleFieldProps {
  /** Label text */
  label: string;
  /** Whether the field is required (adds visual indicator + aria-required) */
  required?: boolean;
  /** Error message (adds role="alert" for screen readers) */
  error?: string;
  /** Hint text displayed below the label */
  hint?: string;
  /** Input/Select/Textarea element */
  children: React.ReactNode;
  /** Optional explicit ID override for the input */
  inputId?: string;
  /** Additional class for the wrapper div */
  className?: string;
}

export function AccessibleField({
  label,
  required,
  error,
  hint,
  children,
  inputId,
  className,
}: AccessibleFieldProps) {
  const autoId = useId();
  const id = inputId ?? autoId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={cn('space-y-1.5', className)}>
      <label
        htmlFor={id}
        className="text-xs text-muted-foreground mb-1 block"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      {/* Clone the child element to inject id and aria attributes */}
      {injectFieldProps(children, { id, required, errorId, hintId, hasError: !!error })}
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted-foreground/70">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-destructive mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Injects accessibility props into the child input/select/textarea element.
 * Uses React.cloneElement so the caller can keep using register() etc.
 */
function injectFieldProps(
  children: React.ReactNode,
  props: {
    id: string;
    required?: boolean;
    errorId: string;
    hintId: string;
    hasError: boolean;
  }
): React.ReactNode {
  if (!children || typeof children !== 'object') return children;

  // If it's a single element, clone it with injected props
  if ('props' in children) {
    const existingAriaDescribedBy = (children.props as Record<string, unknown>)['aria-describedby'] as string | undefined;
    const describedBy = [existingAriaDescribedBy, props.hasError ? props.errorId : props.hintId]
      .filter(Boolean)
      .join(' ') || undefined;

    return cloneElementWithProps(children, {
      id: props.id,
      'aria-required': props.required || undefined,
      'aria-invalid': props.hasError || undefined,
      'aria-describedby': describedBy,
    });
  }

  // If it's an array, find the first input-like element and inject
  if (Array.isArray(children)) {
    let injected = false;
    return children.map((child) => {
      if (!injected && child && typeof child === 'object' && 'type' in child) {
        const typeName = typeof child.type === 'string' ? child.type : '';
        if (['input', 'select', 'textarea'].includes(typeName) || (child.props as Record<string, unknown>)?.register) {
          injected = true;
          return injectFieldProps(child, props);
        }
      }
      return child;
    });
  }

  return children;
}

/**
 * Type-safe React.cloneElement alternative.
 * Merges new props onto an existing React element.
 */
function cloneElementWithProps(
  element: React.ReactElement,
  newProps: Record<string, unknown>
): React.ReactElement {
  // Use React's internal clone or spread approach
  const merged = { ...(element.props as Record<string, unknown>), ...newProps };
  return { ...element, props: merged } as React.ReactElement;
}
