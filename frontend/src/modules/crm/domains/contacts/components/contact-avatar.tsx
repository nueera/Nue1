// @ts-nocheck
'use client';

import { motion } from 'framer-motion';

interface ContactAvatarProps {
  firstName: string;
  lastName: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
};

export function ContactAvatar({ firstName, lastName, size = 'md', className = '' }: ContactAvatarProps) {
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${sizeMap[size]} rounded-full bg-module-crm/15 text-module-crm flex items-center justify-center font-semibold shrink-0 ${className}`}
    >
      {initials || '?'}
    </motion.div>
  );
}
