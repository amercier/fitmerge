export const env = process.env.NODE_ENV || 'development';

export const settings = Object.assign(
  // Common settings
  {
    port: process.env.PORT || 8000,
    host: process.env.HOST || '0.0.0.0',
    console,
  },
  // Env-specific settings
  {
    development: {},
    test: {},
    staging: {},
    production: {},
  }[env],
);
