import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Игнорируемые файлы
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**', '*.cjs', '**/*.cjs'],
  },

  // Базовый JS конфиг
  js.configs.recommended,

  // TypeScript конфиг
  ...tseslint.configs.recommended,

  // React конфиг
  pluginReact.configs.flat.recommended,

  {
    files: ['**/*.{js,mjs,ts,mts,cts,jsx,tsx}'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      semi: 'error',
      'no-console': 'error',
      'no-debugger': 'error',
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
]);
