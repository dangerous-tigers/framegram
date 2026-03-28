import { defineConfig } from 'vitest/config';

import { playwright } from '@vitest/browser-playwright';

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    exclude: ['node_modules/**', '**/test/**', '**/*.e2e.spec.{ts,tsx}'],
  },
});
