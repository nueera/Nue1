const PREFIX = 'nueone_';

export const storageService = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(`${PREFIX}${key}`);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
    } catch {
      // Storage full or other error
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${PREFIX}${key}`);
  },

  clear(): void {
    if (typeof window === 'undefined') return;
    Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  },
};

export const sessionStorage = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.sessionStorage.getItem(`${PREFIX}${key}`);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      window.sessionStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
    } catch {
      // Storage full
    }
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    window.sessionStorage.removeItem(`${PREFIX}${key}`);
  },
};
