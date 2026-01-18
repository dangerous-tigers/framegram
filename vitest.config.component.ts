import { defineConfig, mergeConfig } from 'vitest/config';

import baseConfig from './vitest.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: 'component',
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      include: ['**/ui/**/*.test.{ts,tsx}', '**/components/**/*.test.{ts,tsx}'],
    },
  }),
);
