import { defineConfig, mergeConfig } from 'vitest/config';

import baseConfig from './vitest.config';

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      name: 'unit',
      environment: 'node',
      include: ['**/__test__/**/*.test.{ts,tsx}', '**/lib/**/*.test.{ts,tsx}'],
      exclude: ['**/ui/**', '**/components/**'],
    },
  }),
);
