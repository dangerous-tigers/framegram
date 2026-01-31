import { defineConfig } from 'eslint/config';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';

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
    settings: {
      react: {
        version: 'detect', // автоматически определяет версию React из node_modules
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    plugins: {
      import: pluginImport,
      prettier: pluginPrettier,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'none',
        },
      ],
      // 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      semi: 'error',
      'no-console': 'error',
      'no-debugger': 'error',
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      // 'max-lines': ['warn', 250],
      'max-len': [
        'error',
        {
          code: 120,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreComments: true,
        },
      ],
      'import/no-unresolved': 'error',

      // циклические зависимости
      'import/no-cycle': 'error',

      // защита архитектурных границ
      'import/no-internal-modules': 'off',
      'import/order': 'off',
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/newline-after-import': ['error', { count: 1 }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // node builtin
            ['^node:'],
            // `react` first, `next` second, then packages starting with a character
            ['^react$', '^next', '^[a-z]'],
            // Packages starting with `@`
            ['^@'],
            // Packages starting with `~`
            ['^~'],
            // Imports starting with `../`
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Imports starting with `./`
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports
            ['^.+\\.s?css$'],
            // Side effect imports
            ['^\\u0000'],
          ],
        },
      ],

      'simple-import-sort/exports': 'error',
      'prettier/prettier': ['error'],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.stories.tsx', '**/*.stories.ts', '**/storybook/**'],
    rules: {
      'react/display-name': 'off',
    },
  },
]);
