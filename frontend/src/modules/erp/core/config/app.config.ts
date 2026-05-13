export const APP_CONFIG = {
  name: 'NueERP',
  version: '1.0.0',
  env: process.env.NODE_ENV,
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;
