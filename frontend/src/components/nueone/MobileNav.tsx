'use client';

import { motion } from 'framer-motion';
import { Home, LayoutGrid, Search, User } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';

const navItems = [
  { icon: Home, label: 'Home', action: 'home' as const },
  { icon: LayoutGrid, label: 'Modules', action: 'modules' as const },
  { icon: Search, label: 'Search', action: 'search' as const },
  { icon: User, label: 'Profile', action: 'profile' as const },
];

export default function MobileNav() {
  const { setSearchOpen, searchOpen } = useAppStore();

  const handleAction = (action: string) => {
    switch (action) {
      case 'search':
        setSearchOpen(!searchOpen);
        break;
      default:
        break;
    }
  };

  return (
    <motion.nav
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-bottom"
    >
      <div className="glass-surface-strong border-t border-glass-border">
        <div className="flex items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {navItems.map(({ icon: Icon, label, action }) => (
            <button
              key={action}
              onClick={() => handleAction(action)}
              className={`
                flex flex-col items-center justify-center gap-0.5
                min-w-[56px] min-h-[44px] rounded-lg
                transition-colors duration-200
                ${
                  action === 'search' && searchOpen
                    ? 'text-module-erp'
                    : 'text-muted-foreground hover:text-foreground'
                }
              `}
              aria-label={label}
            >
              <Icon className="h-5 w-5" strokeWidth={1.8} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
