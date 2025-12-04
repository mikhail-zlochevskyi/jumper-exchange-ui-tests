import { defineConfig, devices } from '@playwright/test';
import { APP_BASE_URL } from './src/config/env';

export default defineConfig({
  testDir: './tests/ui',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 2,
  workers: process.env.CI ? 1 : 5,
  timeout: 30000, // Overall test timeout
  expect: {
    timeout: 10000, // Assertion timeout
  },
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['list'],
    ...(process.env.CI ? [['junit', { outputFile: 'reports/junit.xml' }]] : []),
  ],
  use: {
    baseURL: APP_BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
