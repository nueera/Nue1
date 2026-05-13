export const colors = {
  semantic: {
    primary: 'var(--module-erp)',
    success: 'var(--color-green-500)',
    warning: 'var(--color-amber-500)',
    danger: 'var(--color-red-500)',
    info: 'var(--color-blue-500)',
  },
  surfaces: {
    glass: 'var(--glass-bg)',
    glassStrong: 'var(--glass-bg-strong)',
    hover: 'var(--glass-hover)',
    border: 'var(--glass-border)',
  },
  text: {
    primary: 'var(--foreground)',
    secondary: 'var(--muted-foreground)',
    disabled: 'var(--muted-foreground/40)',
  },
} as const;
