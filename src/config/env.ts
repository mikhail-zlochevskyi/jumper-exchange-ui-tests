/**
 * Environment Configuration
 * Centralized environment variable management
 */

export const APP_BASE_URL = process.env.APP_BASE_URL || 'https://jumper.exchange';

export const config = {
  baseURL: APP_BASE_URL,
  timeout: 30000,
  viewport: {
    width: 1280,
    height: 720,
  },
};

