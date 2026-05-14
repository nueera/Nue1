'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';
type ButtonSize = 'sm' | 'md' | 'lg';

interface NueButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  loading?: boolean;
  fullWidth?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2.5',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'w-7 h-7',
  md: 'w-9 h-9',
  lg: 'w-11 h-11',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-module-erp text-white border border-module-erp/20 ' +
    'hover:brightness-110 ' +
    'dark:hover:shadow-[0_0_20px_var(--glow-primary)] ' +
    'hover:shadow-md',
  secondary:
    'glass-surface text-foreground border border-glass-border ' +
    'hover:bg-glass-hover hover:brightness-105',
  ghost:
    'bg-transparent text-foreground/80 ' +
    'hover:bg-glass-hover hover:text-foreground',
  icon:
    'bg-transparent text-muted-foreground rounded-lg ' +
    'hover:bg-glass-hover hover:text-foreground',
};

const NueButton = forwardRef<HTMLButtonElement, NueButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon: Icon,
      loading = false,
      fullWidth = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // For the 'icon' variant, we override sizing to square
    const isIconVariant = variant === 'icon';

    const classes = [
      'relative inline-flex items-center justify-center',
      'font-medium select-none',
      'rounded-lg',
      'transition-[filter,box-shadow,background-color,color] duration-[140ms] ease-out',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      isIconVariant ? iconSizeClasses[size] : sizeClasses[size],
      variantClasses[variant],
      fullWidth && !isIconVariant ? 'w-full' : '',
      disabled || loading ? 'opacity-40 pointer-events-none' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled && !loading ? { y: -0.5, transition: { duration: 0.14 } } : undefined}
        whileTap={!disabled && !loading ? { scale: 0.97, transition: { duration: 0.1 } } : undefined}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : Icon ? (
          <Icon className={isIconVariant ? 'h-4 w-4' : 'h-4 w-4 shrink-0'} strokeWidth={1.8} />
        ) : null}
        {children && !isIconVariant && <span>{children}</span>}
        {children && isIconVariant && children}
      </motion.button>
    );
  }
);

NueButton.displayName = 'NueButton';

export default NueButton;
