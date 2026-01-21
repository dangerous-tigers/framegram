import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',
  testMatch: '**/*.e2e.{js,ts,tsx}',

  testIgnore: ['node_modules/**', 'dist/**', '.next/**', 'build/**', '**/node_modules/**', '**/*.test.ts'],

  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: 'setup',
      testMatch: '**/*.e2e.setup.ts',
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
      testMatch: '**/*.e2e.{js,ts,tsx}',
    },
  ],
});
